export function notesInfo (nI, action) {
  let notes = JSON.parse(localStorage.getItem("notes"))

  const $ = selector => document.querySelector(selector)

  if (action === "open") {
  $('.note_options-div').classList.remove("open")
  $("#options-modal").showModal();
  $("#overlay").classList.add("active");
  
  let creationDateObj = new Date(notes[nI].id);
  let editDateObj = new Date(notes[nI].edit);

  function getDatePart (type, value) {
    const typeDate = type === "edit" ? editDateObj : creationDateObj;
    if (value === "year") {
      return String(typeDate.getFullYear()).slice(-2)
    } else {
      const valueGet = {
        "dd": () => typeDate.getDate(), 
        "mm": () => typeDate.getMonth() + 1, 
        "hh": () => typeDate.getHours(), 
        "mi": () => typeDate.getMinutes()
      };
      return String(valueGet[value]()).padStart(2, '0')
    }
  }
  
  let creationDate = `${getDatePart("creation", "dd")}/${getDatePart("creation", "mm")}/${getDatePart("creation", "year")}`;
  let dateLastEdit = `${getDatePart("edit", "dd")}/${getDatePart("edit", "mm")}/${getDatePart("edit", "year")}`;

  let creationDateTime = `${getDatePart("creation", "hh")}:${getDatePart("creation", "mi")}`;
  let dateLastEditTime = `${getDatePart("edit", "hh")}:${getDatePart("edit", "mi")}`;
  
  $("#creation_date").innerText = `Fecha de creación: ${creationDate} ${creationDateTime}hs`;
  $("#date_last_edit").innerText = `Última edición: ${dateLastEdit} ${dateLastEditTime}hs`;

  } else if (action === "close") {
    $('.note_options-div').classList.remove("open")
    $("#overlay").classList.remove("active");
    $("#options-modal").close();
  }
}