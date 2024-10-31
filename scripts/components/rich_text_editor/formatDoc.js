function getAncestorBlock(selection) {
  let node = selection.anchorNode;
  while (node && node.nodeType !== Node.ELEMENT_NODE) {
    node = node.parentNode;
  }
  let block = node;
  if (block && block.nodeName !== "DIV") {
    for (let el = block.parentNode; el.nodeName !== "DIV"; el = el.parentNode) {
      block = el.parentNode;
    }
  }
  return block;
}

export function formatDoc(cmd, value = null) {
  const $content = document.querySelector('#note_text');
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const styledNode = document.createElement("span");    

    if (!selection.isCollapsed) {
      if (cmd === "fontSize") {
        styledNode.style.fontSize = `${value}px`;

      } else if (cmd === "textColor") {
        styledNode.style.color = value;

      } else {
        document.execCommand(cmd, false, value);
        return;
      }

      range.surroundContents(styledNode);

    } else {
      if (cmd === "fontSize") {
        styledNode.style.fontSize = `${value}px`;

      } else if (cmd === "textColor") {
        styledNode.style.color = value;

      } else {
        document.execCommand(cmd, false, value);
        return;
      }
      
      styledNode.textContent = "\u200B";
      range.insertNode(styledNode);

      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.setStart(styledNode, 1);
      selection.addRange(newRange);
    }
  }

  if (cmd.includes('justify')) {
    let block = getAncestorBlock(selection);
    if (block) {
      block.style.textAlign = cmd.replace('justify', '').toLowerCase();
    }
  }
}