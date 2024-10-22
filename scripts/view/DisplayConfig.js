import { clickOpenCloseSidebar } from "../components/use_interactables/useSidebar.js";

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

export function DisplayConfig() {
  clickOpenCloseSidebar("close")
  $("#nav_bar-selection").classList.remove("open");
  let config = JSON.parse(localStorage.getItem("config"));

  $("#nav-text").innerText="Configuración"

  $("#nav_dynamic_button").style.display = "none"
  $("#btn_order").style.display = "none"
  $("#nav_select_all").style.display = "none"
  
  const $btnNotesSidebar = $("#btn_notes");
  const $btnTrashSidebar = $("#btn_trash");
  const $btnConfigSidebar = $("#btn_config");
  $btnNotesSidebar.classList.remove("active");
  $btnTrashSidebar.classList.remove("active");
  $btnConfigSidebar.classList.add("active");


  const $main = $("#main");
  $main.innerHTML= `
  <div id="config_section">
    <div class="div_switch">
      <p id="config_delete-permanently-p">Mostrar alerta de confirmación para borrar notas de la papelera</p>
      <label class="switch config_delete-permanently" for="config_delete-permanently">
        <input aria-labelledby="config_delete-permanently-p" id="config_delete-permanently" class="config_delete-permanently" type="checkbox" name="config_delete-permanently">
        <span class="slider config_delete-permanently" name="config_delete-permanently"></span>
      </label>
    </div>
    <div class="div_switch">
      <p id="config_delete-permanently-selection-p">Mostrar alerta de confirmación para borrar las notas seleccionadas de la papelera</p>
      <label class="switch config_delete-permanently-selection" for="config_delete-permanently-selection">
        <input aria-labelledby="config_delete-permanently-selection-p" id="config_delete-permanently-selection" class="config_delete-permanently-selection" type="checkbox" name="config_delete-permanently-selection">
        <span class="slider config_delete-permanently-selection" name="config_delete-permanently-selection"></span>
      </label>
    </div>
    <div class="div_switch">
      <p id="config_move-to-trash-p">Mostrar alerta para deshacer luego de mover una nota a la papelera</p>
      <label class="switch config_move-to-trash" for="config_move-to-trash">
        <input aria-labelledby="config_move-to-trash-p" id="config_move-to-trash" class="config_move-to-trash" type="checkbox" name="config_move-to-trash">
        <span class="slider config_move-to-trash" name="config_move-to-trash"></span>
      </label>
    </div>
    <div class="div_switch">
      <p id="config_empty-note-p">Mostrar alerta de confirmación de borrar una nota vacía</p>
      <label class="switch config_empty-note" for="config_empty-note">
        <input aria-labelledby="config_empty-note-p" id="config_empty-note" class="config_empty-note" type="checkbox" name="config_empty-note">
        <span class="slider config_empty-note" name="config_empty-note"></span>
      </label>
    </div>
    <div class="div_delete-all-data">
      <p id="delete-all-data-p">Borrar todos los datos guardados en la web</p>
      <div>
        <button aria-labelledby="delete-all-data-p" id="config_delete-all-data">Borrar Todo</button>
      </div>
    </div>
  </div>`

  const $BtnDeletePermanently = $("#config_delete-permanently");
  const $deletePermanentlySelection = $("#config_delete-permanently-selection");
  const $moveToTrash = $("#config_move-to-trash");
  const $emptyNote = $("#config_empty-note");


  if (config.alertConfirmDelete === true) {
    $BtnDeletePermanently.checked = true
  } else {
    $BtnDeletePermanently.checked = false
  }

  if (config.alertConfirmDeleteSelection === true) {
    $deletePermanentlySelection.checked = true
  } else {
    $deletePermanentlySelection.checked = false
  }

  if (config.toastUndo === true) {
    $moveToTrash.checked = true
  } else {
    $moveToTrash.checked = false
  }

  if (config.alertEmptyNote === true) {
    $emptyNote.checked = true
  } else {
    $emptyNote.checked = false
  }  
};