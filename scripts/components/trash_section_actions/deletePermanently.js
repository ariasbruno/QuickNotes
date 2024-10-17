import { DisplayTrash } from "../../view/DisplayTrash.js";
import { isAlertActive } from "../../config/isAlertActive.js";
import { useAlert } from "../useAlert.js";

export function deletePermanently(index){
  let trash = JSON.parse(localStorage.getItem("trash"))
  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).alertConfirmDelete;
  if (showAlertConfirm) {
    useAlert("delete permanently", "note").then(resolve => {
      if (resolve) {
        trash = trash.filter(t => t.id !== trash[index].id);
        localStorage.setItem('trash', JSON.stringify(trash));
        DisplayTrash()
      }
      isAlertActive("delete")
    });
  } else if (!showAlertConfirm) {
    trash = trash.filter(t => t.id !== trash[index].id);
    localStorage.setItem('trash', JSON.stringify(trash));
    DisplayTrash();
  }
}