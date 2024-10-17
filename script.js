import { DisplayNotes } from './scripts/view/DisplayNotes.js';
import { DisplayTrash } from './scripts/view/DisplayTrash.js';
import { DisplayConfig } from './scripts/view/DisplayConfig.js';
import { changeNotesOrder } from './scripts/changeNotesOrder.js';
import { loadIconOrder } from './scripts/loadIconOrder.js';
import { useAlert } from './scripts/components/useAlert.js';
import { modalAction } from './scripts/components/useModal.js'
import { clickOpenCloseSidebar } from './scripts/components/useSidebar.js'
import { isAlertActive } from './scripts/config/isAlertActive.js'
import { configItems } from './scripts/config/configItems.js'
import { deleteAllData } from './scripts/config/deleteAllData.js'
import { handlerTheme } from './scripts/theme/handlerTheme.js';
import { loadIcon } from './scripts/theme/loadIcon.js';
import { updateToolbar } from './scripts/components/rich_text_editor/updateToolbar.js';
import { handlerRead } from './scripts/components/modal/handlerRead.js';
import { notesInfo } from './scripts/components/modal/notesInfo.js';
import { handlerNoteOptions } from './scripts/components/modal/handlerNoteOptions.js';
import { selectionAllVerification } from './scripts/selectionAllVerification.js';
import { clickEscNavSelection } from './scripts/clickEscNavSelection.js';
import { deleteAllSelectionTrash } from './scripts/components/trash_section_actions/deleteAllSelectionTrash.js'
import { restoreAllSelectionTrash } from './scripts/components/trash_section_actions/restoreAllSelectionTrash.js'
import { restoreNote } from './scripts/components/trash_section_actions/restoreNote.js'
import { deletePermanently } from './scripts/components/trash_section_actions/deletePermanently.js'
import { deleteNoteSelected } from './scripts/components/note_section_actions/deleteNoteSelected.js'

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
    "nav_select_all": () => clickSelectNotesNav(),
    "btn-select_nav": () => clickNavSelectNotesBtn(),
    "esc_nav_selection": () => clickEscNavSelection(),
    "nav_new_note_dynamic": () => {clickCreateNote(); updateToolbar()},
    "btn_order": () => clickOrderBtn(),
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
    "sidebar_div_trash": () => OpenTrash(),
    "sidebar_div_notes": () => OpenNotes(),
    "sidebar_div_config": () => OpenConfig(),
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

function OpenNotes () { // ! ABRIR SECCIÓN NOTAS
  DisplayNotes();
  clickOpenCloseSidebar("close")
  $navSelection.classList.remove("open");
  loadIconOrder()
}
function OpenTrash() { // ! ABRIR SECCIÓN PAPELERA
  DisplayTrash();
  clickOpenCloseSidebar("close")
  $navSelection.classList.remove("open");
  loadIconOrder()
}
function OpenConfig () { // ! ABRIR SECCIÓN CONFIGURACIÓN
  DisplayConfig();
  clickOpenCloseSidebar("close")
  $navSelection.classList.remove("open");
}

function clickOrderBtn () { // ! ORDENAR NOTAS
  changeNotesOrder();
  if ($main.className === "notes_section") {
    DisplayNotes();
  } else if ($main.className === "trash_section") {
    DisplayTrash();
  }
}

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

  if (note.title === titleValue && note.text === textValue) {

    DisplayNotes();
    modalAction("close");
  } else if ( titleValue || textValue) {

    note.title = titleValue;
    note.text = textValue;
    note.edit = Date.now();
    localStorage.setItem("notes", JSON.stringify(notesNow));
    DisplayNotes();
    modalAction("close");
  } else if (!titleValue && !textValue) {

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

function clickSelectNotesNav () { // ! ABRIR NAV DE SELECCIÓN
  selectionAllVerification()
  $navSelection.classList.add("open"); 

  if ($main.className === "trash_section") {
    $(".restore_selection_btn").style.display = "flex"
    $("#delete_trash_selection_btn").style.display = "flex"
    $("#delete_selection_btn").style.display = "none";

    const $$allBtnSelect = $$(".select_trash_button");
    $$allBtnSelect.forEach(button => button.style.display = "flex");
    const $$allBtnDelete = $$(".delete_trash_button");
    $$allBtnDelete.forEach(button => button.style.display = "none");
    const $$allBtnRestoreNote = $$(".restore_note_button");
    $$allBtnRestoreNote.forEach(button => button.style.display = "none");

  } else if ($main.className === "notes_section") {
    $(".restore_selection_btn").style.display = "none";
    $("#delete_trash_selection_btn").style.display = "none";
    $("#delete_selection_btn").style.display = "flex";

    const $$btnDelete = $$(".delete_button");
    $$btnDelete.forEach(button => button.style.display = "none");
  }
}

function clickNavSelectNotesBtn () { // ! SELECCIONAR TODO DESDE EL NAV DE SELECCIÓN
  let notesNow = JSON.parse(localStorage.getItem("notes"))
  let trashNow = JSON.parse(localStorage.getItem("trash"))

let n = $main.className === "notes_section" ? 1 : 0
let typeItem = $main.className === "notes_section" ? notesNow : trashNow

  if ($$(".item_select").length !== $$(".note_item").length - n) {
    for (let i = 0; i < typeItem.length; i++) {
      const $$noteItem = $$(`[data-note-id="${typeItem[i].id}"]`)[0];
      if (!$$noteItem.classList.contains("item_select")) {
        $$noteItem.classList.add("item_select");
      }
    }
  } else if ($$(".item_select").length === $$(".note_item").length - n) {
    for (let i = 0; i < typeItem.length; i++) {
      const $$noteItem = $$(`[data-note-id="${typeItem[i].id}"]`)[0];
      if ($$noteItem.classList.contains("item_select")) {
        $$noteItem.classList.remove("item_select");
      }
    }
  }
  selectionAllVerification()
}

function selectNote (idElemento) { // ! SELECCIONAR NOTAS O NOTAS DE PAPELERA
  const $$noteItem = $$(`[data-note-id="${idElemento}"]`)[0];
  $$noteItem.classList.toggle("item_select");
  
  if ($$(".item_select").length > 0) {
    selectionAllVerification()
    let $$btnDelete = $$(".delete_button");
    $$btnDelete.forEach(button => button.style.display = "none");
      $navSelection.classList.add("open");
    if ($main.className === "notes_section"){
      $(".restore_selection_btn").style.display = "none"
    }
  } else if ($$(".item_select").length === 0) {
    let $$btnDelete = $$(".delete_button");
    $$btnDelete.forEach(button => button.style.display = "flex");
    $navSelection.classList.remove("open");
  }  
}

let lastDeletedNote = null;

function clickDeleteNotes(nI) { // ! MOVER NOTA A PAPELERA
  let notesNow = JSON.parse(localStorage.getItem("notes"))
  let trashNow = JSON.parse(localStorage.getItem("trash"))

  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).toastUndo;
  const deletedNote = notesNow[nI];
  lastDeletedNote = deletedNote;
  
  notesNow = notesNow.filter(n => n.id !== deletedNote.id);
  localStorage.setItem('notes', JSON.stringify(notesNow));
  trashNow.push(deletedNote);
  localStorage.setItem('trash', JSON.stringify(trashNow));

  DisplayNotes();

  if (showAlertConfirm) {
    useAlert("move to trash", "note").then((resolve) => {
      if (resolve && lastDeletedNote) {
        let tI = trashNow.findIndex(n => n.id === lastDeletedNote.id);
        
        if (tI !== -1) {
          const noteToRestore = trashNow[tI];
          trashNow = trashNow.filter(t => t.id !== noteToRestore.id);
          localStorage.setItem('trash', JSON.stringify(trashNow));
          notesNow.push(noteToRestore);
          localStorage.setItem('notes', JSON.stringify(notesNow));
  
          DisplayNotes();
        }
        lastDeletedNote = null;
      }
    });
  }
}