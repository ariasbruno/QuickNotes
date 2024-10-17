import { selectionAllVerification } from "../../selectionAllVerification.js";

const $$ = (selector) => document.querySelectorAll(selector);
const $ = (selector) => document.querySelector(selector);

export function selectNote (idElemento) {
  const $navSelection = $("#nav_bar-selection");
  const $main = $("#main");
  const $$noteItem = $$(`[data-note-id="${idElemento}"]`)[0];
  $$noteItem.classList.toggle("item_select");
  
  if ($$(".item_select").length > 0) {
    selectionAllVerification()
    const $$btnDelete = $$(".delete_button");

    $$btnDelete.forEach(button => button.style.display = "none");
    $navSelection.classList.add("open");
    if ($main.classList.contains("notes_section")) $(".restore_selection_btn").style.display = "none";

  } else if ($$(".item_select").length === 0) {
    const $$btnDelete = $$(".delete_button");

    $$btnDelete.forEach(button => button.style.display = "flex");
    $navSelection.classList.remove("open");
  }  
}