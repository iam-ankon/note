import React, { useEffect, useState } from "react";
import NoteList from "./component/NoteList";
import { nanoid } from "nanoid";
import Search from "./component/Search";
import Header from "./component/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "ankon and my life",
      date: "12/12/2024",
    },
    {
      id: nanoid(),
      text: "ankon and my life",
      date: "12/12/2024",
    },
    {
      id: nanoid(),
      text: "ankon and my life",
      date: "12/12/2024",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(()=> {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    )
  },[notes])

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
