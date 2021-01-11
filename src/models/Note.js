const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const NoteSchema = new Schema({
    idQuestion: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    wrongAnswerOne: {
        type: String,
        required: true
    },
    wrongAnswerTwo: {
        type: String,
        required: true
    },
    wrongAnswerThree: {
        type: String,
        required: true
    },
    categoria:{
        type: Number,
        required: true
    },
    user:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

autoIncrement.initialize(mongoose.connection);
NoteSchema.plugin(autoIncrement.plugin, {
  model: "notes", // collection or table name in which you want to apply auto increment
  field: "idQuestion", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = model('Note', NoteSchema);