export function notesInfo (nI, action) {
  let notes = JSON.parse(localStorage.getItem("notes"))

  const $ = selector => document.querySelector(selector)

  if (action === "open") {
  $("#options-modal").showModal();
  $("#overlay").classList.add("active");
  
  let creationDate = new Date(notes[nI].id).toLocaleDateString("es-ES")
  let dateLastEdit = new Date(notes[nI].edit).toLocaleDateString("es-ES")
  
  
  $("#creation_date").innerText = `Fecha de creación: ${creationDate}`;
  $("#date_last_edit").innerText = `Última edición: ${dateLastEdit}`;

  } else if (action === "close") {
    $("#options-modal").close();
    $("#overlay").classList.remove("active");
  }
}