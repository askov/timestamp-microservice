'use strict';

const express = require('express');
const app = express();

const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

app.get('/', function (req, res) {
    res.send('Hey');
});

app.get('/:timeStr', function (req, res) {
    const timeStr = req.params.timeStr;
    if (isValidUnixTimestamp(timeStr)) {
        res.send({
            unix: +timeStr,
            natural: convertUnixTimestampToHumanReadable(timeStr)
        });
    } else if (isValidHumanReadableFormat(timeStr)) {
        convertHumanReadableToUnixTimestamp(timeStr);
        res.send({
            unix: convertHumanReadableToUnixTimestamp(timeStr),
            natural: timeStr
        });
    } else {
        res.send({
            unix: null,
            natural: null
        });
    }
});

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
    return (/^-?[0-9]+$/g).test(timeStr)
    && ((+timeStr <= timeLimit && +timeStr >= 0)
    || (+timeStr >= -timeLimit && +timeStr < 0));
}

/** 
 * Checks if string is formatted as 'Month Date, Year':
 * Month, Date and Year must be separated with at least one space
 * Date overflow is not allowed for the sake of readability
 * Month=January|February|March|April|May|June|July|August|September|October|November|December
 * Date=d|dd (contains one or two digits)
 * Year=dddd (contains four digits)
 * @example
 * isValidHumanReadableFormat('December 15, 2015') \\ returns true
 * @example
 * isValidHumanReadableFormat('december 99, 9999') \\ returns false
 * @example
 * isValidHumanReadableFormat('decemberx 2, 2017') \\ returns false
 * @param {string} timeStr: string in format 'Month Date, Year'
 * @returns {bool} Returns true or false depending on passed string format
 */
function isValidHumanReadableFormat(timeStr) {
    const pattern = new RegExp(
        `^(?:${monthNames.join('|')})\\s+\\d\\d?,\\s+\\d{4}$`,
        'gi'
    );
    if (pattern.test(timeStr)) {
        const ydm = parseHumanReadable(timeStr);
        const daysInMonth = new Date(ydm.year, ydm.month + 1, 0);
        return +ydm.date > daysInMonth.getDate()
            ? false
            : true;
    } else {
        return false;
    }
}

/** 
 * Converts correct unix timestamp to 'Month Date, Year'.
 * String passed must contain digits only.
 * @example
 * // returns 'December 15, 2015'
 * convertUnixTimestampToHumanReadable('1450137600');
 * @param {string} timeStr: unix timestamp string
 * @returns {string} Returns time in 'Month Date, Year' format
 */
function convertUnixTimestampToHumanReadable(timeStr) {
    const hrTime = new Date(+timeStr * 1000);
    const monthName = monthNames[hrTime.getMonth()];
    const date = hrTime.getDate();
    const year = hrTime.getFullYear();
    return `${monthName} ${date}, ${year}`;
}

/** 
 * Converts correct 'Month Date, Year' to unix timestamp.
 * @example
 * // returns 1493424000
 * convertHumanReadableToUnixTimestamp('April 29, 2017');
 * @param {string} timeStr: 'Month Date, Year'
 * @returns {number} Returns unix timestamp
 */
function convertHumanReadableToUnixTimestamp(timeStr) {
    const ydm = parseHumanReadable(timeStr);
    return new Date(Date.UTC(ydm.year, ydm.month, ydm.date)).getTime() / 1000;
}

/** 
 * Converts correct 'Month Date, Year' to unix timestamp.
 * @example
 * // returns {year: '2017', month: 3, date: '29'}
 * parseHumanReadable('April 29, 2017');
 * @param {string} timeStr: 'Month Date, Year'
 * @returns {object} ydm - object containing year, date and month.
 * @returns {string} ydm.year - year.
 * @returns {number} ydm.month - month.
 * @returns {string} ydm.date - date.
 */
function parseHumanReadable(timeStr) {
    const year = timeStr.split(' ')[2];
    const date = timeStr.split(' ')[1].slice(0, -1);
    const month = monthNames.indexOf(timeStr.split(' ')[0]);
    return {year: year, month: month, date: date};
}

app.listen(3000);