import React, { useState, useEffect } from "react"; // Importing React hooks for state management and side effects
import axios from 'axios'; // Importing Axios for making HTTP requests
import Header from "./Header"; // Importing Header component
import Footer from "./Footer"; // Importing Footer component

function App() {
  const [notes, setNotes] = useState([]); // State for storing notes fetched from backend
  const [newNote, setNewNote] = useState({ // State for storing new note input
    title: "",
    content: ""
  });

  // Function to fetch notes from the backend when the component mounts
  useEffect(() => {
    fetchNotes(); // Invoking fetchNotes function
  }, []);

  // Function to fetch notes from the backend
  const fetchNotes = async () => {
    try {
      // Making a GET request to fetch notes from backend
      const response = await axios.get(`http://localhost:5000/notes`);
      setNotes(response.data); // Updating notes state with fetched data
    } catch (error) {
      console.error("Error fetching notes:", error); // Logging error if fetching fails
    }
  };

  // Function to handle input change for new note
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Updating newNote state with the changed input value
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  };

  // Function to handle submission of new note
  const submitNote = async (event) => {
    event.preventDefault(); // Preventing default form submission behavior
    try {
      // Making a POST request to add a new note to the backend
      const response = await axios.post(`http://localhost:5000/notes`, newNote);
      // Updating notes state with the newly added note
      setNotes([...notes, response.data]);
      // Resetting newNote state to clear input fields
      setNewNote({
        title: "",
        content: ""
      });
    } catch (error) {
      console.error("Error adding note:", error); // Logging error if adding note fails
    }
  };  

  // Function to handle deletion of note

 
  
  const deleteNote = (_id) => {
    axios.delete(`http://localhost:5000/notes/${_id}`).then((res) => {
        console.log(res.data);
        setNotes(notes.filter((note) => note._id !== _id));
    }).catch((error) => {
        console.error("Error deleting note:", error);
      });
    };

  return (
    <div>
      <Header />
      <div className="create-area">
        <form onSubmit={submitNote}>
          <input
            name="title"
            value={newNote.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={newNote.content}
            onChange={handleChange}
            placeholder="Take a note..."
            rows="3"
          />
          <button type="submit">Add</button>
        </form>
      </div>
      {notes.map((note) => (
        <div key={note._id} className="note">
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note._id)}>DELETE</button>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default App;