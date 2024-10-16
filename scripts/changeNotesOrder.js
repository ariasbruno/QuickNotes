export function changeNotesOrder () {
  let config = JSON.parse(localStorage.getItem("config"))

  if (config.notesOrder === "grid") {
    config.notesOrder = "column"
    localStorage.setItem('config', JSON.stringify(config));
  } else if (config.notesOrder === "column") {
    config.notesOrder = "grid";
    localStorage.setItem('config', JSON.stringify(config));
  }
};