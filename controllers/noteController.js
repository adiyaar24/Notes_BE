const Note = require('../models/NoteModel');
const User = require('../models/UserModel');

const getAllNotesForUser = async (req, res) => {
  const userId = req.userId;
  console.log('User Id' + userId);
  try {
    const notes = await Note.find({ user_id: userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addNoteForUser = async (req, res) => {
  const userId = req.userId;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required fields' });
  }

  try {
    const newNote = new Note({ user_id: userId, title, content });
    const savedNote = await newNote.save();
    await User.findByIdAndUpdate(userId, { $inc: { totalNotes: 1 } });

    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error" + error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateNoteForUser = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required fields' });
  }
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user_id: userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found for the authenticated user' });
    }

    res.json(updatedNote);
  } catch (error) {
    console.log("Error" + error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteNoteForUser = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    
    const deletedNote = await Note.findByIdAndDelete(id);    
    
    if (deletedNote) {
      await User.findByIdAndUpdate(userId, { $inc: { totalNotes: -1 } });
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.log("Error" + error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAllNotesForUser, addNoteForUser, updateNoteForUser, deleteNoteForUser };
