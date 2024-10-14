export function configItems(params) {
  const $ = selector => document.querySelector(selector)
  let config = JSON.parse(localStorage.getItem("config")) || {notesOrder: "column", alertConfirmDelete: true,alertConfirmDeleteSelection: true, alertEmptyNote: true, toastUndo: true};
  localStorage.setItem('config', JSON.stringify(config));

  if($(params).checked){
    params === "#config_delete-permanently"
  ? config.alertConfirmDelete = true
  : params === "#config_delete-permanently-selection"
  ? config.alertConfirmDeleteSelection = true
  : params === "#config_move-to-trash"
  ? config.toastUndo = true
  : config.alertEmptyNote = true;

    localStorage.setItem('config', JSON.stringify(config));
  } else if (!$(params).checked){
    params === "#config_delete-permanently"
  ? config.alertConfirmDelete = false
  : params === "#config_delete-permanently-selection"
  ? config.alertConfirmDeleteSelection = false
  : params === "#config_move-to-trash"
  ? config.toastUndo = false
  : config.alertEmptyNote = false;

    localStorage.setItem('config', JSON.stringify(config));
  }
}