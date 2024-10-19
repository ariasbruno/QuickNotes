export function showLoader() {
  const $ = (selector) => document.querySelector(selector);

  const $main = $("#main");
  $main.classList.add("loading");
  $main.innerHTML = `<div id="loader" class="loader"></div>`;
  console.log($(".loader"));
  
}

export function hideLoader() {
  const $ = (selector) => document.querySelector(selector);

  const $main = $("#main");
  $main.classList.remove("loading");
  $main.innerHTML = '';  // Limpiar el contenido para eliminar el loader
}
