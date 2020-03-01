const notesCtrl = {};
const Note = require ('../models/Note')

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
    const{title, description} = req.body;
    const image =  '/img/uploads/' + req.file.filename;
    const newNote = new Note({title, description, image});
    await newNote.save();
    res.send('new note');
    console.log(newNote);
};

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find()
    res.render('notes/all-notes', {notes})
}

notesCtrl.renderEditForm = (req, res) => {
    res.send('render Edit Form');
};

notesCtrl.updateNote = (req, res) => {
    res.send('update note');
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
};

module.exports = notesCtrl;