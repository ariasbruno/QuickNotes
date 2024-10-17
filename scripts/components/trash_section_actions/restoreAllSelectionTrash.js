import { DisplayTrash } from "../../view/DisplayTrash.js";

const $$ = (selector) => document.querySelectorAll(selector);

export function restoreAllSelectionTrash () {
  const $navSelection = document.querySelector("#nav_bar-selection");
  let trash = JSON.parse(localStorage.getItem("trash"))
  let notes = JSON.parse(localStorage.getItem("notes"))
  const $$allSelectedItems = $$(".item_select")

  let selectedNotesIds = Array.from($$allSelectedItems).map(item => Number(item.dataset.noteId))
  
  const newNotes = trash.filter(note => selectedNotesIds.includes(note.id))
  notes.push(...newNotes);
  localStorage.setItem('notes', JSON.stringify(notes));
  trash = trash.filter(note => !selectedNotesIds.includes(note.id))
  localStorage.setItem('trash', JSON.stringify(trash));
  
  DisplayTrash()
  if ($$(".item_select").length === 0 && $navSelection.classList.contains("open")) {
    $navSelection.classList.remove("open");
  }
}