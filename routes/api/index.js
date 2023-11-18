const express = require('express');
const router = express.Router();
const verifyToken = require('../../controllers/jwtDecodeController');
const { getAllNotesForUser, addNoteForUser, deleteNoteForUser, updateNoteForUser } = require('../../controllers/noteController');
const { registerUser, loginUser } = require('../../controllers/userController');

// Login Routes without Authorization Token
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes Below this
router.use(verifyToken);

router.get('/notes', getAllNotesForUser);
router.post('/notes', addNoteForUser);
router.put('/notes/:id', updateNoteForUser);
router.delete('/notes/:id', deleteNoteForUser);


module.exports = router;
