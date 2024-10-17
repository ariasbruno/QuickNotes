import { DisplayNotes } from "../../view/DisplayNotes.js";
import { useAlert } from "../useAlert.js";

export function clickDeleteNotes(nI) { // ! MOVER NOTA A PAPELERA
  let notes = JSON.parse(localStorage.getItem("notes"))
  let trash = JSON.parse(localStorage.getItem("trash"))
  const notesToRestore = JSON.parse(localStorage.getItem("notes"))
  const trashToRestore = JSON.parse(localStorage.getItem("trash"))

  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).toastUndo;
  const deletedNote = notes[nI];
  
  notes = notes.filter(n => n.id !== deletedNote.id);
  localStorage.setItem('notes', JSON.stringify(notes));
  trash.push(deletedNote);
  localStorage.setItem('trash', JSON.stringify(trash));

  DisplayNotes();

  if (showAlertConfirm) {
    useAlert("move to trash", "note").then(restore => {
      if (restore) {
        localStorage.setItem('notes', JSON.stringify(notesToRestore));
        localStorage.setItem('trash', JSON.stringify(trashToRestore));
        DisplayNotes();
      }
    });
  }
}