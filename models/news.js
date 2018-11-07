var mongoose = require('../lib/mongoose');
var  Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        // unique: true,
        required: true,
        default: 'New News!'
    },
    content:{
        type: Schema.Types.Mixed,
        default: {}
    },
    shortDesc:{
        type: String,
        required: true,
        default: 'Also new News!'
    },
    tag:{
        type: String,
        required: true,
        default: 'edu'
    },
    created: {
        type: Date,
        default: Date.now
    }
}, { minimize: false });


module.exports = mongoose.model('News', schema);