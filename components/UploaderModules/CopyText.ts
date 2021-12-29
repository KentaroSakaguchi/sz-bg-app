/**
 * テキストコピー
 * @param {stirng} textData
 */
export const CopyText = (textData) => {
  navigator.clipboard.writeText(textData);
};
