var mongoose = require('./lib/mongoose');

//Учители работа с бд
var Lecture = require('./models/lecturers');
var Lecturers = {}
Lecturers.listLecturers = ()=>{
    return  Lecture.find();
    // console.log(allList);
};
Lecturers.findById = (id)=>{
    // console.log('id');
    // console.log(id);
    return  Lecture.find({_id: id});
};
Lecturers.createLecture = (data)=>{
    const lecture = new Lecture({
        name: data.name,
        desc: data.desc,
        photo: data.photo,
        level: data.level,
        consult: data.consult,
        pubLessons: data.pubLessons
    });
    return lecture.save();
};

Lecturers.deleteLecture = (id) => {
    return Lecture.deleteOne({_id: id});
};

Lecturers.changeLect = ( id, data )=>{
    return  Lecture.updateOne({_id: id}, {
        name: data.name,
        desc: data.desc,
        photo: data.photo,
        level: data.level,
        consult: data.consult,
        pubLessons: data.pubLessons
    });
};



//Работа с бд Юзерами
var User = require('./models/user');
var Users = {};

Users.list = ()=>{
    return  User.find();
    // console.log(allList);
};
Users.checkAuth = (data)=>{
    return  User.findOne({username: data.login});
    // console.log(allList);
};

Users.userById = (id)=>{
    return  User.find({_id: id});
    // console.log(allList);
};
Users.addUser = (id)=>{
    return  User.find({_id: id});
    // console.log(allList);
};
Users.deleteUserById = (id)=>{
    return  User.deleteOne({_id: id});
    // console.log(allList);
    // var first = new User({username: 'Roma', password: 'root'});

};

Users.addNewOne = (data)=>{
    // console.log(data.content);
    const almost = new User({username: 'Roma', password: 'root'});
    return almost.save();
};



//Работа с новостями

var News = require('./models/news');
var NewsFunctions = {};

NewsFunctions.getAll = ()=>{
    return  News.find();
};
NewsFunctions.getById = ( id )=>{
    return  News.find({_id: id});
};

NewsFunctions.deleteById = ( id )=>{
    return  News.deleteOne({_id: id});
};

NewsFunctions.changeNews = ( id, data )=>{
    return  News.updateOne({_id: id}, {
        title: data.title,
        content: data.content,
        tag: data.tag,
        shortDesc: data.shortDesc
    });
};

NewsFunctions.addNewOne = (data)=>{
    // console.log(data.content);
    const almostNews = new News({
        title: data.title,
        content: data.content,
        tag: data.tag,
        shortDesc: data.shortDesc
    });
    return almostNews.save();
};



//Работа с ивентами
var Event = require('./models/events');
var EventsFunctions = {};

EventsFunctions.addNewOne = (data)=>{
    // console.log(data.content);
    const event = new Event({
        title: data.title,
        date: data.date,
        desc: data.desc
    });
    return event.save();
};
EventsFunctions.getAll = ()=>{
    return  Event.find();
};
EventsFunctions.getById = ( id )=>{
    return  Event.find({_id: id});
};

EventsFunctions.deleteById = ( id )=>{
    return  Event.deleteOne({_id: id});
};

EventsFunctions.changeEvent = ( id, data )=>{
    // console.log('We a here');
    return  Event.updateOne({_id: id}, {
        title: data.title,
        date: data.date,
        desc: data.desc
    });
};



module.exports.EventsFunctions = EventsFunctions;
module.exports.NewsFunctions = NewsFunctions;
module.exports.Lecturers = Lecturers;
module.exports.Users = Users;