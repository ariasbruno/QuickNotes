export function formatDoc(cmd, value = null) {

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let node = range.commonAncestorContainer;
    while (node && node.nodeType !== Node.ELEMENT_NODE) {
        node = node.parentNode;
    }
    let block = node;

    if (cmd === "fontSize") {
      block.style.fontSize = `${value}px`;
    } else if (cmd.includes('justify')) {
      block.style.textAlign = cmd.replace('justify', '').toLowerCase();
    } else {
      document.execCommand(cmd, false, value);
    }
  }
}