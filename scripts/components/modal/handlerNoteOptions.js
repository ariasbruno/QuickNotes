export function handlerNoteOptions () {
  const $noteOptions = document.querySelector('.note_options-div')

  if ($noteOptions.classList.contains("open")) {
    $noteOptions.classList.remove("open")
  } else {
    $noteOptions.classList.add("open")
  }
}