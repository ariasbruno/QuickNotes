import { DisplayNotes } from "../../view/DisplayNotes.js";
import { useAlert } from "../useAlert.js";

const $$ = (selector) => document.querySelectorAll(selector);
const $ = (selector) => document.querySelector(selector);

export function deleteNoteSelected () {
  const $$allSelectedItems = $$(".item_select")
  if ($$allSelectedItems.length <= 0) {$("#nav_bar-selection").classList.remove("open"); return};
  let notes = JSON.parse(localStorage.getItem("notes"))
  let trash = JSON.parse(localStorage.getItem("trash"))
  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).toastUndo;
  const trashToRestore = JSON.parse(localStorage.getItem("trash"))
  const notesToRestore = JSON.parse(localStorage.getItem("notes"))

  let messageAlert = $$allSelectedItems.length > 1 ? "notes" : "note";

    let selectedNotesIds = Array.from($$allSelectedItems).map(item => Number(item.dataset.noteId))
    const newTrash = notes.filter(n => selectedNotesIds.includes(n.id))    
    trash.push(...newTrash)
    localStorage.setItem('trash', JSON.stringify(trash))
    notes = notes.filter(n => !selectedNotesIds.includes(n.id))
    localStorage.setItem('notes', JSON.stringify(notes))
    DisplayNotes();
    $("#nav_bar-selection").classList.remove("open");
  
    if (!showAlertConfirm) return;

  useAlert("move to trash", messageAlert).then((restore => {
    if (restore) {
      localStorage.setItem('trash', JSON.stringify(trashToRestore))
      localStorage.setItem('notes', JSON.stringify(notesToRestore))
      DisplayNotes();
    }
  }));
};