import { DisplayNotes } from './scripts/view/DisplayNotes.js';
import { DisplayTrash } from './scripts/view/DisplayTrash.js';
import { DisplayConfig } from './scripts/view/DisplayConfig.js';
import { changeNotesOrder } from './scripts/components/changeNotesOrder.js';
import { useAlert } from './scripts/components/use_interactables/useAlert.js';
import { modalAction } from './scripts/components/use_interactables/useModal.js'
import { clickOpenCloseSidebar } from './scripts/components/use_interactables/useSidebar.js'
import { isAlertActive } from './scripts/config/isAlertActive.js'
import { configItems } from './scripts/config/configItems.js'
import { deleteAllData } from './scripts/config/deleteAllData.js'
import { handlerTheme } from './scripts/theme/handlerTheme.js';
import { loadIcon } from './scripts/theme/loadIcon.js';
import { updateToolbar } from './scripts/components/rich_text_editor/updateToolbar.js';
import { handlerRead } from './scripts/components/modal/handlerRead.js';
import { notesInfo } from './scripts/components/modal/notesInfo.js';
import { handlerNoteOptions } from './scripts/components/modal/handlerNoteOptions.js';
import { clickEscNavSelection } from './scripts/components/clickEscNavSelection.js';
import { openSelectNotesNav } from './scripts/components/openSelectNotesNav.js';
import { clickNavSelectNotesBtn } from './scripts/components/clickNavSelectNotesBtn.js';
import { deleteAllSelectionTrash } from './scripts/components/trash_section_actions/deleteAllSelectionTrash.js'
import { restoreAllSelectionTrash } from './scripts/components/trash_section_actions/restoreAllSelectionTrash.js'
import { restoreNote } from './scripts/components/trash_section_actions/restoreNote.js'
import { deletePermanently } from './scripts/components/trash_section_actions/deletePermanently.js'
import { deleteNoteSelected } from './scripts/components/note_section_actions/deleteNoteSelected.js'
import { clickDeleteNotes } from './scripts/components/note_section_actions/clickDeleteNotes.js'
import { selectNote } from './scripts/components/note_section_actions/selectNote.js'

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $navSelection = $("#nav_bar-selection");
const $main = $("#main");
const $closeSaveNote = $("#close");
const $$closeSaveNote = $$(".close");
const $inputTitle = $("#title");
const $inputContent = $("#note_text");


let getNotes = JSON.parse(localStorage.getItem("notes")) || [];
let getConfig = JSON.parse(localStorage.getItem("config")) || {notesOrder: "column", alertConfirmDelete: true,alertConfirmDeleteSelection: true, alertEmptyNote: true, toastUndo: true};
let getTrash = JSON.parse(localStorage.getItem("trash")) || [];

localStorage.setItem("notes", JSON.stringify(getNotes))
localStorage.setItem("config", JSON.stringify(getConfig))
localStorage.setItem("trash", JSON.stringify(getTrash))

window.addEventListener("load", () => { DisplayNotes(); loadIcon() });

window.addEventListener("click", (e) => {
  let notesNow = JSON.parse(localStorage.getItem("notes"))
  let trashNow = JSON.parse(localStorage.getItem("trash"))  
  
  let idElement = e.target.getAttribute("data-note-id");
  let noteIndex = notesNow.findIndex(n => n.id === Number(idElement));
  let trashIndex = trashNow.findIndex(n => n.id === Number(idElement));  

  const clickEvents = {
    "open_toolbar": () => {$(".toolbar").classList.toggle("open");$("#open_toolbar-btn").classList.toggle("open"); $("#note_modal-div").classList.toggle('shifted');},
    "only_read": () => handlerRead(),
    "theme_toggle": () => handlerTheme(),
    "nav_select_all": () => openSelectNotesNav(),
    "btn-select_nav": () => clickNavSelectNotesBtn(),
    "esc_nav_selection": () => clickEscNavSelection(),
    "nav_new_note_dynamic": () => {clickCreateNote(); updateToolbar()},
    "btn_order": () => changeNotesOrder(),
    "open_sidebar": () => clickOpenCloseSidebar("toggle"),
    "note": () => {clickEditNote(noteIndex); updateToolbar()},
    "new_note": () => {clickCreateNote(); updateToolbar()},
    "close": () => backButtonListener(),
    "close_options-modal": () => notesInfo(undefined, "close"),
    "note_options": () => handlerNoteOptions(),
    "delete_button": () => clickDeleteNotes(noteIndex),
    "btn-toast_alert": () => DisplayNotes(),
    "select_button": () => selectNote(idElement),
    "select_trash_button": () => selectNote(idElement),
    "delete_selection_btn": () => deleteNoteSelected(),
    "delete_trash_selection_btn": () => deleteAllSelectionTrash(),
    "restore_selection_btn": () => restoreAllSelectionTrash(),
    "delete_trash_button": () => deletePermanently(trashIndex),
    "restore_note_button": () => restoreNote(trashIndex),
    "sidebar_div_trash": () => DisplayTrash(),
    "sidebar_div_notes": () => DisplayNotes(),
    "sidebar_div_config": () => DisplayConfig(),
    forId:{
      "config_delete-permanently": () => configItems("#config_delete-permanently"),
      "config_delete-permanently-selection": () => configItems("#config_delete-permanently-selection"),
      "config_move-to-trash": () => configItems("#config_move-to-trash"),
      "config_delete-all-data": () => deleteAllData(),
      "config_empty-note": () => configItems("#config_empty-note"),
      "note_options-info": () => notesInfo(noteIndex, "open"),
    }
  }
  if (clickEvents.forId[e.target.id]){
    clickEvents.forId[e.target.id]()
  } else {
    for (const className of e.target.classList) {
      if (clickEvents[className]) {
        clickEvents[className]();
        break;
      }
    }
  }
});

function clickCreateNote() { // ! CREAR NOTA
  $$closeSaveNote.forEach(e => e.setAttribute("data-note-id", `new-note`))
  $inputTitle.value = "";
  $inputContent.innerHTML = "";
  modalAction("open");
  $inputTitle.focus()
  backButtonListener();
}

let note
function clickEditNote (nI) { // ! EDITAR NOTA
  let notesNow = JSON.parse(localStorage.getItem("notes"))
  if(!$(".nav_bar-selection").classList.contains("open")){
    $$(".close").forEach(e => e.setAttribute("data-note-id", `${nI}`))
    $("#note_options-info").setAttribute("data-note-id", `${notesNow[nI].id}`)
    note = notesNow[nI];
    $inputTitle.value = note.title;
    $inputContent.innerHTML = note.text;
    modalAction("open");
    $inputTitle.focus()
    backButtonListener();
  }
}

function backButtonListener () { // * EVENTO CLICK Y KEYDOWN[esc] PARA SALIR DEL MODAL
  $closeSaveNote.removeEventListener("click", handleCloseNote);
  document.removeEventListener("keydown", handleEscKey);
  $closeSaveNote.addEventListener("click", handleCloseNote);
  document.addEventListener("keydown", handleEscKey);

  let typeNote = $closeSaveNote.getAttribute("data-note-id")
  
  function handleCloseNote() {
    notesInfo(undefined, "close")
    if (typeNote === "new-note") {
      createNoteFunction();
    } else {
      updateNoteFunction(typeNote, note);
    }
    $closeSaveNote.removeEventListener("click", handleCloseNote);
    document.removeEventListener("keydown", handleEscKey);
  };
  
  function handleEscKey(event) {
    if (event.key === "Escape") {
      handleCloseNote();
      notesInfo(undefined, "close")
    }
  }
}

function createNoteFunction () { // ! CREAR NOTAS
  let notesNow = JSON.parse(localStorage.getItem("notes"))

  let titleValue = $inputTitle.value.trim();
  let textValue = $inputContent.innerHTML.trim();
  if (titleValue || textValue) {
    const newNote = {
      id: Date.now(),
      title: titleValue,
      text: textValue,
      edit: Date.now()
    };
    
    notesNow.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesNow));
    
    DisplayNotes();
    modalAction("close");
    $inputTitle.value = "";
    $inputContent.value = "";
  } else if (!titleValue && !textValue) {
    DisplayNotes();
    modalAction("close");
  };
};

function updateNoteFunction(index, n) { // ! EDITAR NOTAS
  let notesNow = JSON.parse(localStorage.getItem("notes"))

  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).alertEmptyNote
  const note = notesNow[index]
  let titleValue = $inputTitle.value.trim();
  let textValue = $inputContent.innerHTML.trim();
  
  const noChange = note.title === titleValue && note.text === textValue;

  const titleOrText = titleValue !== "" || (textValue !== "" && textValue !== "<br>");

  const emptyNote = titleValue === "" && (textValue === "" || textValue === "<br>");

  if (noChange) {
    DisplayNotes();
    modalAction("close");

  } else if (titleOrText) {
    note.title = titleValue;
    note.text = textValue;
    note.edit = Date.now();
    localStorage.setItem("notes", JSON.stringify(notesNow));
    DisplayNotes();
    modalAction("close");

  } else if (emptyNote) {
    if (showAlertConfirm) {
      useAlert("empty note").then(resolve=> {
        if(resolve){
          isAlertActive("empty note")
          notesNow = notesNow.filter(n => n.id !== notesNow[index].id);
          localStorage.setItem("notes", JSON.stringify(notesNow));
          modalAction("close");
          DisplayNotes();
        }else if (!resolve){
          isAlertActive("empty note")
          $inputTitle.value = n.title;
          $inputContent.innerHTML = n.text;
          updateToolbar()
          backButtonListener()
        }
      })
    } else if (!showAlertConfirm) {
      notesNow = notesNow.filter(n => n.id !== notesNow[index].id);
      localStorage.setItem("notes", JSON.stringify(notesNow));
      modalAction("close");
      DisplayNotes();
    }
  }
};