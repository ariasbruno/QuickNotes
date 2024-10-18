import { useAlert } from "../components/use_interactables/useAlert.js";

export function deleteAllData () {
  useAlert("delete data").then((resolve) => {
    if (resolve) {
      localStorage.clear()

      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      let config = JSON.parse(localStorage.getItem("config")) || {notesOrder: "column", alertConfirmDelete: true,alertConfirmDeleteSelection: true, alertEmptyNote: true, toastUndo: true};
      let trash = JSON.parse(localStorage.getItem("trash")) || [];
          
      localStorage.setItem("notes", JSON.stringify(notes))
      localStorage.setItem("config", JSON.stringify(config))
      localStorage.setItem("trash", JSON.stringify(trash))
    }
  });
}