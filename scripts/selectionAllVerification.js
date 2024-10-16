export function selectionAllVerification () { // ! CAMBIAR EL ICONO DE SELECCIONAR DEL NAV SI TODO ESTA SELECCIONADO
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  const $main = $("#main");
  const $btnSelectNav = $("#btn-select_nav");
  const $$allItems = $$(".note_item");
  const $$allSelectedItems = $$(".item_select");

  let toggleDeleteTrashNav = $main.className === "trash_section" ? "flex" : "none";
  let toggleDeleteNoteNav = $main.className === "trash_section" ? "none" : "flex";
  let itemLength = $main.className === "trash_section" ? 0 : 1;

  $("#delete_selection_btn").style.display = toggleDeleteNoteNav
  $("#delete_trash_selection_btn").style.display = toggleDeleteTrashNav

  if ($$allSelectedItems.length === $$allItems.length - itemLength && $$allItems.length > itemLength){
    $btnSelectNav.classList.add("all-select")
  } else if($$allSelectedItems.length !== $$allItems.length - itemLength){
    $btnSelectNav.classList.remove("all-select")
  }
}