const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 5000;
// const mongoUrl = 'mongodb://localhost:27017';
const ownMongo = require('./Mongo.js');
const monguse = require('./Mongoose');
var bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "./client/public/src/teachers/",
    filename: function(req, file, cb){
        // console.log(path.basename("/"+file.originalname));
        // console.log(file);
        cb(null,(file.originalname).split('.')[0] + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 10000000
    },
}).single("myImage");

server.listen(port);
app.use( bodyParser.json() );


io.on('connection', (socket) => {
    console.log('hello user: ', socket.id);
    ////
    //New event!
    /////
    socket.emit('set client id', {clientId: socket.id});


    //////
    //Response on event
    //////

    socket.on('login with client id', (data) => {
    });

    socket.on('change client id', (data) => {
    });

    socket.on('my other event', function (data) {
        // console.log(data);
    });

    socket.on('try this pass bro', (data) => {
    });

    socket.on('and this guard', (data) => {
    });

    socket.on('check bd', () => {
    });

    socket.on('check users', (interval) => {
    });

    socket.on('disconnect', function () {
        console.log('good byi user: ', socket.id);
    });
});

// // API calls





app.get('/api/setDefaultSettings', (req, res) => {
    ownMongo.getWorkWithMongo('set default settings');
});



//***************************
//------------LECTORS-----------
//***************************
app.get('/api/lecturers', (req, res) => {
    monguse.Lecturers.listLecturers().then(data =>{
        res.send(data);
    });
    // monguse.Users.listLecturers().then(data => console.log(data))
});
app.get('/api/lecturers/:id', (req, res) => {
    monguse.Lecturers.findById(req.params.id).then(data =>{
        res.send(data);
    });
});
app.post('/api/lecturers', (req, res)=>{
// console.log(req.body.data);
    if(!req.body.data) {
        upload(req, res, (err) => {
            if (!err) {
                return res.send(200);
            }else{
                console.log(err);
            }
        });
    }else {
        monguse.Lecturers.createLecture(req.body.data)
            .then((result) => {
                res.send(result)
            });
    }
});
app.post('/api/lecturers/:id', (req, res)=>{
    if(!req.body.data) {
        upload(req, res, (err) => {
            if (!err) {
                return res.send(200);
            }else{
                console.log(err);
            }
        });
    }else {
        monguse.Lecturers.changeLect(req.params.id, req.body.data)
            .then((result) => {
                res.send(result)
            })
    }
    ;
});
// deleteLecture
app.delete('/api/lecturers/:id', (req,res)=>{
    monguse.Lecturers.deleteLecture(req.params.id)
        .then((result)=>{
            res.send(result);
        })
});


//***************************
//------------NEWS-----------
//***************************
app.post('/api/news', (req, res)=>{
    monguse.NewsFunctions.addNewOne(req.body.data)
        .then((result)=>{
            res.send(result)
        })
    ;
});
app.post('/api/news/:id', (req, res)=>{
    monguse.NewsFunctions.changeNews(req.params.id, req.body.data)
        .then((result)=>{
            res.send(result)
        })
    ;
});
app.get('/api/news', (req,res)=>{
    monguse.NewsFunctions.getAll()
        .then((result)=>{
            res.send(result);
        })
});
app.get('/api/news/:id', (req,res)=>{
    monguse.NewsFunctions.getById(req.params.id)
        .then((result)=>{
            res.send(result);
        })
});

app.delete('/api/news/:id', (req,res)=>{
    // console.log('u a here');
    monguse.NewsFunctions.deleteById(req.params.id)
        .then((result)=>{
            res.send(result);
        })
});



//***************************
//------------NEWS-----------
//***************************
app.post('/api/events', (req, res)=>{
    // console.log(req.body.data);
    // console.log(req.params);
    // console.log(req.query);

    monguse.EventsFunctions.addNewOne(req.body.data)
        .then((result)=>{
            res.send(result)
        })
    ;
});
app.post('/api/events/:id', (req, res)=>{
    // console.log(req.body.data);
    monguse.EventsFunctions.changeEvent(req.params.id, req.body.data)
        .then((result)=>{
            res.send(result)
        })
    ;
});
app.get('/api/events', (req,res)=>{
    monguse.EventsFunctions.getAll()
        .then((result)=>{
            res.send(result);
        })
});
app.get('/api/events/:id', (req,res)=>{
    monguse.EventsFunctions.getById(req.params.id)
        .then((result)=>{
            res.send(result);
        })
});
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});
app.delete('/api/events/:id', (req,res)=>{
    // console.log('u a here');
    monguse.EventsFunctions.deleteById(req.params.id)
        .then((result)=>{
            res.send(result);
        })
});

app.get('/api/users', (req,res)=>{
    monguse.Users.list()
        .then((result)=>{
            res.send(result);
        })
});


app.get('/api/users/:id', (req,res)=>{
    console.log(req.params.id);
    monguse.Users.userById(req.params.id)
        .then((result)=>{
            console.log(result);
            res.send(result);
        })
        .catch(e=>{
            console.log(e);
            if(e.name === 'CastError'){
                console.log('Нету такого юзера');
                res.send(false);
            }
        })
});
app.post('/api/users/', (req,res)=>{
    const data = req.body.data;
    monguse.Users.checkAuth(data)
        .then((usr)=>{
        // console.log(usr);
        if(usr) {
                if (usr.checkPassword(data.password)) {
                    console.log('==============>');
                    console.log(true);
                    res.send(usr._id);
                } else {
                    console.log('<==============');
                    console.log(false);
                    res.send('password');
                }
            }else{
                console.log('Такого нету');
            res.send('null');
        }
            // res.send(result);
        })
        .catch(e=>{
            console.log(e);
        })
});

    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });