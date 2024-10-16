const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let notes = JSON.parse(localStorage.getItem("notes"))
let trash = JSON.parse(localStorage.getItem("trash"))

const $main = $("#main");

const $$allBtnSelect = $$(".select_trash_button");
const $$allBtnRestoreNote = $$(".restore_note_button");
const $$allTrashBtnDelete = $$(".delete_trash_button");

const $$allBtnDelete = $$(".delete_button");

export function clickEscNavSelection () { // ! ESC DE SELECCIÓN
  const $navSelection = $("#nav_bar-selection");

  $("#btn-select_nav").classList.remove("all-select");
  $navSelection.classList.remove("open");

  if ($main.className === "trash_section") {
    if ($$(".item_select").length > 0){
      for (let i = 0; i < trash.length; i++) {
        const $$noteItem = $$(`[data-note-id="${trash[i].id}"]`)[0];
        if ($$noteItem.classList.contains("item_select")) {
          $$noteItem.classList.toggle("item_select");
        }
      }
    }
    $$allTrashBtnDelete.forEach(button => {
      button.style.display = "flex";
    });
    $$allBtnRestoreNote.forEach(button => {
      button.style.display = "flex";
    });
    $$allBtnSelect.forEach(button => {
      button.style.display = "none";
    });

  } else if ($main.className === "notes_section") {
    if ($$(".item_select").length > 0){
      for (let i = 0; i < notes.length; i++) {
        const $$noteItem = $$(`[data-note-id="${notes[i].id}"]`)[0];
        if ($$noteItem.classList.contains("item_select")) {
          $$noteItem.classList.toggle("item_select");
        }
      }
    }
    $$allBtnDelete.forEach(button => {
    button.style.display = "flex";
    });
  }
}