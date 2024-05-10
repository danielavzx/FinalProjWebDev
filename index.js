// Importing required modules
const express = require('express'); // Importing Express framework
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction
const cors = require('cors'); // Importing CORS for handling cross-origin requests

// Importing routes defined for handling notes
const noteRoutes = require('./routes/note-routes');

// Creating an Express application instance
const app = express();

// connecting to mongoDB
mongoose.connect("mongodb+srv://dv2487:n7EsXPaLYNJFE4pM@finalproj.x5rfuv3.mongodb.net/?retryWrites=true&w=majority&appName=FinalProj");

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware setup
//app.use(cors()); // Enabling CORS middleware to handle cross-origin requests

// Enable CORS with specific options
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this origin
    methods: 'get,post,patch,delete', // Allow only specified HTTP methods
}));

app.use(express.json()); // Parsing JSON request bodies
app.use('/notes', noteRoutes); // Mounting note routes at '/notes' endpoint

// Default route handler for API root
app.get('/', (req, res) => {
    // Sending a JSON response to confirm that the API is working
    res.json({message : 'API works'});
});

// Starting the Express server on port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000'); // Logging a message to indicate server startup
});


