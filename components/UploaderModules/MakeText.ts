/**
 * 文字整形
 * @param {string} textData
 * @returns {string}
 */
export const MakeText = (textData) => {
  return textData.replace(/ /g, '')
    .replace(/\r?\n/g, '\n')
    .replace(/①/g, '1')
    .replace(/②/g, '2')
    .replace(/③/g, '3')
    .replace(/④/g, '4')
    .replace(/⑤/g, '5')
    .replace(/⑥/g, '6')
    .replace(/⑦/g, '7')
    .replace(/⑧/g, '8')
    .replace(/⑨/g, '9')
    .replace(/⑫/g, '12')
    .replace(/⑭/g, '14')
    .replace(/⑰/g, '17')
    .replace(/⑳/g, '20')
};
