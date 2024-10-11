import { updateToolbar } from './updateToolbar.js';
import { formatDoc } from './formatDoc.js';
import { handleColors } from './handleColors.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $customColorPickerInput = $("#custom-color_picker-input")
const $highlightColor = $("#highlight_color")

//btn toolbar
const $btnUndo = $("#btn-undo")
const $btnRedo = $("#btn-redo")
const $btnBold = $("#btn-bold")
const $btnUnderline = $("#btn-underline")
const $btnItalic = $("#btn-italic")
const $btnStrike = $("#btn-strike")
const $btnJustifyLeft = $("#btn-justify_left")
const $btnJustifyCenter = $("#btn-justify_center")
const $btnJustifyRight = $("#btn-justify_right")
const $btnJustifyJustified = $("#btn-justify_justified")
const $btnOrderedList = $("#btn-ordered_list")
const $btnUnorderedList = $("#btn-unordered_list")
const $btnLink = $("#btn-link")
const $btnUnlink = $("#btn-unlink")

$btnUndo.addEventListener("click", () => formatDoc('undo'))
$btnRedo.addEventListener("click", () => formatDoc('redo'))
$btnBold.addEventListener("click", () => formatDoc('bold'))
$btnUnderline.addEventListener("click", () => formatDoc('underline'))
$btnItalic.addEventListener("click", () => formatDoc('italic'))
$btnStrike.addEventListener("click", () => formatDoc('strikeThrough'))
$btnJustifyLeft.addEventListener("click", () => formatDoc('justifyLeft'))
$btnJustifyCenter.addEventListener("click", () => formatDoc('justifyCenter'))
$btnJustifyRight.addEventListener("click", () => formatDoc('justifyRight'))
$btnJustifyJustified.addEventListener("click", () => formatDoc('justifyFull'))
$btnOrderedList.addEventListener("click", () => formatDoc('insertOrderedList'))
$btnUnorderedList.addEventListener("click", () => formatDoc('insertUnorderedList'))
$btnLink.addEventListener("click", () => addLink())
$btnUnlink.addEventListener("click", () => formatDoc('unlink'))



function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}

const $content = $('#note_text');

$content.addEventListener("input", updatePlaceholder);
$content.addEventListener("keyup", updatePlaceholder);
window.addEventListener("DOMContentLoaded", updateToolbar);


function updatePlaceholder () {
	if ($content.innerHTML.trim() === '' || $content.innerHTML === '<div><br></div>' || $content.innerHTML === '<br>') {
    $content.setAttribute("data-placeholder", "on")
  } else {
    $content.setAttribute("data-placeholder", "off")
  }
}


$content.addEventListener('mouseenter', () => {
	const a = $content.querySelectorAll('a');
	a.forEach(item => {
		item.addEventListener('mouseenter', () => {
			$content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', () => {
			$content.setAttribute('contenteditable', true);
		})
	})
});

// TEXT & BACKGROUND TEXT COLOR START
let typeBtn

$('#add_custom_color-btn').addEventListener('click', e => handleColors(e, "create custom color", typeBtn) );

$customColorPickerInput.addEventListener('input', e => handleColors(e, "pick color", typeBtn) );

window.addEventListener("click", e => handleColors(e, "close container", typeBtn) )

$('#change_text_color-btn').addEventListener('click', e => {
	typeBtn = "text"
	handleColors(e, "open pick text color", typeBtn)
});

$('#change_background_color-btn').addEventListener('click', e => {
	typeBtn = "background"
	handleColors(e, "open pick text background", typeBtn)
});
// TEXT & BACKGROUND TEXT COLOR END


let savedRange

// Función para restaurar la selección guardada
function restoreSelection() {
  const selection = window.getSelection();
  if (savedRange) {
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }
}

// cambiar el tamaño de fuente
const $changeFontSizeDisplayText = $('#change_font_size-display-text');
const $changeFontSizeOptions = $('#change_font_size-options');

$("#change_font_size-open-btn").addEventListener('click', () => {
		$changeFontSizeOptions.classList.toggle('show');
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			savedRange = selection.getRangeAt(0);
		}
});

$changeFontSizeOptions.addEventListener('click', e => {
		if (e.target.matches('div[data-value]')) {
			restoreSelection();
			formatDoc('fontSize', e.target.getAttribute('data-value'));
			$changeFontSizeDisplayText.textContent = e.target.textContent;
			$changeFontSizeOptions.classList.remove('show');
		}
});

window.addEventListener("click", e => {
	if (!e.target.matches('.dropdown-btn')) {
		$changeFontSizeOptions.classList.remove('show');
	}
});

// cambiar el encabezado
const $changeHeaderDisplayText = $('#change_header-display-text');
const $changeHeaderOptions = $('#change_header-options');

$("#change_header-open-btn").addEventListener('click', () => {
		$changeHeaderOptions.classList.toggle('show');
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			savedRange = selection.getRangeAt(0);
		}
});

$changeHeaderOptions.addEventListener('click', e => {
	if (e.target.matches('div[data-value]')) {
		restoreSelection();
		formatDoc('formatBlock', e.target.getAttribute('data-value'));
		$changeHeaderDisplayText.textContent = e.target.textContent;
		$changeHeaderOptions.classList.remove('show');
	}
});

window.addEventListener("click", e => {
	if (!e.target.matches('.dropdown-btn')) {
		$changeHeaderOptions.classList.remove('show');
	}
});