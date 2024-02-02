import React, { useEffect, useState } from "react";
import NoteList from "./component/NoteList";
import { nanoid } from "nanoid";
import Search from "./component/Search";
import Header from "./component/Header";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("temp-key"));
    console.log("Saved notes from localStorage:", savedNotes);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);  

  useEffect(() => {
    localStorage.setItem("temp-key", JSON.stringify(notes));
  }, [notes]);
  
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    console.log("Adding note:", newNote);
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div className={`${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((notes) =>
            notes.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
