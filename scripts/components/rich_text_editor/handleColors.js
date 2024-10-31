import { formatDoc } from "./formatDoc.js";

const $ = (selector) => document.querySelector(selector);

const colorGroupsSolid = {
  pasteles: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", ],
  neutros: ["#F5F5F5", "#D3D3D3", "#A9A9A9", "#808080", "#696969"],
  fluorescentes: ["#FF355E", "#FF6037", "#FF9966", "#FFFF66", "#66FF66"],
  tierra: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F4A460"],
  fríos: ["#87CEEB", "#4682B4", "#5F9EA0", "#6495ED", "#7B68EE"],
  cálidos: ["#FF7F50", "#FF6347", "#FF4500", "#FFA07A", "#FA8072"],
  monocromáticosAzules: ["#E6F7FF", "#99CCFF", "#3399FF", "#0066CC", "#003366"],
  monocromáticosRojos: ["#FFE6E6", "#FF9999", "#FF6666", "#CC3333", "#660000"],
  retroVintage: ["#F08080", "#FFD700", "#FFE4B5", "#008080", "#D2691E"],
  tierraAdicionales: ["#704214", "#C19A6B", "#8A3324", "#4B5320", "#BC8F8F"],
  altaVisibilidad: ["#FF4500", "#32CD32", "#1E90FF", "#FFD700", "#FF1493"],
  tonosApagados: ["#8FBC8F", "#B0E0E6", "#D2B48C", "#778899", "#FAFAD2"],
  oceánicos: ["#00416A", "#2E8BC0", "#B1D4E0", "#03254C", "#0083B0"],
  minerales: ["#4B0082", "#6A5ACD", "#9370DB", "#8A2BE2", "#483D8B"],
  verdesNeón: ["#39FF14", "#00FF7F", "#76FF7A", "#0FFF50", "#66FF66"],
  madera: ["#3E2723", "#795548", "#A1887F", "#D7CCC8", "#4E342E"],
  rosas: ["#FFC0CB", "#FF69B4", "#DB7093", "#C71585", "#E75480"],
  oroRosa: ["#E6B8AF", "#D9A5B3", "#C48B8F", "#AD6664", "#90443B"],
  lavanda: ["#E6E6FA", "#D8BFD8", "#DDA0DD", "#BA55D3", "#800080"],
  otoñales: ["#D2691E", "#CD853F", "#B22222", "#8B4513", "#FFA07A"],
  vintageVerde: ["#3B5323", "#6B8E23", "#4F7942", "#8F9779", "#4A7023"],
};

const colorGroupsSolidSemiTransparent = {
  pasteles: ["#FFB3BA80", "#FFDFBA80", "#FFFFBA80", "#BAFFC980", "#BAE1FF80"],
  neutros: ["#F5F5F580", "#D3D3D380", "#A9A9A980", "#80808080", "#69696980"],
  fluorescentes: ["#FF355E80", "#FF603780", "#FF996680", "#FFFF6680", "#66FF6680"],
  tierra: ["#8B451380", "#A0522D80", "#CD853F80", "#DEB88780", "#F4A46080"],
  fríos: ["#87CEEB80", "#4682B480", "#5F9EA080", "#6495ED80", "#7B68EE80"],
  cálidos: ["#FF7F5080", "#FF634780", "#FF450080", "#FFA07A80", "#FA807280"],
  monocromáticosAzules: ["#E6F7FF80", "#99CCFF80", "#3399FF80", "#0066CC80", "#00336680"],
  monocromáticosRojos: ["#FFE6E680", "#FF999980", "#FF666680", "#CC333380", "#66000080"],
  retroVintage: ["#F0808080", "#FFD70080", "#FFE4B580", "#00808080", "#D2691E80"],
  tierraAdicionales: ["#70421480", "#C19A6B80", "#8A332480", "#4B532080", "#BC8F8F80"],
  altaVisibilidad: ["#FF450080", "#32CD3280", "#1E90FF80", "#FFD70080", "#FF149380"],
  tonosApagados: ["#8FBC8F80", "#B0E0E680", "#D2B48C80", "#77889980", "#FAFAD280"],
  oceánicos: ["#00416A80", "#2E8BC080", "#B1D4E080", "#03254C80", "#0083B080"],
  minerales: ["#4B008280", "#6A5ACD80", "#9370DB80", "#8A2BE280", "#483D8B80"],
  verdesNeón: ["#39FF1480", "#00FF7F80", "#76FF7A80", "#0FFF5080", "#66FF6680"],
  madera: ["#3E272380", "#79554880", "#A1887F80", "#D7CCC880", "#4E342E80"],
  rosas: ["#FFC0CB80", "#FF69B480", "#DB709380", "#C7158580", "#E7548080"],
  oroRosa: ["#E6B8AF80", "#D9A5B380", "#C48B8F80", "#AD666480", "#90443B80"],
  lavanda: ["#E6E6FA80", "#D8BFD880", "#DDA0DD80", "#BA55D380", "#80008080"],
  otoñales: ["#D2691E80", "#CD853F80", "#B2222280", "#8B451380", "#FFA07A80"],
  vintageVerde: ["#3B532380", "#6B8E2380", "#4F794280", "#8F977980", "#4A702380"],
};

const customColors = [];

export function handleColors (e, action, typeBtn) {

  const $textColorContent = $('#text_colors_container');
  const $backgroundColorContent = $('#background_colors_container');
  const $colorGroupsContainer = typeBtn === "text" ? $('#text_color-groups') : $('#background_color-groups');
  const $customColorsContainer = typeBtn === "text" ? $('#text_custom-colors') : $('#background_custom-colors');
  const $colorInput = typeBtn === "text" ? $('#text_custom-color-input') : $('#background_custom-color-input');
  const $changeColorSvg = typeBtn === "text" ? $("#change_text_color-svg") : $("#change_background_color-svg");
  
  function handleColorSelect(color, isDefault) {
    let typeFormat = typeBtn === "text" ? 'foreColor' : 'hiliteColor';
    formatDoc(typeFormat, color)
    $textColorContent.style.display = 'none'
    $backgroundColorContent.style.display = 'none'
    if (isDefault) {
      $changeColorSvg.style.color = window.getComputedStyle(document.documentElement).getPropertyValue("--icon-color");
    } else {
    $changeColorSvg.style.color = color;
    }
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
    let typeInput = typeBtn === "background" ? $("#toggle_transparency-input-background") : $("#toggle_transparency-input-text")
    let typeColor = typeInput.checked ? colorGroupsSolid : colorGroupsSolidSemiTransparent
    for (const [groupName, colors] of Object.entries(typeColor)) {
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

  } else if (action === "render colors") {
    renderColorGroups()
    
  } else if (action === "clear color") {
    let colorDefault = typeBtn === "text" ? window.getComputedStyle(document.documentElement).getPropertyValue("--text-color") : "transparent";    
    handleColorSelect(colorDefault, true)
    
  } else if (action === "pick color") {
    $colorInput.value = e.target.value;

  } else if (action === "open pick text color") {
    $backgroundColorContent.style.display = $backgroundColorContent.style.display = 'none';
    $textColorContent.style.display = $textColorContent.style.display === 'none' ? 'block' : 'none';

  } else if (action === "open pick text background") {
    $textColorContent.style.display = $textColorContent.style.display = 'none';
    $backgroundColorContent.style.display = $backgroundColorContent.style.display === 'none' ? 'block' : 'none';

  } else if (action === "close container") {
    if (!e.target.classList.contains("color-picker")) {
      $textColorContent.style.display = 'none';
      $backgroundColorContent.style.display = 'none';
    }
  } else {
    $textColorContent.style.display = 'none';
    $backgroundColorContent.style.display = 'none';
  }

  renderColorGroups()
}