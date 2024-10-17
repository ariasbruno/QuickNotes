import { selectionAllVerification } from "./selectionAllVerification.js";

const $$ = (selector) => document.querySelectorAll(selector);
const $ = (selector) => document.querySelector(selector);

export function clickNavSelectNotesBtn () {
  let notesNow = JSON.parse(localStorage.getItem("notes"))
  let trashNow = JSON.parse(localStorage.getItem("trash"))
  const $main = $("#main");

let n = $main.className === "notes_section" ? 1 : 0
let typeItem = $main.className === "notes_section" ? notesNow : trashNow

  if ($$(".item_select").length !== $$(".note_item").length - n) {
    for (let i = 0; i < typeItem.length; i++) {
      const $$noteItem = $$(`[data-note-id="${typeItem[i].id}"]`)[0];
      if (!$$noteItem.classList.contains("item_select")) {
        $$noteItem.classList.add("item_select");
      }
    }
  } else if ($$(".item_select").length === $$(".note_item").length - n) {
    for (let i = 0; i < typeItem.length; i++) {
      const $$noteItem = $$(`[data-note-id="${typeItem[i].id}"]`)[0];
      if ($$noteItem.classList.contains("item_select")) {
        $$noteItem.classList.remove("item_select");
      }
    }
  }
  selectionAllVerification()
}