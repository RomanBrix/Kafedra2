var mongoose = require('../lib/mongoose');
var  Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        // unique: true,
        required: true,
        default: 'New News!'
    },
    desc:{
        type: Schema.Types.Mixed,
        default: {}
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { minimize: false });


module.exports = mongoose.model('Event', schema);