const mongoUrl = 'mongodb://localhost:27017/kafedra';
var mongoose = require('mongoose');


mongoose.connect(mongoUrl,{useNewUrlParser: true, useCreateIndex: true});

module.exports = mongoose;