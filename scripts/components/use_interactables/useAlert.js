let toastTimeout = null;
let toastActive = false;

export function useAlert(action, message) {
  return new Promise((resolve) => {
    if (action === "move to trash") {
      const toastContainer = document.querySelector("#toast_alert");
      const btnToast = document.querySelector("#btn-toast_alert");
      const progressBar = document.querySelector("#progressBar-toast_alert");
      const textToast = document.querySelector("#text-toast_alert");
      
      let text = message === "notes" ? "Las notas se han movido a la papelera" : "La nota se ha movido a la papelera";
      textToast.innerText = text
  
      if (toastActive) {
        clearInterval(toastTimeout);
        toastContainer.classList.remove("open");
      }
  
      toastActive = true;
      let progress = 100;
      toastContainer.classList.add("open");
  
      function count() {
        progressBar.style.width = `${progress}%`;
        progress -= 0.5;
        if (progress === 0) {
          clearInterval(toastTimeout);
          toastContainer.classList.remove("open");
          toastActive = false;
          resolve(false);
        }
      }
  
      toastTimeout = setInterval(count, 15);
  
      btnToast.addEventListener("click", () => {
        clearInterval(toastTimeout);
        toastContainer.classList.remove("open");
        toastActive = false;
        resolve(true);
      });

    } else if (action === "delete permanently") {
      const popup = document.querySelector("#popup_alert");
      const popupContent = document.querySelector("#popup_alert-content");
      const btnCancel = document.querySelector("#btn-cancel");
      const btnAccept = document.querySelector("#btn-accept");
      const textPopup = document.querySelector("#text-popup_alert");
      const $inputCheckAlert = document.getElementById("do-not-show");

      $inputCheckAlert.checked = false;
      
      let text = message === "notes" ? `<p>¿Quiere borrar las notas seleccionadas de manera permanente?</p>` : `<p>¿Quiere borrar la nota de manera permanente?</p>`;
      textPopup.innerHTML = text
  
      popup.style.display = "flex";
      popupContent.className = "scale-up-center"
      popup.className = "add_background-transition"
      
      btnAccept.addEventListener("click", () => {
        popupContent.className = "scale-down-center"
        popup.className = "remove_background-transition"
        setTimeout(() => {
          popup.style.display = "none";          
        },200);
        resolve(true);
      });
      
      btnCancel.addEventListener("click", () => {
        popupContent.className = "scale-down-center"
        popup.className = "remove_background-transition"
        setTimeout(() => {
          popup.style.display = "none";          
        },200);
        resolve(false);
      });
    } else if (action === "empty note"){
      const popup = document.querySelector("#popup_alert");
      const popupContent = document.querySelector("#popup_alert-content");
      const btnCancel = document.querySelector("#btn-cancel");
      const btnAccept = document.querySelector("#btn-accept");
      const textPopup = document.querySelector("#text-popup_alert");
      const $inputCheckAlert = document.getElementById("do-not-show");

      $inputCheckAlert.checked = false;
      
      let text = `<p>¿Estas seguro de que quiere guardar una nota vacía?</p> <span>Si guardas una nota vacía esta sera eliminada</span>`;      
      textPopup.innerHTML = text;
  
      popup.style.display = "flex";
      popupContent.className = "scale-up-center";
      popup.className = "add_background-transition";
      
      btnAccept.addEventListener("click", () => {
        popupContent.className = "scale-down-center";
        popup.className = "remove_background-transition";
        setTimeout(() => {
          popup.style.display = "none";          
        },200);
        resolve(true);
      });
      
      btnCancel.addEventListener("click", () => {
        popupContent.className = "scale-down-center"
        popup.className = "remove_background-transition"
        setTimeout(() => {
          popup.style.display = "none";          
        },200);
        resolve(false);
      });
    } else if (action === "delete data"){
      const popup = document.querySelector("#popup_alert");
      const popupContent = document.querySelector("#popup_alert-content");
      const btnCancel = document.querySelector("#btn-cancel");
      const btnAccept = document.querySelector("#btn-accept");
      const textPopup = document.querySelector("#text-popup_alert");
      const $labelCheckAlert = document.getElementById("label_do-not-show");

      $labelCheckAlert.style.display = "none";
      
      let text = `<p>¿Estas seguro de que quiere eliminar todos los datos?</p> <span>Borrar todos los datos de la web eliminará permanentemente todas tus notas y configuraciones. Esta acción no se puede deshacer.</span>`;      
      textPopup.innerHTML = text;
  
      popup.style.display = "flex";
      popupContent.className = "scale-up-center";
      popup.className = "add_background-transition";
      
      btnAccept.addEventListener("click", () => {
        popupContent.className = "scale-down-center";
        popup.className = "remove_background-transition";
        setTimeout(() => {
          popup.style.display = "none";          
        },200);
        resolve(true);
      });
      
      btnCancel.addEventListener("click", () => {
        popupContent.className = "scale-down-center"
        popup.className = "remove_background-transition"
        setTimeout(() => {
          popup.style.display = "none";          
        },200);
        resolve(false);
      });
    }
  });  
}
