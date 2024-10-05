export function updateToolbar() {
  const $ = (selector) => document.querySelector(selector);
  const $content = $('#note_text');
  $content.setAttribute("contenteditable", "true")
  const $fontSize = $("#font-size")
  const $header = $("#header")
  const $textColor = $("#text_color")
  const $highlightColor = $("#highlight_color")
  console.log($fontSize.selectedIndex);
  

$header.selectedIndex=0;
$fontSize.selectedIndex=0;
$textColor.value='#000000';
$highlightColor.value='#000000';



  if ($content.innerHTML.trim() === '' || $content.innerHTML === '<div><br></div>' || $content.innerHTML === '<br>') {
    $content.setAttribute("data-placeholder", "on")
  } else {
    $content.setAttribute("data-placeholder", "off")
  }
}