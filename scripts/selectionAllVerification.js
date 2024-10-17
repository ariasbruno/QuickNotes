export function selectionAllVerification () { // ! CAMBIAR EL ICONO DE SELECCIONAR DEL NAV SI TODO ESTA SELECCIONADO
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  const $main = $("#main");
  const $btnSelectNav = $("#btn-select_nav");
  const $$allItems = $$(".note_item");
  const $$allSelectedItems = $$(".item_select");

  let itemLength = $main.classList.contains("trash_section") ? 0 : 1;

  $("#delete_selection_btn").style.display = $main.classList.contains("notes_section") ? "flex" : "none";
  $("#delete_trash_selection_btn").style.display = $main.classList.contains("trash_section") ? "flex" : "none";

  if ($$allSelectedItems.length === $$allItems.length - itemLength && $$allItems.length > itemLength){
    $btnSelectNav.classList.add("all-select")
  } else if($$allSelectedItems.length !== $$allItems.length - itemLength){
    $btnSelectNav.classList.remove("all-select")
  }
}