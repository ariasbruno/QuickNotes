const $ =  selector => document.querySelector(selector);
const $$ =  selector => document.querySelectorAll(selector);

const allButtonsDefault = [...$("#toolbar").children];

const $noteModal = $("#note_modal");
const $content = $("#note_text");
const $body = $("#body");

$("#toolbar").classList.remove("open")
$("#open_toolbar-btn").classList.remove("open")
$("#note_modal-div").classList.remove("shifted")

function adjustInputHeight() {  
  const scrollPosition = $noteModal.scrollTop;

  $content.style.height = 'auto';
  $content.style.height = `${$content.scrollHeight}px`;

  $noteModal.scrollTop = scrollPosition;
}


function focusContent(e) {
  if(e.target.id !== "note_modal") {
    return;
  }
  
  $content.focus();
  
  const range = document.createRange();
  const selection = window.getSelection();

  function getLastTextNode(node) {
    if (node.hasChildNodes()) {
      return getLastTextNode(node.lastChild);
    }
    return node.nodeType === Node.TEXT_NODE ? node : null;
  }
  
  const lastTextNode = getLastTextNode($content);

  if (lastTextNode) {
    range.setStart(lastTextNode, lastTextNode.length);
    range.setEnd(lastTextNode, lastTextNode.length);
  } else {
    range.selectNodeContents($content);
    range.collapse(false);
  }
  
  selection.removeAllRanges();
  selection.addRange(range);
}
  
function handleOverflowIcons() {
  const $toolbar = $('#toolbar');
  const $dropdown = $('#dropdown');
  const $dropdownOpen = $('#dropdown-open');
  const $dropdownContainer = $('#dropdown-container');

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
  let usedWidth = ((num) * (32 + toolbarPadding)) + 100 + 32;
  
  if (toolbarWidth < ((num) * (32 + toolbarPadding)) + 100 + 32) {
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
  $('#dropdown-container').classList.toggle('show');
  $('#dropdown-open-svg').classList.toggle('rotate');
}

function isOutsideDropdown (e) {
  if (!e.target.matches('.dropdown-overflow') && !e.target.matches(".color-picker")) {
    $('#dropdown-container').classList.remove('show');
    $('#dropdown-open-svg').classList.remove('rotate');
  } else if (e.target.matches(".color-picker")) {
    for (let i = e.target ; i.nodeName !== "DIV"; i = i.parentNode) {
      if (i.parentNode.parentNode.id === "toolbar") {
        $('#dropdown-container').classList.remove('show');
        $('#dropdown-open-svg').classList.remove('rotate');
      }
    }
  }
}

export function modalAction(action) {
  if (action === 'open') {
    $body.style.overflow = "hidden";
    $noteModal.style.display = "flex";
    adjustInputHeight();
    handleOverflowIcons();
    window.addEventListener("resize", handleOverflowIcons);
    $noteModal.addEventListener("click", focusContent);
    $content.addEventListener('input', adjustInputHeight);
    
  } else if (action === 'close') {    
    $noteModal.style.display = "none";
    $body.style.overflow = "";
    window.removeEventListener("resize", handleOverflowIcons);
    $noteModal.removeEventListener("click", focusContent);
    $content.removeEventListener('input', adjustInputHeight);
  }
}