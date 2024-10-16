import { DisplayNotes } from './scripts/view/DisplayNotes.js';
import { DisplayTrash } from './scripts/view/DisplayTrash.js';
import { DisplayConfig } from './scripts/view/DisplayConfig.js';
import { notesOrder } from './scripts/notesOrder.js';
import { useAlert } from './scripts/components/useAlert.js';
import { modalAction } from './scripts/components/useModal.js'
import { clickOpenCloseSidebar } from './scripts/components/useSidebar.js'
import { isAlertActive } from './scripts/config/isAlertActive.js'
import { configItems } from './scripts/config/configItems.js'
import { handlerTheme } from './scripts/theme/handlerTheme.js';
import { loadIcon } from './scripts/theme/loadIcon.js';
import { updateToolbar } from './scripts/components/rich_text_editor/updateToolbar.js';
import { handlerRead } from './scripts/components/modal/handlerRead.js';
import { notesInfo } from './scripts/components/modal/notesInfo.js';
import { handlerNoteOptions } from './scripts/components/modal/handlerNoteOptions.js';
import { selectionAllVerification } from './scripts/selectionAllVerification.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $navSelection = $(".close_nav_selection");
const $main = $("#main");
const $closeSaveNote = $("#close");
const $$closeSaveNote = $$(".close");
const $inputTitle = $("#title");
const $inputContent = $("#note_text");


let notes = JSON.parse(localStorage.getItem("notes")) || [];
let config = JSON.parse(localStorage.getItem("config")) || {notesOrder: "column", alertConfirmDelete: true,alertConfirmDeleteSelection: true, alertEmptyNote: true, toastUndo: true};
let trash = JSON.parse(localStorage.getItem("trash")) || [];

localStorage.setItem("notes", JSON.stringify(notes))
localStorage.setItem("config", JSON.stringify(config))
localStorage.setItem("trash", JSON.stringify(trash))


window.addEventListener("load", () => { DisplayNotes(); loadIcon() });

window.addEventListener("click", (e) => {
  
  let idElemento = e.target.getAttribute("data-note-id");
  let noteIndex = notes.findIndex(note => note.id === Number(idElemento));
  let trashIndex = trash.findIndex(note => note.id === Number(idElemento));

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
    "select_button": () => selectNote(idElemento),
    "select_trash_button": () => selectNote(idElemento),
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



function deleteAllData () {
  useAlert("delete data").then((resolve) => {
    if (resolve) {
      localStorage.clear()
    }
  });
}

function OpenNotes () { // ! ABRIR NOTAS
  DisplayNotes();
  clickOpenCloseSidebar("close")
  $navSelection.classList.remove("open_nav_selection");
}
function OpenTrash() { // ! ABRIR PAPELERA
  DisplayTrash();
  clickOpenCloseSidebar("close")
  $navSelection.classList.remove("open_nav_selection");
}
function OpenConfig () { // ! ABRIR CONFIGURACIÓN
  DisplayConfig();
  clickOpenCloseSidebar("close")
  $navSelection.classList.remove("open_nav_selection");
}

function clickOrderBtn () { // ! ORDENAR NOTAS
  notesOrder();
  if ($main.className === "notes_section") {
    DisplayNotes();
  } else if ($main.className === "trash_section") {
    DisplayTrash();
  }
}

function clickCreateNote() { // ! CREAR NOTA
  $$closeSaveNote.forEach(e => {
    e.setAttribute("data-note-id", `new-note`)
  })
  $inputTitle.value = "";
  $inputContent.innerHTML = "";
  modalAction("open");
  $inputTitle.focus()
  backButtonListener();
}


let note
function clickEditNote (nI) { // ! EDITAR NOTA
  if(!$(".nav_bar-selection").classList.contains("open_nav_selection")){
    $$(".close").forEach(e =>{
      e.setAttribute("data-note-id", `${nI}`)
    })
    $("#note_options-info").setAttribute("data-note-id", `${notes[nI].id}`)
    note = notes[nI];
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
  let titleValue = $inputTitle.value.trim();
  let textValue = $inputContent.innerHTML.trim();
  if (titleValue || textValue) {
    const newNote = {
      id: Date.now(),
      title: titleValue,
      text: textValue,
      edit: Date.now()
    };
    
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    
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
  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).alertEmptyNote
  const note = notes[index]
  let titleValue = $inputTitle.value.trim();
  let textValue = $inputContent.innerHTML.trim();

  if (note.title === titleValue && note.text === textValue) {

    DisplayNotes();
    modalAction("close");
  } else if ( titleValue || textValue) {

    note.title = titleValue;
    note.text = textValue;
    note.edit = Date.now();
    localStorage.setItem("notes", JSON.stringify(notes));
    DisplayNotes();
    modalAction("close");
  } else if (!titleValue && !textValue) {

    if (showAlertConfirm) {
      useAlert("empty note").then(resolve=> {
        if(resolve){
          isAlertActive("empty note")
          notes = notes.filter(n => n.id !== notes[index].id);
          localStorage.setItem("notes", JSON.stringify(notes));
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
      notes = notes.filter(n => n.id !== notes[index].id);
      localStorage.setItem("notes", JSON.stringify(notes));
      modalAction("close");
      DisplayNotes();
    }
  }
};

function clickSelectNotesNav () { // ! ABRIR NAV DE SELECCIÓN
  selectionAllVerification()
  $navSelection.classList.add("open_nav_selection"); 
  if ($main.className === "trash_section") {
    $(".restore_selection_btn").style.display = "flex"
    $("#delete_trash_selection_btn").style.display = "flex"
    $("#delete_selection_btn").style.display = "none";
    let $$btnSelect = $$(".select_trash_button");
    $$btnSelect.forEach(button => {
      button.style.display = "flex";
    });
    let $$btnDelete = $$(".delete_trash_button");
    $$btnDelete.forEach(button => {
      button.style.display = "none";
    });
    let $$btnRestoreNote = $$(".restore_note_button");
    $$btnRestoreNote.forEach(button => {
      button.style.display = "none";
    });
  } else if ($main.className === "notes_section") {
    $(".restore_selection_btn").style.display = "none";
    $("#delete_trash_selection_btn").style.display = "none";
    $("#delete_selection_btn").style.display = "flex";
    let $$btnDelete = $$(".delete_button");
    $$btnDelete.forEach(button => {
      button.style.display = "none";
    });
  }
}

function clickNavSelectNotesBtn () { // ! SELECCIONAR TODO DESDE EL NAV DE SELECCIÓN

let n = $main.className === "notes_section" ? 1 : 0
let typeItem = $main.className === "notes_section" ? notes : trash

  if ($$(".item_select").length !== $$(".note_item").length - n) {
    for (let i = 0; i < typeItem.length; i++) {
      const $$noteItem = $$(`[data-note-id="${typeItem[i].id}"]`)[0];
      if (!$$noteItem.classList.contains("item_select")) {
        $$noteItem.classList.toggle("item_select");
      }
    }
  } else if ($$(".item_select").length === $$(".note_item").length - n) {
    for (let i = 0; i < typeItem.length; i++) {
      const $$noteItem = $$(`[data-note-id="${typeItem[i].id}"]`)[0];
      if ($$noteItem.classList.contains("item_select")) {
        $$noteItem.classList.toggle("item_select");
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
    $$btnDelete.forEach(button => {
      button.style.display = "none";
    });
      $navSelection.classList.add("open_nav_selection");
    if ($main.className === "notes_section"){
      $(".restore_selection_btn").style.display = "none"
    }
  } else if ($$(".item_select").length === 0) {
    let $$btnDelete = $$(".delete_button");
    $$btnDelete.forEach(button => {
      button.style.display = "flex";
    });
    $navSelection.classList.remove("open_nav_selection");
  }  
}

function clickEscNavSelection () { // ! ESC DE SELECCIÓN
  $("#btn-select_nav").className = "btn-select_nav"
  if ($main.className === "trash_section") {
    $navSelection.classList.remove("open_nav_selection");
    if ($$(".item_select").length > 0){
      for (let i = 0; i < trash.length; i++) {
        const $$noteItem = $$(`[data-note-id="${trash[i].id}"]`)[0];
        if ($$noteItem.classList.contains("item_select")) {
          $$noteItem.classList.toggle("item_select");
        }
      }
    }
    
    let $$btnDelete = $$(".delete_trash_button");
    $$btnDelete.forEach(button => {
      button.style.display = "flex";
    });
    let $$btnRestoreNote = $$(".restore_note_button");
    $$btnRestoreNote.forEach(button => {
      button.style.display = "flex";
    });
    let $$btnSelect = $$(".select_trash_button");
    $$btnSelect.forEach(button => {
      button.style.display = "none";
    });
  }
  if ($main.className === "notes_section") {
    $navSelection.classList.remove("open_nav_selection");
    if ($$(".item_select").length > 0){
      for (let i = 0; i < notes.length; i++) {
        const $$noteItem = $$(`[data-note-id="${notes[i].id}"]`)[0];
        if ($$noteItem.classList.contains("item_select")) {
          $$noteItem.classList.toggle("item_select");
        }
      }
    }
    let $$btnDelete = $$(".delete_button");
    $$btnDelete.forEach(button => {
    button.style.display = "flex";
    });
  }
}

let lastDeletedNote = null;

function clickDeleteNotes(nI) {
  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).toastUndo;
  const deletedNote = notes[nI];
  lastDeletedNote = deletedNote;
  
  notes = notes.filter(n => n.id !== deletedNote.id);
  localStorage.setItem('notes', JSON.stringify(notes));
  trash.push(deletedNote);
  localStorage.setItem('trash', JSON.stringify(trash));

  DisplayNotes();

  if (showAlertConfirm) {
    useAlert("move to trash", "note").then((resolve) => {
      if (resolve && lastDeletedNote) {
        let tI = trash.findIndex(note => note.id === lastDeletedNote.id);
        
        if (tI !== -1) {
          const noteToRestore = trash[tI];
          trash = trash.filter(t => t.id !== noteToRestore.id);
          localStorage.setItem('trash', JSON.stringify(trash));
          notes.push(noteToRestore);
          localStorage.setItem('notes', JSON.stringify(notes));
  
          DisplayNotes();
        }
        lastDeletedNote = null;
      }
    });
  }
}


function deleteNoteSelected () { // ! MOVER A PAPELERA LAS NOTAS SELECCIONADAS
  let selectedItems = $$(".item_select").length
  let trashSelected = []
  let messageAlert = selectedItems > 1 ? "notes" : "note";
  if (selectedItems <= 0) {$navSelection.classList.remove("open_nav_selection"); return};

  for (let i = selectedItems -1; i >= 0; i--) {
    let noteIndexSelected = notes.findIndex(note => note.id === Number(document.getElementsByClassName("item_select")[i].dataset.noteId));
    trashSelected.push(notes[noteIndexSelected].id)
    const newTrash = notes[noteIndexSelected];
    notes = notes.filter(n => n.id !== notes[noteIndexSelected].id);
    localStorage.setItem('notes', JSON.stringify(notes));
    trash.push(newTrash);
    localStorage.setItem('trash', JSON.stringify(trash));
  };
  DisplayNotes();
  
  useAlert("move to trash", messageAlert).then((resolver => {
    if (resolver) {
      let numberOfDeletedNotes = trashSelected.length
      for (let i = 0; i < numberOfDeletedNotes; i++) {
        let noteIndexSelected = trash.findIndex(trash => trash.id === trashSelected[i]);
        const newNote = trash[noteIndexSelected];
        trash = trash.filter(t => t.id !== trash[noteIndexSelected].id);
        localStorage.setItem('trash', JSON.stringify(trash));
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
      }
      DisplayNotes();
    }
  }));
    $navSelection.classList.remove("open_nav_selection");
};

function deletePermanently(index){  // ! BORRAR NOTA PERMANENTEMENTE DE LA PAPELERA
  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).alertConfirmDelete;
  if (showAlertConfirm) {
    useAlert("delete permanently", "note").then((resolve => {
      if (resolve) {
        trash = trash.filter(t => t.id !== trash[index].id);
        localStorage.setItem('trash', JSON.stringify(trash));
        DisplayTrash()
      }
      isAlertActive("delete")
    }));
  } else if (!showAlertConfirm) {
    trash = trash.filter(t => t.id !== trash[index].id);
    localStorage.setItem('trash', JSON.stringify(trash));
    DisplayTrash();
  }
}

function restoreNote (index) { // ! RESTAURAR NOTA
  const newNote = trash[index];
  trash = trash.filter(t => t.id !== trash[index].id);
  localStorage.setItem('trash', JSON.stringify(trash));
  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));
  DisplayTrash();
}

function restoreAllSelectionTrash () { // ! RESTAURAR NOTAS SELECCIONADAS
  let selectedItems = $$(".item_select").length

  for (let i = selectedItems -1; i >= 0; i--) {
    let noteIndexSelected = trash.findIndex(trash => trash.id === Number($$(".item_select")[i].dataset.noteId));
    const newNote = trash[noteIndexSelected];
    trash = trash.filter(t => t.id !== trash[noteIndexSelected].id);
    localStorage.setItem('trash', JSON.stringify(trash));
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
  };
    DisplayTrash()
  if ($$(".item_select").length === 0 && $navSelection.classList.contains("open_nav_selection")) {
    $navSelection.classList.remove("open_nav_selection");
  }
}

function deleteAllSelectionTrash () { // ! BORRAR NOTAS DE PAPELERA SELECCIONADAS
  let showAlertConfirm = JSON.parse(localStorage.getItem("config")).alertConfirmDeleteSelection;
  let selectedItems = $$(".item_select").length;
  let messageAlert = selectedItems > 1 ? "notes" : "note";

  if (showAlertConfirm) {
    useAlert("delete permanently", messageAlert).then((resolve => {
      if (resolve) {
        for (let i = selectedItems -1; i >= 0; i--) {
          let noteIndexSelected = trash.findIndex(trash => trash.id === Number($$(".item_select")[i].dataset.noteId));
          trash = trash.filter(t => t.id !== trash[noteIndexSelected].id);
          localStorage.setItem('trash', JSON.stringify(trash));
        };
          DisplayTrash()
        if ($$(".item_select").length === 0 && $navSelection.classList.contains("open_nav_selection")) {
          $navSelection.classList.remove("open_nav_selection");
        }
      }
      isAlertActive("delete selection")
    }));
  } else if (!showAlertConfirm) {
    for (let i = selectedItems -1; i >= 0; i--) {
      let noteIndexSelected = trash.findIndex(trash => trash.id === Number(document.getElementsByClassName("item_select")[i].dataset.noteId));
      trash = trash.filter(t => t.id !== trash[noteIndexSelected].id);
      localStorage.setItem('trash', JSON.stringify(trash));
    };
      DisplayTrash()
    if ($$(".item_select").length === 0 && $navSelection.classList.contains("open_nav_selection")) {
      $navSelection.classList.remove("open_nav_selection");
    }
  }
}