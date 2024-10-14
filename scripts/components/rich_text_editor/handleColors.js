import { formatDoc } from "./formatDoc.js";

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

const customColors = [];

export function handleColors (e, action, typeBtn) {

  const $ = (selector) => document.querySelector(selector);
  const $content = $('#note_text');
  const $colorGroupsContainer = $('#color-groups');
  const $customColorsContainer = $('#custom-colors');
  const $colorInput = $('#custom-color-input');
  const $changeTextColorSvg = $("#change_text_color-svg")
  const $changeBackgroundColorSvg = $("#change_background_color-svg")
  const $textColorContent = $('#colors_container');
  
  function handleColorSelect(color) {
    if (typeBtn === "background") {
      
      $changeBackgroundColorSvg.style.color = color;
      formatDoc('hiliteColor', color)
    } else if (typeBtn === "text") {
      formatDoc('foreColor', color)
      $changeTextColorSvg.style.color = color;
    }
    $textColorContent.style.display = 'none'
  }
  
  function createColorButton(color) {
    const button = document.createElement('button');
    button.className = 'color-button';
    button.style.backgroundColor = color;
    button.addEventListener('click', () => {
      handleColorSelect(color)
    });
    return button;
  }
  
  function renderColorGroups() {
    $colorGroupsContainer.innerHTML = '';
    for (const [groupName, colors] of Object.entries(colorGroups)) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'color-group color-picker';
  
      const title = document.createElement('h3');
      title.className = 'color-group-title color-picker';
      title.textContent = groupName;
      groupDiv.appendChild(title);
  
      const grid = document.createElement('div');
      grid.className = 'color-grid color-picker';
      colors.forEach(color => {
        grid.appendChild(createColorButton(color));
      });
      groupDiv.appendChild(grid);
  
      $colorGroupsContainer.appendChild(groupDiv);
    }
  }
  
  function renderCustomColors() {
    $customColorsContainer.innerHTML = ''; 
    const grid = document.createElement('div');
    grid.className = 'color-grid color-picker';    
    customColors.forEach(color => {
      grid.appendChild(createColorButton(color));
    });
    $customColorsContainer.appendChild(grid);
  }

  if (action === "create custom color") {
    const newColor = $colorInput.value;
    if (!customColors.includes(newColor)) {      
      customColors.push(newColor);
      renderCustomColors();
    }

  } else if (action === "pick color") {
    $colorInput.value = e.target.value;

  } else if (action === "open pick text color") {
    $textColorContent.style.display = $textColorContent.style.display === 'none' ? 'block' : 'none';
    $('#change_text_color-div').appendChild($textColorContent);

  } else if (action === "open pick text background") {
    $textColorContent.style.display = $textColorContent.style.display === 'none' ? 'block' : 'none';
    $('#change_background_color-div').appendChild($textColorContent);

  } else if (action === "close container") {
    if (!e.target.classList.contains("color-picker")) {
      $textColorContent.style.display = 'none';
    }
  } else {
    $textColorContent.style.display = 'none';
  }

  renderColorGroups()
}