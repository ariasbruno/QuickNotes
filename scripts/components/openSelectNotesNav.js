import { selectionAllVerification } from "./selectionAllVerification.js";

const $$ = (selector) => document.querySelectorAll(selector);
const $ = (selector) => document.querySelector(selector);

export function openSelectNotesNav () {
  selectionAllVerification()
  const $navSelection = $("#nav_bar-selection");
  const $main = $("#main");
  $navSelection.classList.add("open"); 

  if ($main.classList.contains("trash_section")) {
    $(".restore_selection_btn").style.display = "flex"
    $("#delete_trash_selection_btn").style.display = "flex"
    $("#delete_selection_btn").style.display = "none";

    $$(".select_trash_button").forEach(button => button.style.display = "flex");
    $$(".delete_trash_button").forEach(button => button.style.display = "none");
    $$(".restore_note_button").forEach(button => button.style.display = "none");

  } else if ($main.classList.contains("notes_section")) {
    $(".restore_selection_btn").style.display = "none";
    $("#delete_trash_selection_btn").style.display = "none";
    $("#delete_selection_btn").style.display = "flex";

    $$(".delete_button").forEach(button => button.style.display = "none");
  }
}