/**
 * Created by huang on 2017/9/10.
 */
/**
 * 获取当前textarea光标位置
 */
export function getCursorPosition(textarea) {
  var rangeData = {text: "", start: 0, end: 0 };
  textarea.focus();
  if (textarea.setSelectionRange) { // W3C
    rangeData.start= textarea.selectionStart;
    rangeData.end = textarea.selectionEnd;
    rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
  } else if (document.selection) { // IE
    var i,
      oS = document.selection.createRange(),
      // Don't: oR = textarea.createTextRange()
      oR = document.body.createTextRange();
    oR.moveToElementText(textarea);
    rangeData.text = oS.text;
    rangeData.bookmark = oS.getBookmark();
    // object.moveStart(sUnit [, iCount])
    // Return Value: Integer that returns the number of units moved.
    for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
      // Why? You can alert(textarea.value.length)
      if (textarea.value.charAt(i) == '/n') {
        i ++;
      }
    }
    rangeData.start = i;
    rangeData.end = rangeData.text.length + rangeData.start;
  }
  return rangeData;
}

/**
 *得到 Textarea 元素光标位置，当Textarea 中的光标丢失了，再设置回来时
 */
export function setCursorPosition(textarea, rangeData) {
  if(!rangeData) {
    alert("You must get cursor position first.")
  }
  if (textarea.setSelectionRange) { // W3C
    textarea.focus();
    textarea.setSelectionRange(rangeData.start, rangeData.end);
  } else if (textarea.createTextRange) { // IE
    var oR = textarea.createTextRange();
    // Fixbug :
    // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
    if(textarea.value.length === rangeData.start) {
      oR.collapse(false)
      oR.select();
    } else {
      oR.moveToBookmark(rangeData.bookmark);
      oR.select();
    }
  }
}
