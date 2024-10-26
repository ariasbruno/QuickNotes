const $ =  selector => document.querySelector(selector);
const $$ =  selector => document.querySelectorAll(selector);

const allButtonsDefault = [...$("#toolbar").children];

const $noteModal = $("#note_modal");
const $inputContent = $("#note_text");
const $body = $("#body");

$("#toolbar").classList.remove("open")
$("#open_toolbar-btn").classList.remove("open")
$("#note_modal-div").classList.remove("shifted")

function adjustInputHeight() {  
  const scrollPosition = $noteModal.scrollTop;

  $inputContent.style.height = 'auto';
  $inputContent.style.height = `${$inputContent.scrollHeight}px`;

  $noteModal.scrollTop = scrollPosition;
}


function adjustModalSizes() {
  adjustInputHeight();
}

function focusContent(e) {
  if(e.target.id !== "note_modal") {
      return;
    }
    
    $inputContent.focus();
    
    // Crea un rango
    const range = document.createRange();
    const selection = window.getSelection();
    
    // Función recursiva para obtener el último nodo de texto
    function getLastTextNode(node) {
      // Si el nodo tiene hijos, busca el último nodo de texto en su interior
      if (node.hasChildNodes()) {
        return getLastTextNode(node.lastChild);
      }
      // Si el nodo es un nodo de texto, lo retorna
      return node.nodeType === Node.TEXT_NODE ? node : null;
    }
    
    // Obtiene el último nodo de texto dentro del contenteditable
    const lastTextNode = getLastTextNode($inputContent);
  
    if (lastTextNode) {
      // Colapsa el rango al final del último nodo de texto
      range.setStart(lastTextNode, lastTextNode.length);
      range.setEnd(lastTextNode, lastTextNode.length);
    } else {
      // Si no hay nodo de texto, colapsa el rango al final del div
      range.selectNodeContents($inputContent);
      range.collapse(false);
    }
    
    // Remueve cualquier rango existente y agrega el nuevo
    selection.removeAllRanges();
    selection.addRange(range);
  }
  
function handleOverflowIcons() {
  const $toolbar = document.getElementById('toolbar');
  const $dropdown = document.getElementById('dropdown');
  const $dropdownOpen = document.getElementById('dropdown-open');
  const $dropdownContainer = document.getElementById('dropdown-container');

  $dropdownContainer.innerHTML = '';
  allButtonsDefault.forEach(e => {
    $toolbar.appendChild(e)
  })
  let num = 0
  
  allButtonsDefault.forEach(button => {
    if (button.id === "dropdown") return;
    num += 1
  });
  
  
  const toolbarWidth = $toolbar.offsetWidth;
  const toolbarPadding = 10;
  let usedWidth = ((num - 1) * (32 + toolbarPadding)) + (94 * 2 + toolbarPadding) + 32;
  
  if (toolbarWidth < ((num - 2) * (32 + toolbarPadding)) + (94 * 2 + toolbarPadding) + 32) {
    for (let i = num - 1; toolbarWidth < usedWidth && i >= 0; i--) {
      const buttonWidth = allButtonsDefault[i].offsetWidth || 32;
      usedWidth = usedWidth - (buttonWidth + toolbarPadding);
    
      if (!$dropdownContainer.contains(allButtonsDefault[i])) {
        $dropdownContainer.prepend(allButtonsDefault[i]);          
        
      }
    }
  }
  
  if ($dropdownContainer.children.length > 0) {
    $dropdown.style.display = 'flex';
    $dropdownOpen.addEventListener("click", openDropdown)
    $("#note_modal").addEventListener("click", isOutsideDropdown);
  } else {
    $dropdown.style.display = 'none';
    $dropdownOpen.removeEventListener("click", openDropdown)
    $("#note_modal").removeEventListener("click", isOutsideDropdown);
  }
}
  
function openDropdown() {
  document.querySelector('#dropdown-container').classList.toggle('show');
  document.querySelector('#dropdown-open-svg').classList.toggle('rotate');
}

function isOutsideDropdown (e) {
  if (!e.target.matches('.dropdown-overflow')) {
    $('#dropdown-container').classList.remove('show');
    $('#dropdown-open-svg').classList.remove('rotate');
  }
}
  
export function modalAction(action) {
  if (action === 'open') {
    $body.style.overflow = "hidden";
    $noteModal.style.display = "flex";
    adjustModalSizes();
    handleOverflowIcons();
    window.addEventListener("resize", handleOverflowIcons);
    $noteModal.addEventListener("click", focusContent);
    $inputContent.addEventListener('input', adjustInputHeight);

  } else if (action === 'close') {    
    $noteModal.style.display = "none";
    $body.style.overflow = "";
    window.removeEventListener("resize", handleOverflowIcons);
    $noteModal.removeEventListener("click", focusContent);
    $inputContent.removeEventListener('input', adjustInputHeight);
  }
};