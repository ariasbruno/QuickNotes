export function formatDoc(cmd, value = null) {



  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let node = range.commonAncestorContainer;
    while (node && node.nodeType !== Node.ELEMENT_NODE) {
        node = node.parentNode;
    }
    let block = node;

    // if (cmd === 'fontSize') {
    //   block.style.fontSize = getFontSize(value);
    if (cmd.includes('justify')) {
      block.style.textAlign = cmd.replace('justify', '').toLowerCase();
    } else {
      document.execCommand(cmd, false, value);
    }
  }
}

// function getFontSize(value) {
//   const fontSizes = {
//     '1': '10px',
//     '2': '13px',
//     '3': '16px',
//     '4': '18px',
//     '5': '24px',
//     '6': '32px',
//     '7': '48px',
//   };
//   return fontSizes[value] || '16px';
// }