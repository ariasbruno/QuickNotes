export function updateToolbar() {
  const $ = (selector) => document.querySelector(selector);
  const $content = $('#note_text');
  $content.setAttribute("contenteditable", "true")
  const $fontSize = $("#font-size")
  const $header = $("#header")
  const $textColorSvg = $("#change_text_color-svg")
  const $highlightColorSvg = $("#change_background_color-svg")
  
  $header.selectedIndex=0;
  $fontSize.selectedIndex=0;
  $textColorSvg.style.color='var(--icon-color)';
  $highlightColorSvg.style.color ='var(--icon-color)';

  if ($content.innerHTML.trim() === '' || $content.innerHTML === '<div><br></div>' || $content.innerHTML === '<br>') {
    $content.setAttribute("data-placeholder", "on")
  } else {
    $content.setAttribute("data-placeholder", "off")
  }
}