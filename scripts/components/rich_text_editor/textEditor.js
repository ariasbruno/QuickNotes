import { updateToolbar } from './updateToolbar.js';
import { formatDoc } from './formatDoc.js';
import { handleColors } from './handleColors.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $modalContainer = $("#note_modal")

const $textCustomColorPickerInput = $("#text_custom-color_picker-input")
const $backgroundCustomColorPickerInput = $("#background_custom-color_picker-input")
const $highlightColor = $("#highlight_color")

//btn toolbar
const $btnUndo = $(".btn-undo")
const $btnRedo = $(".btn-redo")
const $btnBold = $(".btn-bold")
const $btnUnderline = $(".btn-underline")
const $btnItalic = $(".btn-italic")
const $btnStrike = $(".btn-strike")
const $btnJustifyLeft = $(".btn-justify_left")
const $btnJustifyCenter = $(".btn-justify_center")
const $btnJustifyRight = $(".btn-justify_right")
const $btnJustifyJustified = $(".btn-justify_justified")
const $btnOrderedList = $(".btn-ordered_list")
const $btnUnorderedList = $(".btn-unordered_list")
const $btnLink = $(".btn-link")
const $btnUnlink = $(".btn-unlink")


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
$content.addEventListener("focus", updatePlaceholder);
$content.addEventListener("blur", updatePlaceholderBlur);
$modalContainer.addEventListener("DOMContentLoaded", updateToolbar);


function updatePlaceholder () {
	if ($content.innerHTML === '' || $content.innerHTML === '<div><br></div>' || $content.innerHTML === '<br>') {
    $content.setAttribute("data-placeholder", "on")
  } else {
    $content.setAttribute("data-placeholder", "off")
  }
}
function updatePlaceholderBlur () {
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

$('.add_custom_color-btn').addEventListener('click', e => handleColors(e, "create custom color", typeBtn) )

$textCustomColorPickerInput.addEventListener('input', e => handleColors(e, "pick color", typeBtn) );
$backgroundCustomColorPickerInput.addEventListener('input', e => handleColors(e, "pick color", typeBtn) );

$modalContainer.addEventListener("click", e => handleColors(e, "close container", typeBtn) )

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
function restoreSelection () {
  const selection = window.getSelection();
  if (savedRange) {
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }
}

// cambiar el tamaño de fuente
const $fontSizeInput = $("#font_size-input");
$fontSizeInput.addEventListener("focus", () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0);
  }
});

$fontSizeInput.addEventListener("blur", () => {
	$fontSizeInput.value = $fontSizeInput.value.replace(/[^0-9]/g, '');
	minMaxInput()
	restoreSelection()
	formatDoc("fontSize", $fontSizeInput.value)
});

function minMaxInput () {
	const min = 1;
	const max = 400;

	if ($fontSizeInput.value) {
		const numericValue = parseInt($fontSizeInput.value, 10);
		if (numericValue < min) $fontSizeInput.value = min;
		if (numericValue > max) $fontSizeInput.value = max;
	}
}

const $fontSizeInc = $("#font_size-increment");
const $fontSizeDec = $("#font_size-decrement");

$fontSizeInc.addEventListener("click", () => {
$fontSizeInput.value++;
minMaxInput()
formatDoc("fontSize", $fontSizeInput.value)
})

$fontSizeDec.addEventListener("click", () => {
$fontSizeInput.value--;
minMaxInput()
formatDoc("fontSize", $fontSizeInput.value)
})

// cambiar el encabezado
const $changeHeaderDisplayText = $('#change_header-display-text');
const $changeHeaderOptions = $('#change_header-options');

$("#change_header-open-btn").addEventListener('click', () => {
		$changeHeaderOptions.classList.toggle('show');
		$("#svg-open_change_header").classList.toggle('rotate');
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
		$("#svg-open_change_header").classList.remove('rotate');
	}
});

$modalContainer.addEventListener("click", e => {
	if (!e.target.matches('.dropdown-header')) {
		$changeHeaderOptions.classList.remove('show');
		$("#svg-open_change_header").classList.remove('rotate');
	}
});


function ensureFirstDiv() {
  if ($content.innerHTML.trim() === '' || $content.innerHTML === '<br>' || $content.innerHTML === '<div><br></div>') {
    $content.innerHTML = '<div><br></div>';
  }
}

$content.addEventListener("input", ensureFirstDiv);
$content.addEventListener("focus", ensureFirstDiv);