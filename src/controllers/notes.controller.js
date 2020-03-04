const notesCtrl = {};
const Note = require('../models/Note');
const { unlink } = require('fs-extra');
const path = require('path');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const image = '/img/uploads/' + req.file.filename;
    const newNote = new Note({ title, description, image });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id});
    res.render('notes/all-notes', { notes })
}

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note })
};

notesCtrl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    const object = await Note.findByIdAndDelete(req.params.id);
    await unlink(path.join(__dirname, '../public' + object.image));
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
};

module.exports = notesCtrl;