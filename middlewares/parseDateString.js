const dateformats = require('../helpers/dateformats');

/**
 * Adds Date object to req.date if 'date_string' represents correct date, null otherwise
 */
function parseDateString(req, res, next) {
  const x = req.params['date_string'];
  if (x.trim() === '') {
    req.date = new Date();
  } else if (dateformats.isValidUnixTimestamp(x)) {
    req.date = new Date(+x);
  } else if (Date.parse(x)) {
    req.date = new Date(x);
  } else {
    req.date = null;
  }
  next();
}

module.exports = parseDateString;
