import { loadIconOrder } from "../loadIconOrder.js";

export function DisplayTrash() {

  loadIconOrder()

  let trash = JSON.parse(localStorage.getItem("trash"));
  let config = JSON.parse(localStorage.getItem("config"))

  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  $("#nav-text").innerText="Papelera"

  $("#nav_dynamic_button").style.display = "none"
  $("#btn_order").style.display = "flex"
  $("#nav_select_all").style.display = "flex"

  const $btnNotesSidebar = $("#btn_notes");
  const $btnTrashSidebar = $("#btn_trash");
  const $btnConfigSidebar = $("#btn_config");
  $btnNotesSidebar.classList.remove("active");
  $btnTrashSidebar.classList.add("active");
  $btnConfigSidebar.classList.remove("active");
  
  const trashSection = document.createElement("section");
  trashSection.setAttribute("id", "trash_section");
  trashSection.setAttribute("class", "notes_section_grid");

  const $main = $("#main")
  $main.innerHTML = ``;
  $main.prepend(trashSection);
  $main.className = "trash_section";
  
  trash.sort((a, b) => a.edit - b.edit);

  if (config.notesOrder === "grid") {
    trashSection.className = "notes_section_grid";
  } else if (config.notesOrder === "column") {
    trashSection.className = "notes_section_column";
  }
  
  trash.forEach(note => {
    const svgRestoreNote = `<svg class="restore_note_button" data-note-id="${note.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"> <path class="restore_note_button" data-note-id="${note.id}" d="M1.611 12c.759 0 1.375.57 1.485 1.32.641 4.339 4.389 7.68 8.903 7.68 5.476 0 9.827-4.917 8.867-10.569-.453-2.665-2.148-5.023-4.523-6.313-3.506-1.903-7.48-1.253-10.18 1.045l1.13 1.13c.63.63.184 1.707-.707 1.707H2c-.552 0-1-.448-1-1V2.414c0-.891 1.077-1.337 1.707-.707l1.332 1.332C7.6-.115 12.921-1.068 17.637 1.408c3.32 1.743 5.664 5.027 6.223 8.735 1.122 7.437-4.633 13.857-11.86 13.857-6.021 0-11.021-4.457-11.872-10.246-.135-.92.553-1.754 1.483-1.754Z"/> </svg>`;
    const svgDeleteNote = `<svg class="delete_trash_button" data-note-id="${note.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"> <path class="delete_trash_button" data-note-id="${note.id}" d="M23 3h-5v-.5C18 1.1 16.9 0 15.5 0h-7C7.1 0 6 1.1 6 2.5V3H1v3h1.6l1.2 14.8C4 22.6 5.5 24 7.3 24h9.3c1.8 0 3.3-1.4 3.5-3.2L21.3 6H23V3zm-5.8 17.5c0 .3-.2.5-.5.5H7.3c-.3 0-.5-.2-.5-.5l-1.2-14h12.8l-1.2 14z"/> <path class="delete_trash_button" data-note-id="${note.id}" d="M7.8 15l2.2-2.2-2.2-2.2L10 8.8l2.2 2.2 2.2-2.2 2.1 2.1-2.2 2.2 2.2 2.2-2.1 2.1-2.2-2.2-2.2 2.2L7.8 15z"/> </svg>`;
    const svgSelectNote = `<svg class="select_trash_button" data-note-id="${note.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"> <path class="select_trash_button" data-note-id="${note.id}" d="M394.667,512H117.333C52.561,511.929,0.071,459.439,0,394.667V117.333C0.071,52.561,52.561,0.071,117.333,0h277.333C459.439,0.071,511.929,52.561,512,117.333v277.333C511.929,459.439,459.439,511.929,394.667,512z M117.333,64C87.878,64,64,87.878,64,117.333v277.333C64,424.122,87.878,448,117.333,448h277.333C424.122,448,448,424.122,448,394.667V117.333C448,87.878,424.122,64,394.667,64H117.333z"/> <path class="select_trash_button check" data-note-id="${note.id}" d="M206.229,379.456c-13.462,0.009-26.368-5.368-35.84-14.933l-63.723-63.616c-12.501-12.493-12.507-32.754-0.014-45.255c0.005-0.005,0.01-0.01,0.014-0.015l0,0c12.496-12.492,32.752-12.492,45.248,0l54.315,54.293l153.856-153.856c12.496-12.492,32.752-12.492,45.248,0l0,0c12.501,12.493,12.507,32.754,0.014,45.255c-0.005,0.005-0.01,0.01-0.014,0.014L242.048,364.629C232.566,374.154,219.669,379.493,206.229,379.456z"/> </svg>`;

    
    const noteItem = document.createElement("div");
    const noteContent = document.createElement('div')
    const deleteNote = document.createElement('button')
    const noteTitle = document.createElement('h4');
    const noteText = document.createElement('p');
    const restoreNote = document.createElement('button')
    const selectNote = document.createElement('button')
    
    noteContent.classList.add("note_content");
    deleteNote.classList.add("delete_trash_button");
    restoreNote.classList.add("restore_note_button");
    selectNote.classList.add("select_trash_button");

    
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
    restoreNote.setAttribute("data-note-id", `${note.id}`);
    selectNote.setAttribute("data-note-id", `${note.id}`);
    
    restoreNote.innerHTML = svgRestoreNote;
    deleteNote.innerHTML = svgDeleteNote;
    selectNote.innerHTML = svgSelectNote;
    noteTitle.innerHTML = `${note.title}`;
    noteText.innerHTML = `${note.text}`;
    
    noteContent.appendChild(noteTitle);
    noteContent.appendChild(noteText);
    
    noteItem.appendChild(noteContent);
    noteItem.appendChild(deleteNote);
    noteItem.appendChild(restoreNote);
    noteItem.appendChild(selectNote);
    
    trashSection.prepend(noteItem);
  });
  let $$btnSelect = $$(".select_trash_button");
  $$btnSelect.forEach(button => {
    button.style.display = "none";
  });
};