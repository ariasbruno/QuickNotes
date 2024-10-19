import { showLoader, hideLoader } from './showLoader.js';

export function fetchNotes() {
  return new Promise((resolve) => {
    showLoader();
    
    const getNotes = JSON.parse(localStorage.getItem("notes")) || [];
    
    if (Array.isArray(getNotes)) {
      console.log("Notas cargadas:", getNotes);
    } else {
      console.error("No hay notas en localStorage o los datos no son un array.");
    }

    hideLoader();
    resolve(getNotes);
  });
}


export function fetchTrash() {
  return new Promise((resolve) => {
    
    let getTrash = [];
    showLoader();
  
    getTrash = JSON.parse(localStorage.getItem("notes"));
  
    if (getTrash) {
      console.log("Notas cargadas:", getTrash);
    } else {
      console.error("No hay notas en localStorage");
    }
  
    hideLoader();
    resolve(getTrash)
    })
}

export function fetchConfig() {
  return new Promise((resolve) => {
    
    let getConfig = {notesOrder: "column", alertConfirmDelete: true,alertConfirmDeleteSelection: true, alertEmptyNote: true, toastUndo: true};
    showLoader();
  
    getConfig = JSON.parse(localStorage.getItem("notes"));
  
    if (getConfig) {
      console.log("Notas cargadas:", getConfig);
    } else {
      console.error("No hay notas en localStorage");
    }
  
    hideLoader();
    resolve(getConfig)
    })
}