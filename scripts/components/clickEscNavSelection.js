const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

export function clickEscNavSelection () {
  const $$allNoteItem = $$(".note_item")
  
  const $main = $("#main");

  const $$allBtnSelect = $$(".select_trash_button");
  const $$allBtnRestoreNote = $$(".restore_note_button");
  const $$allTrashBtnDelete = $$(".delete_trash_button");
  
  const $$allBtnDelete = $$(".delete_button");

  $("#btn-select_nav").classList.remove("all-select");
  $("#nav_bar-selection").classList.remove("open");

  $$allNoteItem.forEach(item => item.classList.remove("item_select"))

  if ($main.classList.contains("trash_section")) {
    $$allTrashBtnDelete.forEach(button => button.style.display = "flex");
    $$allBtnRestoreNote.forEach(button => button.style.display = "flex");
    $$allBtnSelect.forEach(button => button.style.display = "none");

  } else if ($main.classList.contains("notes_section")) {
    $$allBtnDelete.forEach(button => button.style.display = "flex");
  }
}