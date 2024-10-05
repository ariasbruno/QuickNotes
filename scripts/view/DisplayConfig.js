export function DisplayConfig() {
  let config = JSON.parse(localStorage.getItem("config")) || {notesOrder: "column", alertConfirmDelete: true,alertConfirmDeleteSelection: true, alertEmptyNote: true, toastUndo: true};
  const navText = document.getElementById("nav-text")
  navText.innerText="Configuración"

  document.getElementById("nav_dynamic_button").style.display = "none"
  document.getElementById("btn_order").style.display = "none"
  document.getElementById("nav_select_all").style.display = "none"
  
  const btnNotesSidebar = document.getElementById("btn_notes");
  const btnTrashSidebar = document.getElementById("btn_trash");
  const btnConfigSidebar = document.getElementById("btn_config");
  btnNotesSidebar.classList.remove("active");
  btnTrashSidebar.classList.remove("active");
  btnConfigSidebar.classList.add("active");


  const main = document.querySelector("#main");
  main.innerHTML= `<div id="config_section">

  <div class="div_switch">
    <p>Mostrar alerta de confirmación para borrar notas de la papelera</p>
    <label class="switch config_delete-permanently" for="config_delete-permanently">
      <input id="config_delete-permanently" class="config_delete-permanently" type="checkbox" name="config_delete-permanently">
      <span class="slider config_delete-permanently" name="config_delete-permanently"></span>
    </label>
  </div>
  <div class="div_switch">
    <p>Mostrar alerta de confirmación para borrar las notas seleccionadas de la papelera</p>
    <label class="switch config_delete-permanently-selection" for="config_delete-permanently-selection">
      <input id="config_delete-permanently-selection" class="config_delete-permanently-selection" type="checkbox" name="config_delete-permanently-selection">
      <span class="slider config_delete-permanently-selection" name="config_delete-permanently-selection"></span>
    </label>
  </div>
  <div class="div_switch">
    <p>Mostrar alerta para deshacer luego de mover una nota a la papelera</p>
    <label class="switch config_move-to-trash" for="config_move-to-trash">
      <input id="config_move-to-trash" class="config_move-to-trash" type="checkbox" name="config_move-to-trash">
      <span class="slider config_move-to-trash" name="config_move-to-trash"></span>
    </label>
  </div>
  <div class="div_switch">
    <p>Mostrar alerta de confirmación de borrar una nota vacía</p>
    <label class="switch config_empty-note" for="config_empty-note">
      <input id="config_empty-note" class="config_empty-note" type="checkbox" name="config_empty-note">
      <span class="slider config_empty-note" name="config_empty-note"></span>
    </label>
  </div>



</div>`

  const BtnDeletePermanently = document.getElementById("config_delete-permanently");
  const deletePermanentlySelection = document.getElementById("config_delete-permanently-selection");
  const moveToTrash = document.getElementById("config_move-to-trash");
  const emptyNote = document.getElementById("config_empty-note");


  if (config.alertConfirmDelete === true) {
    BtnDeletePermanently.checked = true
  } else {
    BtnDeletePermanently.checked = false
  }

  if (config.alertConfirmDeleteSelection === true) {
    deletePermanentlySelection.checked = true
  } else {
    deletePermanentlySelection.checked = false
  }

  if (config.toastUndo === true) {
    moveToTrash.checked = true
  } else {
    moveToTrash.checked = false
  }

  if (config.alertEmptyNote === true) {
    emptyNote.checked = true
  } else {
    emptyNote.checked = false
  }
  
  
};