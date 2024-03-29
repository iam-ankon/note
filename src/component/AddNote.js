import React, { useState } from "react";

const AddNote = ({handleAddNote}) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;
  const handleChange = (event) => {
    if(characterLimit - event.target.value.length >=0){
        setNoteText(event.target.value);
    }
    
  };
  const handleSaveClick = () => {
    if (noteText.trimEnd().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };
  return (
    <div className="note-new">
      <textarea
        rows="8"
        cols="25"
        placeholder="Type Your Note...."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit-noteText.length} remaining</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
