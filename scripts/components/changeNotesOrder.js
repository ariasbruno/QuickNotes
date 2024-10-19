import { DisplayNotes } from "../view/DisplayNotes.js";
import { DisplayTrash } from "../view/DisplayTrash.js";

export function changeNotesOrder () {
  const $main = document.querySelector("#main");
  let config = JSON.parse(localStorage.getItem("config"))

  if (config.notesOrder === "grid") {
    config.notesOrder = "column"
    localStorage.setItem('config', JSON.stringify(config));
  } else if (config.notesOrder === "column") {
    config.notesOrder = "grid";
    localStorage.setItem('config', JSON.stringify(config));
  }

  if ($main.className === "notes_section") {
    DisplayNotes();
  } else if ($main.className === "trash_section") {
    DisplayTrash();
  }
};