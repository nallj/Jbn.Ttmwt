
export const handleCopyClick = (event) => {
  console.log('handleCopyClick', event);

  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(event.target);

  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
}
