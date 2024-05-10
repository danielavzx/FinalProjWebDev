// Importing required modules
const express = require('express'); // Importing Express framework
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction
const Note = require('../models/notes'); // Importing the Note model

// Creating an Express router instance
const router = express.Router();

// GET request handler for fetching all notes
router.get('/', (req, res) => {
    // Using the Note model to find all notes in the database
    Note.find().exec().then((results) => {
        // Logging the results to the console
        console.log(results);
        // Sending a JSON response with the retrieved notes and a 200 status code
        res.status(200).json(results);
    })
    .catch((err) => {
        // Handling errors by logging them and sending a 500 status code with an error message
        console.log(err);
        res.status(500).json({error: err});
    });
});

// POST request handler for creating a new note
router.post('/', (req, res) => {
    // Creating a new Note instance with data from the request body
    const note = new Note({
        _id: new mongoose.Types.ObjectId(), // Generating a new ObjectId for the note
        title: req.body.title, // Extracting title from request body
        content: req.body.content, // Extracting content from request body
    });
    // Saving the new note to the database
    note.save().then((result) => {
        // Logging the saved note to the console
        console.log(result)
        // Sending a JSON response with a success message and the created note data
        res.status(201).json({
            message: 'Note created',
            createdNote: result,
        })
    })
    .catch((err) => {
        // Handling errors by logging them and sending a 500 status code with an error message
        console.log(err);
        res.status(500).json({ error: err});
    });
});

// PATCH request handler for updating a note by ID
router.patch('/:id', (req, res) => {
    // Extracting note ID from request parameters
    const id = req.params.id;
    // Updating the note with the specified ID using data from the request body
    Note.updateOne({_id: id}, {$set: req.body}).exec().then(result => {
        // Logging the update result to the console
        console.log(result);
        // Sending a JSON response with the update result and a 200 status code
        res.status(200).json(result);
    }).catch(err => {
        // Handling errors by logging them and sending a 500 status code with an error message
        console.log(err);
        res.status(500).json({error: err});
    });
});

// DELETE request handler for deleting a note by ID
router.delete('/:id', (req,res) => {
    // Extracting note ID from request parameters
    const id = req.params.id;
    const objectId = mongoose.Types.ObjectId(id);
    // Deleting the note with the specified ID from the database
    Note.deleteOne({_id: objectid}).exec().then(result => {
        // Logging the delete result to the console
        console.log(result);
        // Sending a JSON response with the delete result and a 200 status code
        res.status(200).json(result);
    }).catch(err => {
        // Handling errors by sending a 500 status code with an error message
        res.status(500).json({error: err});
    });
});


// Exporting the router instance to be used in other parts of the application
module.exports = router;
