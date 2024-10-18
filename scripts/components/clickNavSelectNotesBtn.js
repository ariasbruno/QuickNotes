import { selectionAllVerification } from "./selectionAllVerification.js";

const $$ = (selector) => document.querySelectorAll(selector);
const $ = (selector) => document.querySelector(selector);

export function clickNavSelectNotesBtn () {
  let notes = JSON.parse(localStorage.getItem("notes"))
  let trash = JSON.parse(localStorage.getItem("trash"))
  const $main = $("#main");

let n = $main.classList.contains("notes_section") ? 1 : 0
let typeItem = $main.classList.contains("notes_section") ? notes : trash

const isSelectAll = $$(".item_select").length === $$(".note_item").length - n;

  $$(".note_item").forEach((noteItem, index) => {
    if (noteItem.classList.contains("new_note")) return;
    
    const noteId = typeItem[index].id;
    const $$noteItem = $$(`[data-note-id="${noteId}"]`)[0];
    const isItemSelect = $$noteItem.classList.contains("item_select");
    
    if (isSelectAll) {
      if (isItemSelect) $$noteItem.classList.remove("item_select");
    } else {
      if (!isItemSelect) $$noteItem.classList.add("item_select");
    }
  })

  selectionAllVerification()
}