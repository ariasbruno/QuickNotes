export function notesOrder () {
  let config = JSON.parse(localStorage.getItem("config"))

  const $navOrderImg = document.getElementById('nav_dynamic_img');
  if (config.notesOrder === "grid") {
    config.notesOrder = "column"
    localStorage.setItem('config', JSON.stringify(config));
  } else if (config.notesOrder === "column") {
    config.notesOrder = "grid";
    localStorage.setItem('config', JSON.stringify(config));
  }
};