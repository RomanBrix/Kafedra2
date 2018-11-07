// var mongoose = require('mongoose');
// const mongoUrl = 'mongodb://localhost:27017/testtwo';
// mongoose.connect(mongoUrl,{useNewUrlParser: true});
var mongoose = require('./lib/mongoose');
var async = require('async');


var getWorkWithMongo = function (forCase, options){
    // console.log(mongoose.connection.readyState);
    switch (forCase) {
        case 'set default settings':
            var User = require('./models/user');
            var Lecture = require('./models/lecturers');
            var News = require('./models/news');

            var db = mongoose.connection.db;
            // mongoose.connection.on('open',function(){
                console.log('ok');
                db.dropDatabase((err)=>{
                    if (err) throw err;
                    console.log('is droped');
                    async.parallel([
                        (callback)=>{
                            var first = new User({username: 'Roma', password: 'root'});
                            first.save(function (err) {
                                if (err) throw err;
                                callback(err, first);
                            });
                        },
                        (callback)=>{
                            var second = new User({username: 'Roman', password: 'root'});
                            second.save(function (err) {
                                if (err) throw err;
                                callback(err, second);
                            });
                        },
                        (callback)=>{
                            var third = new User({username: 'Romka', password: 'root'});
                            third.save(function (err) {
                                if (err) throw err;
                                callback(err, third);
                            });
                        },

                        (callback)=>{
                            var first = new Lecture({
                                name: 'Плескач Валентина Леонідівна',
                                photo: 'pleskach.jpg',
                                desc: 'Доктор економічних наук, кандидат технічних наук, завідувач кафедри прикладних інформаційних систем',
                                level: 1,
                                // consult:{
                                //     date,
                                //     time,
                                //     isEmpty: false
                                // },
                                // pubLessons:{
                                //     date,
                                //     time,
                                //     aud,
                                //     isEmpty: false
                                // }

                            });
                            first.pubLessons.theme.push('Алгоритмне сортування');
                            first.pubLessons.date.push(new Date(2019,5,22,12,20));
                            first.pubLessons.aud.push('211');
                            first.pubLessons.isEmpty = false;

                            first.consult.isEmpty = false;
                            first.consult.date.push(new Date(2018, 9, 2, 13,50));


                            first.save(function (err) {
                                if (err) throw err;
                                callback(err, first);
                            });
                        },
                        (callback)=>{
                            var second = new Lecture({name: 'Сайко Володимир Григорович', photo: 'saiko.jpg', desc: 'професор, д.т. н.', level: 2});
                            second.pubLessons.theme.push('Архітектура перспективних обчислювальних систем');
                            second.pubLessons.date.push(new Date(2018,5,14,9));
                            second.pubLessons.aud.push('209');
                            second.pubLessons.isEmpty = false;

                            second.consult.isEmpty = false;
                            second.consult.date.push(new Date(2019, 3, 12, 11), new Date(2019, 3, 26, 11,), new Date(2019, 4, 9, 11));


                            second.save(function (err) {
                                if (err) throw err;
                                callback(err, second);
                            });
                        },
                        (callback)=>{
                            var third = new Lecture({name: 'Mіронова Вікторія Леонідівна', photo: 'mironova.jpg', desc: 'доцент, к. т. н.', level: 3});
                            third.pubLessons.theme.push('Основи сучасної web-розробки з використанням сучасних фреймворів');
                            third.pubLessons.date.push(new Date(2018,4,4,9));
                            third.pubLessons.aud.push('202');
                            third.pubLessons.isEmpty = false;

                            third.consult.isEmpty = false;
                            third.consult.date.push(new Date(2019, 3, 23, 10,30), new Date(2019, 3, 30, 10,30), new Date(2019, 4, 6, 10,30), new Date(2019, 4, 20, 10,30), new Date(2019, 4, 27, 10,30),  new Date(2019, 5, 11, 10,30));
                            third.save(function (err) {
                                if (err) throw err;
                                callback(err, third);
                            });
                        },
                        (callback)=>{
                            var fourth = new Lecture({name: 'Домрачев Володимир Миколайович', photo: 'domrachev.jpg', desc: 'доцент, к. ф.-м. н.', level: 4});
                            fourth.pubLessons.theme.push('Програмування скорингу');
                            fourth.pubLessons.date.push(new Date(2018,5,23,13,40));
                            fourth.pubLessons.aud.push('401');
                            fourth.pubLessons.isEmpty = false;

                            fourth.consult.isEmpty = false;
                            fourth.consult.date.push(new Date(2019, 3, 14, 13,50), new Date(2019, 3, 21, 13,50), new Date(2019, 3, 28, 13,50),new Date(2019, 4, 4, 13,50),new Date(2019, 4, 11, 13,50), new Date(2019, 4, 18, 13,50));
                            fourth.save(function (err) {
                                if (err) throw err;
                                callback(err, fourth);
                            });
                        },
                        (callback)=>{
                            var fivth = new Lecture({name: 'Жихарєва Юлія Ігорівна', photo: 'jihareva.jpg', desc: 'Кандидат фізико-математичних наук, асистент', level: 5});
                            fivth.pubLessons.theme.push('Чисельні методи розв’язку нелінійних рівнянь');
                            fivth.pubLessons.date.push(new Date(2018,3,26,9));
                            fivth.pubLessons.aud.push('AЗ');
                            fivth.pubLessons.isEmpty = false;

                            fivth.consult.isEmpty = false;
                            fivth.consult.date.push(new Date(2018,5,22,12,10));

                            fivth.save(function (err) {
                                if (err) throw err;
                                callback(err, fivth);
                            });
                        },
                        (callback)=>{
                            var six = new Lecture({name: 'Гарко Ірина Ігорівна', photo: 'garko.jpg', desc: 'Асистент', level: 6});
                            six.pubLessons.theme.push('Використання Інтернет у діяльності організацій. Електронний бізнес');
                            six.pubLessons.date.push(new Date(2018,5,10,9));
                            six.pubLessons.aud.push('209');
                            six.pubLessons.isEmpty = false;

                            six.consult.isEmpty = false;
                            six.consult.date.push(new Date(2019, 3, 29, 12,20), new Date(2019, 4, 5, 12,20), new Date(2019, 4, 12, 12,20));

                            six.save(function (err) {
                                if (err) throw err;
                                callback(err, six);
                            });
                        },
                        (callback)=>{
                            var seven = new Lecture({name: 'Духновська Ксенія Костянтинівна', photo: 'duhnovska.jpg', desc: 'Асистент', level: 7});
                            seven.pubLessons.theme.push('Інтерфейси');
                            seven.pubLessons.date.push(new Date(2018,4,10,13,40));
                            seven.pubLessons.aud.push('212');
                            seven.pubLessons.isEmpty = false;

                            seven.consult.isEmpty = false;
                            seven.consult.date.push(new Date(2018, 9, 1, 12,10));

                            seven.save(function (err) {
                                if (err) throw err;
                                callback(err, seven);
                            });
                        },
                        (callback)=>{
                            var eit = new Lecture({name: 'Пирог Микола Володимирович', photo: 'pirog.jpg', desc: 'Асистент', level: 8});
                            eit.pubLessons.theme.push('Презентація бізнес-проектів в ІТ');
                            eit.pubLessons.date.push(new Date(2018,4,16,10,30));
                            eit.pubLessons.aud.push('202');
                            eit.pubLessons.isEmpty = false;

                            eit.consult.isEmpty = false;
                            eit.consult.date.push(new Date(2019, 2, 12, 12));
                            eit.save(function (err) {
                                if (err) throw err;
                                callback(err, eit);
                            });
                        }

                    ], (err, result)=>{
                        console.log(result);

                        // User.User.findOne({})
                        //     .then(tr=>console.log(tr));
                        // mongoose.disconnect();
                    });
                });
            // });
            break;

        case 'add standard lecturers':

            async.parallel([


            ], (err, result)=>{
                console.log(result);

                // Lecture.Lecture.findOne({})
                //     .then(tr=>console.log(tr));
                // mongoose.disconnect();
            });

            break;

        case 'get lecturers':
            // var Lecture = require('./models/lecturers');
            Lecture.Lecture.find((err, r)=>{
                // console.log(err);
                // console.log(r);
                // return r;
                options.willSend.send(r);
            });
                // .then(r=>{
                //     // console.log(r);
                //     return r;
                // });
            break;
    }
}

module.exports.getWorkWithMongo = getWorkWithMongo;