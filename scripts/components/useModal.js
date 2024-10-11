export function modalAction(action) {
const $noteModal = document.querySelector("#note_modal");
const $inputTitle = document.querySelector("#title");
const $inputContent = document.querySelector("#note_text");
const $body = document.querySelector("#body");
const $closeNote = document.querySelector(".close");

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
    
  } else if (action === 'close') {
    $noteModal.style.display = "none";
    $body.style.overflow = "";
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
  
};