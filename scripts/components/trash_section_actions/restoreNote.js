import { DisplayTrash } from "../../view/DisplayTrash.js";

export function restoreNote (index) {
  let notes = JSON.parse(localStorage.getItem("notes"))
  let trash = JSON.parse(localStorage.getItem("trash"))

  const newNote = trash[index];
  trash = trash.filter(t => t.id !== trash[index].id);
  localStorage.setItem('trash', JSON.stringify(trash));
  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));
  DisplayTrash();
}