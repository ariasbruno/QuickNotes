import { updateToolbar } from './updateToolbar.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $fontSize = $("#font-size")
const $header = $("#header")

$header.addEventListener("change", () => formatDoc('formatBlock', $header.value))
$fontSize.addEventListener("change", () => formatDoc('fontSize', $fontSize.value))

const $textColor = $("#text_color")
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














const colorGroups = {
	pasteles: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],
	neutros: ["#F5F5F5", "#D3D3D3", "#A9A9A9", "#808080", "#696969"],
	fluorescentes: ["#FF355E", "#FF6037", "#FF9966", "#FFFF66", "#66FF66"],
	primarios: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
	tierra: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F4A460"],
	fríos: ["#87CEEB", "#4682B4", "#5F9EA0", "#6495ED", "#7B68EE"],
	cálidos: ["#FF7F50", "#FF6347", "#FF4500", "#FFA07A", "#FA8072"],
	pastelesAdicionales: ["#FFD1DC", "#FFB3DE", "#DCD3FF", "#C5D3FF", "#B8FFC9"],
	monocromáticosGrises: ["#E0E0E0", "#B0B0B0", "#808080", "#505050", "#202020"],
	monocromáticosAzules: ["#E6F7FF", "#99CCFF", "#3399FF", "#0066CC", "#003366"],
	monocromáticosRojos: ["#FFE6E6", "#FF9999", "#FF6666", "#CC3333", "#660000"],
	metálicosOro: ["#FFD700", "#E6C200", "#CCB200", "#999000", "#665C00"],
	metálicosPlata: ["#C0C0C0", "#B8B8B8", "#A0A0A0", "#808080", "#606060"],
	metálicosCobre: ["#B87333", "#A06030", "#8A4A29", "#6E3621", "#52311A"],
	retroVintage: ["#F08080", "#FFD700", "#FFE4B5", "#008080", "#D2691E"],
	tierraAdicionales: ["#704214", "#C19A6B", "#8A3324", "#4B5320", "#BC8F8F"],
	altaVisibilidad: ["#FF4500", "#32CD32", "#1E90FF", "#FFD700", "#FF1493"],
	tonosApagados: ["#8FBC8F", "#B0E0E6", "#D2B48C", "#778899", "#FAFAD2"],
	naturalezaCielo: ["#87CEEB", "#4682B4", "#B0C4DE"],
	naturalezaTierra: ["#C2B280", "#E5D8B0", "#A0522D"],
	naturalezaVerdeBosque: ["#228B22", "#6B8E23", "#556B2F"],
};

let selectedColor = "#000000";
let backgroundOrText
const customColors = [];

const colorGroupsContainer = document.getElementById('color-groups');
const customColorsContainer = document.getElementById('custom-colors');
const customColorDisplay = document.getElementById('custom-color-display');
const colorInput = document.getElementById('custom-color-input');
const $changeTextColorSvg = $("#change_text_color-svg")
const $changeBackgroundColorSvg = $("#change_background_color-svg")
const $textColorContent = $('#text_color-content');

function handleColorSelect(color) {
	selectedColor = color;
	if (backgroundOrText === "background") {
		$changeBackgroundColorSvg.style.color = color;
		formatDoc('hiliteColor', color)
	} else if (backgroundOrText === "text") {
		formatDoc('foreColor', color)
		$changeTextColorSvg.style.color = color;
	}
	$textColorContent.style.display = 'none'
}

function createColorButton(color) {
	const button = document.createElement('button');
	button.className = 'color-button';
	button.style.backgroundColor = color;
	button.addEventListener('click', () => handleColorSelect(color));
	return button;
}

function renderColorGroups() {
	for (const [groupName, colors] of Object.entries(colorGroups)) {
		const groupDiv = document.createElement('div');
		groupDiv.className = 'color-group';

		const title = document.createElement('h3');
		title.className = 'color-group-title';
		title.textContent = groupName;
		groupDiv.appendChild(title);

		const grid = document.createElement('div');
		grid.className = 'color-grid';
		colors.forEach(color => {
			grid.appendChild(createColorButton(color));
		});
		groupDiv.appendChild(grid);

		colorGroupsContainer.appendChild(groupDiv);
	}
}

function renderCustomColors() {
	customColorsContainer.innerHTML = ''; 
	const grid = document.createElement('div');
	grid.className = 'color-grid';
	customColors.forEach(color => {
		grid.appendChild(createColorButton(color));
	});
	customColorsContainer.appendChild(grid);
}

document.getElementById('add-custom-color').addEventListener('click', () => {
	const newColor = colorInput.value;
	if (!customColors.includes(newColor)) {
		customColors.push(newColor);
		renderCustomColors();
	}
});

$textColor.addEventListener('input', (e) => {
	customColorDisplay.style.backgroundColor = e.target.value;
	colorInput.value = e.target.value;
});

$('#change_text_color-btn').addEventListener('click', () => {
	$textColorContent.style.display = $textColorContent.style.display === 'none' ? 'block' : 'none';
	backgroundOrText = "text"
});

$('#change_background_color-btn').addEventListener('click', () => {
	$textColorContent.style.display = $textColorContent.style.display === 'none' ? 'block' : 'none';
	backgroundOrText = "background"
});

renderColorGroups();