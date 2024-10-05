import { updateToolbar } from './updateToolbar.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $fontSize = $("#font-size")
const $header = $("#header")

$header.addEventListener("change", () => formatDoc('formatBlock', $header.value))
$fontSize.addEventListener("change", () => formatDoc('fontSize', $fontSize.value))

const $textColor = $("#text_color")
const $highlightColor = $("#highlight_color")

$textColor.addEventListener("input", () => formatDoc('foreColor', $textColor.value))
$highlightColor.addEventListener("input", () => formatDoc('hiliteColor', $highlightColor.value))

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


function formatDoc(cmd, value = null) {
	const selection = window.getSelection();
	if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			let block = getSelectedBlock(range);

			if (cmd.includes('justify')) {
					// Aplica la alineación al bloque contenedor sin crear nuevos elementos
					block.style.textAlign = cmd.replace('justify', '').toLowerCase();
			} else {
					if (value) {
							document.execCommand(cmd, false, value);
					} else {
							document.execCommand(cmd);
					}
			}
	}
}

function getSelectedBlock(range) {
	let node = range.commonAncestorContainer;
	while (node && node.nodeType !== Node.ELEMENT_NODE) {
			node = node.parentNode;
	}
	return node;
}


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
})


// const showCode = document.getElementById('show-code');
// let active = false;

// showCode.addEventListener('click', () => {
// 	showCode.dataset.active = !active;
// 	active = !active
// 	if(active) {
// 		content.textContent = content.innerHTML;
// 		content.setAttribute('contenteditable', false);
// 	} else {
// 		content.innerHTML = content.textContent;
// 		content.setAttribute('contenteditable', true);
// 	}
// })



const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		$content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([$content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf($content).save(filename.value);
	}
}