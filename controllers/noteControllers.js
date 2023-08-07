const noteModel = require("../models/notes");

const createNote = async(req, res) => {
    console.log(req.userId);
};

const updateNote = (req, res) => {};
 
const deleteNote = (req, res) => {};

const getNote = (req, res) => {};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNote,
};
