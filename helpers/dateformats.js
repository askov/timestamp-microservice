/**
 * Checks if string contains pos or neg integer
 * in range of [-8640000000000, 8640000000000]
 * @example
 * isValidUnixTimestamp('86444') // returns true
 * @example
 * isValidUnixTimestamp('-123') // returns true
 * @example
 * isValidUnixTimestamp('234x') // returns false
 * @example
 * isValidUnixTimestamp('8640000000001') // returns false
 * @param {string} timeStr: string
 * @returns {bool} Returns true or false
 */
function isValidUnixTimestamp(timeStr) {
  // According to http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
  // time range is  [January, 1970 UTC - 8640000000000, January, 1970 UTC + 8640000000000]
  const timeLimit = 8640000000000;
  return (/^-?[0-9]+$/g).test(timeStr) &&
    ((+timeStr <= timeLimit && +timeStr >= 0) ||
      (+timeStr >= -timeLimit && +timeStr < 0));
}

module.exports = {
  isValidUnixTimestamp
};
