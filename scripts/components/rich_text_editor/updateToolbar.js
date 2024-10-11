export function updateToolbar() {
  const $ = (selector) => document.querySelector(selector);
  const $content = $('#note_text');
  $content.setAttribute("contenteditable", "true")

  const $changeHeaderDisplayText = $('#change_header-display-text');
  const $changeFontSizeDisplayText = $('#change_font_size-display-text');
  const $textColorSvg = $("#change_text_color-svg")
  const $highlightColorSvg = $("#change_background_color-svg")
  
  $changeFontSizeDisplayText.textContent = "Font Size";
  $changeHeaderDisplayText.textContent = "Header";
  $textColorSvg.style.color='var(--icon-color)';
  $highlightColorSvg.style.color ='var(--icon-color)';

  if ($content.innerHTML.trim() === '' || $content.innerHTML === '<div><br></div>' || $content.innerHTML === '<br>') {
    $content.setAttribute("data-placeholder", "on")
  } else {
    $content.setAttribute("data-placeholder", "off")
  }
}