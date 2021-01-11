const { Router } = require('express');
const router = Router();

const { renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote,
    getQuestions
} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth')

//Create notes

router.get('/preguntas/nueva-pregunta', isAuthenticated, renderNoteForm);

router.post('/preguntas/nueva-pregunta', isAuthenticated, createNewNote);

//Get all notes
router.get('/preguntas', isAuthenticated, renderNotes);
router.get('/questions', getQuestions);

//Edit notes
router.get('/preguntas/edit/:id', isAuthenticated, renderEditForm);

router.put('/preguntas/edit/:id', isAuthenticated, updateNote);

//Delete notes
router.delete('/preguntas/delete/:id', isAuthenticated,deleteNote);

module.exports = router;