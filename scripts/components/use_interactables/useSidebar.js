export function clickOpenCloseSidebar (action) { // ! ABRIR Y CERRA EL SIDEBAR
  const $navSidebar = document.querySelector("#open_sidebar")
  const $sidebar = document.querySelector("#sidebar")

  if (action === "toggle"){
    $navSidebar.classList.toggle('open');
    $sidebar.classList.toggle('open');
  } else if (action === "close") {
    $navSidebar.classList.remove('open');
    $sidebar.classList.remove('open');
  }
}