const express = require('express'),
  router = express.Router();

const parseDateString = require('../middlewares/parseDateString');

router.get('/', function(req, res) {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

router.get('/:date_string', parseDateString, function(req, res) {
  if (req.date) {
    res.json({
      unix: req.date.getTime(),
      utc: req.date.toUTCString(),
    });
  } else {
    res.status(400).json({
      error: 'Invalid Date'
    });
  }
});

module.exports = router;
