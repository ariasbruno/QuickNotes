export function showAlert (action) {
  let config = JSON.parse(localStorage.getItem("config"));
  const $inputCheckAlert = document.getElementById("do-not-show");

  
  
  if (action === "empty note"){
    if (!$inputCheckAlert.checked) {
      config.alertEmptyNote = true;
      localStorage.setItem('config', JSON.stringify(config));
    } else if ($inputCheckAlert.checked) {
      config.alertEmptyNote = false;
      localStorage.setItem('config', JSON.stringify(config));
    }
  } else if (action === "delete"){
    if (!$inputCheckAlert.checked) {
      config.alertConfirmDelete = true;
      localStorage.setItem('config', JSON.stringify(config));
    } else if ($inputCheckAlert.checked) {
      config.alertConfirmDelete = false;
      localStorage.setItem('config', JSON.stringify(config));
    }
  } else if (action === "delete selection"){
    if (!$inputCheckAlert.checked) {
      config.alertConfirmDeleteSelection = true;
      localStorage.setItem('config', JSON.stringify(config));
    } else if ($inputCheckAlert.checked) {
      config.alertConfirmDeleteSelection = false;
      localStorage.setItem('config', JSON.stringify(config));
    }
  }
}