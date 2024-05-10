// Importing the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Defining a schema for the notes collection
const noteSchema = new mongoose.Schema({
    // Defining the type for the ID field as an ObjectId provided by mongoose
    _id: mongoose.Schema.Types.ObjectId,
    // Defining the type for the title field as a string
    title: String,
    // Defining the type for the content field as a string
    content: String,
});

// Creating a model from the schema, which represents a MongoDB collection
module.exports = mongoose.model('Note', noteSchema);
