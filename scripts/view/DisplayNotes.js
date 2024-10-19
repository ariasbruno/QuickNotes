import { loadIconOrder } from "../components/loadIconOrder.js";
import { clickOpenCloseSidebar } from "../components/use_interactables/useSidebar.js";

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

export function DisplayNotes() {
  clickOpenCloseSidebar("close")
  $("#nav_bar-selection").classList.remove("open");
  loadIconOrder()

  let config = JSON.parse(localStorage.getItem("config"));
  let notes = JSON.parse(localStorage.getItem("notes"));

  $("#nav-text").innerText="Notas"

  const btnNotesSidebar = $("#btn_notes");
  const btnTrashSidebar = $("#btn_trash");
  const btnConfigSidebar = $("#btn_config");
  btnNotesSidebar.classList.add("active");
  btnTrashSidebar.classList.remove("active");
  btnConfigSidebar.classList.remove("active");

  $("#nav_dynamic_button").style.display = "flex"
  $("#btn_order").style.display = "flex"
  $("#nav_select_all").style.display = "flex"


const $navSelection = $(`#nav_bar-selection`);
  if ($$(".item_select").length > 0) {
    $navSelection.classList.add("open");
  } else {
    $navSelection.classList.remove("open");
  }

  const classChecker = config.notesOrder === "grid" ? "note_item new_note note_item_grid" : "note_item new_note note_item_column"
  notes.sort((a, b) => a.edit - b.edit);
  const $navOrderImg = $('#nav_order_img');

  if (config.notesOrder === "grid") {
  $navOrderImg.innerHTML = `
  <path class="btn_order" d="M2,11H22a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V9A2,2,0,0,0,2,11ZM2,2H22V9H2Z"/>
  <path class="btn_order" d="M22,13H2a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V15A2,2,0,0,0,22,13Zm0,9H2V15H22Z"/>
`
  } else if (config.notesOrder === "column") {
    $navOrderImg.innerHTML = `
  <path class="btn_order" d="M2,11H13a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V9A2,2,0,0,0,2,11ZM2,2H13V9H2Z"/>
  <path class="btn_order" d="M22,0H19a2,2,0,0,0-2,2V9a2,2,0,0,0,2,2h3a2,2,0,0,0,2-2V2A2,2,0,0,0,22,0Zm0,9H19V2h3Z"/>
  <path class="btn_order" d="M5,13H2a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H5a2,2,0,0,0,2-2V15A2,2,0,0,0,5,13Zm0,9H2V15H5Z"/>
  <path class="btn_order" d="M22,13H11a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V15A2,2,0,0,0,22,13Zm0,9H11V15H22Z"/>
`
  }
  
  const $main = $("#main");
  $main.innerHTML = ``;
  $main.className = "notes_section";

  const notesSection = document.createElement("section");
  notesSection.setAttribute("id", "notes_section");
  notesSection.setAttribute("class", "notes_section_grid");
  $main.prepend(notesSection);


  notesSection.innerHTML = `<div class="${classChecker}">  
    <svg class="new_note" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" width="512" height="512">
    <path class="new_note" d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
    </svg>
  </div>`;
  
  notes.forEach(note => {
    const svgSelectNote = `<svg class="select_button" data-note-id="${note.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"> <path class="select_button" data-note-id="${note.id}" d="M394.667,512H117.333C52.561,511.929,0.071,459.439,0,394.667V117.333C0.071,52.561,52.561,0.071,117.333,0h277.333C459.439,0.071,511.929,52.561,512,117.333v277.333C511.929,459.439,459.439,511.929,394.667,512z M117.333,64C87.878,64,64,87.878,64,117.333v277.333C64,424.122,87.878,448,117.333,448h277.333C424.122,448,448,424.122,448,394.667V117.333C448,87.878,424.122,64,394.667,64H117.333z"/> <path class="select_button check" data-note-id="${note.id}" d="M206.229,379.456c-13.462,0.009-26.368-5.368-35.84-14.933l-63.723-63.616c-12.501-12.493-12.507-32.754-0.014-45.255c0.005-0.005,0.01-0.01,0.014-0.015l0,0c12.496-12.492,32.752-12.492,45.248,0l54.315,54.293l153.856-153.856c12.496-12.492,32.752-12.492,45.248,0l0,0c12.501,12.493,12.507,32.754,0.014,45.255c-0.005,0.005-0.01,0.01-0.014,0.014L242.048,364.629C232.566,374.154,219.669,379.493,206.229,379.456z"/> </svg>`;
    const svgDeleteNote = `<svg class="delete_button" data-note-id="${note.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline class="delete_button" data-note-id="${note.id}" points="3 6 5 6 21 6"></polyline>  <path class="delete_button" data-note-id="${note.id}" d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3-3h8a2 2 0 0 1 2 2H6a2 2 0 0 1 2-2z"></path>  <line class="delete_button" data-note-id="${note.id}" x1="10" y1="11" x2="10" y2="17"></line>  <line class="delete_button" data-note-id="${note.id}" x1="14" y1="11" x2="14" y2="17"> </line> </svg>`;

    
    const noteItem = document.createElement("div");
    const noteContent = document.createElement('div')
    const deleteNote = document.createElement('button')
    const noteTitle = document.createElement('h4');
    const noteText = document.createElement('p');
    const selectNote = document.createElement('button')
    
    noteContent.classList.add("note_content", "note", "note-click");
    deleteNote.classList.add("delete_button");
    selectNote.classList.add("select_button");
    noteTitle.classList.add("note", "note-click");
    noteText.classList.add("note", "note-click");

    
    if (config.notesOrder === "grid") {
      noteItem.classList.add("note_item", "note", "note_item_grid");
    } else if (config.notesOrder === "column") {
      noteItem.classList.add("note_item", "note", "note_item_column");
    }

    noteItem.setAttribute("data-note-id", `${note.id}`);
    deleteNote.setAttribute("data-note-id", `${note.id}`);
    noteTitle.setAttribute("data-note-id", `${note.id}`);
    noteText.setAttribute("data-note-id", `${note.id}`);
    noteContent.setAttribute("data-note-id", `${note.id}`);
    selectNote.setAttribute("data-note-id", `${note.id}`);
    
    selectNote.innerHTML = svgSelectNote;
    deleteNote.innerHTML = svgDeleteNote;
    noteTitle.innerHTML = `${note.title}`
    noteText.innerHTML = `${note.text}`
    
    noteContent.appendChild(noteTitle);
    noteContent.appendChild(noteText);
    
    noteItem.appendChild(noteContent);
    noteItem.appendChild(deleteNote);
    noteItem.appendChild(selectNote);
    
    notesSection.prepend(noteItem);
  });
};