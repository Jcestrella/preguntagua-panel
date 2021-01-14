const notesCtrl = {};
const Note = require('../models/Note');
const { unlink } = require('fs-extra');
const path = require('path');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('preguntas/new-question')
};

notesCtrl.getQuestions = (req, res) => {
    Note.find({},{_id: 0, idQuestion: 0, user: 0, createdAt: 0, updatedAt: 0},function(err, note){
        if(err)
        res.send(err);
        res.json(note);
    });
};

notesCtrl.createNewNote = async (req, res) => {
    const { question, correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree, categoria } = req.body;
    //const image = '/img/uploads/' + req.file.filename;
    const newNote = new Note({ question, correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree, categoria });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Pregunta Añadida Correctamente');
    res.redirect('/preguntas');
};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id});
    res.render('preguntas/all-notes', { notes })
}

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note.user != req.user.id){
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/preguntas');
    }
    res.render('preguntas/edit-note', { note })
};

notesCtrl.updateNote = async (req, res) => {
    const {question, correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree, categoria} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {question, correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree, categoria});
    req.flash('success_msg', 'Pregunta Actualizada Correctamente');
    res.redirect('/preguntas');
};

notesCtrl.deleteNote = async (req, res) => {
    const object = await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Pregunta Eliminada Correctamente');
    res.redirect('/preguntas');
};

module.exports = notesCtrl;