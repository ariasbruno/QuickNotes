export function formatDoc(cmd, value = null) {
  const $content = document.querySelector('#note_text');
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let node = range.commonAncestorContainer;
    while (node && node.nodeType !== Node.ELEMENT_NODE) {
        node = node.parentNode;
    }
    let block = node;

    if (cmd === "fontSize") {
      document.execCommand("fontSize", false, "7");
      const fontElements = $content.querySelectorAll("font[size='7']");
      fontElements.forEach((el) => {
        el.removeAttribute("size");
        el.style.fontSize = `${value}px`;
      });
    } else if (cmd === "textColor") {
      document.execCommand("foreColor", false , value);
      // console.log(selection);
      
      // selection.focusNode.parentNode.removeAttribute("style");
      // selection.focusNode.parentNode.style.color = `${value}`;
    } else if (cmd.includes('justify')) {
      if (block.nodeName !== "DIV") {
        for (let el = block.parentNode; el.nodeName !== "DIV"; el = el.parentNode) {
          block = el.parentNode
        }
      }
      block.style.textAlign = cmd.replace('justify', '').toLowerCase();
    } else {
      document.execCommand(cmd, false, value);
    }
  }
}