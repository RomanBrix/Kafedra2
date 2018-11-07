var mongoose = require('../lib/mongoose');
var  Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true,
        default: 10
    },
    created: {
        type: Date,
        default: Date.now
    },
    consult:{
        date:[Date],
        isEmpty:{
            type: Boolean,
            required: true,
            default: true
        }
    },
    pubLessons:{
        theme:   [String],
        date:    [Date],
        aud:     [String],
        isEmpty: {
            type: Boolean,
            required: true,
            default: true
        }
    }
});


module.exports = mongoose.model('Lecturer', schema);