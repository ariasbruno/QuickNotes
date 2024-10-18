import { DisplayTrash } from "../../view/DisplayTrash.js";
import { isAlertActive } from "../../config/isAlertActive.js";
import { useAlert } from "../use_interactables/useAlert.js";

const $$ = (selector) => document.querySelectorAll(selector);
const $ = (selector) => document.querySelector(selector);

export function deleteAllSelectionTrash () {
  if ($$(".item_select").length <= 0) {$("#nav_bar-selection").classList.remove("open"); return};
  let trash = JSON.parse(localStorage.getItem("trash"))
  const showAlertConfirm = JSON.parse(localStorage.getItem("config")).alertConfirmDeleteSelection;
  const messageAlert = $$(".item_select").length > 1 ? "notes" : "note";
  const $$allSelectedItems = Array.from($$(".item_select"));

  function deleteFunction () {
    let selectedNotesIds = $$allSelectedItems.map(item => Number(item.dataset.noteId))
    trash = trash.filter(note => !selectedNotesIds.includes(note.id))
    localStorage.setItem('trash', JSON.stringify(trash));
    DisplayTrash()
      $("#nav_bar-selection").classList.remove("open");
  };

  if (showAlertConfirm) {
    useAlert("delete permanently", messageAlert).then((resolve) => {
      if (resolve) {
        deleteFunction()
      }
      isAlertActive("delete selection")
    });
  } else if (!showAlertConfirm) {
    deleteFunction()
  }
}