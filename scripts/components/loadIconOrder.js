export function loadIconOrder () {
  let config = JSON.parse(localStorage.getItem("config"))

  const $navOrderImg = document.querySelector('#nav_order_img');
  const $navOrderBtn = document.querySelector('#btn_order');
  
  if (config.notesOrder === "grid") {
    $navOrderBtn.setAttribute('aria-label', 'Cambiar a vista de fila');
    $navOrderImg.innerHTML = `
    <path class="btn_order" d="M2,11H22a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V9A2,2,0,0,0,2,11ZM2,2H22V9H2Z"/>
    <path class="btn_order" d="M22,13H2a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V15A2,2,0,0,0,22,13Zm0,9H2V15H22Z"/>
    `
  } else if (config.notesOrder === "column") {
    $navOrderBtn.setAttribute('aria-label', 'Cambiar a vista de cuadrícula');
    $navOrderImg.innerHTML = `
    <path class="btn_order" d="M2,11H13a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V9A2,2,0,0,0,2,11ZM2,2H13V9H2Z"/>
    <path class="btn_order" d="M22,0H19a2,2,0,0,0-2,2V9a2,2,0,0,0,2,2h3a2,2,0,0,0,2-2V2A2,2,0,0,0,22,0Zm0,9H19V2h3Z"/>
    <path class="btn_order" d="M5,13H2a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H5a2,2,0,0,0,2-2V15A2,2,0,0,0,5,13Zm0,9H2V15H5Z"/>
    <path class="btn_order" d="M22,13H11a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V15A2,2,0,0,0,22,13Zm0,9H11V15H22Z"/>
  `
  }
}