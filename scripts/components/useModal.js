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
};

