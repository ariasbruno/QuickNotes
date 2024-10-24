const $ =  selector => document.querySelector(selector);
const $$ =  selector => document.querySelectorAll(selector);

const allButtonsDefault = [...$("#toolbar").children];

export function modalAction(action) {
const $noteModal = document.querySelector("#note_modal");
const $inputTitle = document.querySelector("#title");
const $inputContent = document.querySelector("#note_text");
const $body = document.querySelector("#body");
const $closeNote = document.querySelector(".close");
document.querySelector("#toolbar").classList.remove("open")
document.querySelector("#open_toolbar-btn").classList.remove("open")
document.querySelector("#note_modal-div").classList.remove("shifted")

function adjustInputHeight(element) { // ? AJUSTAR EL TEXTAREA AUTOMÁTICAMENTE
  const scrollPosition = $noteModal.scrollTop;

  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
  $inputContent.style.height = `${element.scrollHeight + 100}px`;

  $noteModal.scrollTop = scrollPosition;
};

function adjustModalSizes() {
  adjustInputHeight($inputContent);
}

$inputContent.addEventListener('input', () => adjustInputHeight($inputContent));

  if (action === 'open') {
    $body.style.overflow = "hidden";
    $noteModal.style.display = "flex";
    adjustModalSizes();
    window.addEventListener("resize", handleOverflowIcons);
    
  } else if (action === 'close') {
    $noteModal.style.display = "none";
    $body.style.overflow = "";
    window.removeEventListener("resize", handleOverflowIcons);
  }

  $noteModal.addEventListener("click", e => {
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
  });

  handleOverflowIcons();
  function handleOverflowIcons() {
  const $toolbar = document.getElementById('toolbar');
  const $toolbarIcons = $toolbar.querySelectorAll('.btn_toolbar');
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
    
    console.log(num)
    
    
    const toolbarWidth = $toolbar.offsetWidth;
    const toolbarPadding = 10;
    let usedWidth = ((num - 1) * (32 + toolbarPadding)) + (94 * 2 + toolbarPadding) + 32;
    console.log('Used width:', usedWidth);
    console.log('Toolbar width:', toolbarWidth);

    if (toolbarWidth < ((num - 2) * (32 + toolbarPadding)) + (94 * 2 + toolbarPadding) + 32) {
      for (let i = num - 1; toolbarWidth < usedWidth && i >= 0; i--) {
        const buttonWidth = allButtonsDefault[i].offsetWidth || 32;
        usedWidth = usedWidth - (buttonWidth + toolbarPadding);
        console.log('Removed button:', allButtonsDefault[i]);
      
        if (!$dropdownContainer.contains(allButtonsDefault[i])) {
          $dropdownContainer.appendChild(allButtonsDefault[i]);          

        }
      }
    }

    if ($dropdownContainer.children.length > 0) {
      $dropdown.style.display = 'flex';
      $dropdownOpen.addEventListener("click", openDropdown)
    } else {
      $dropdown.style.display = 'none';
      $dropdownOpen.removeEventListener("click", openDropdown)
    }
  }
  
  function openDropdown() {
    document.querySelector('#dropdown-container').classList.toggle('show');
    document.querySelector('#dropdown-open-svg').classList.toggle('rotate');
  }
};