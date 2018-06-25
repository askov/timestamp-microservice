const express = require('express'),
  router = express.Router();

const parseDateString = require('../middlewares/parseDateString');

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
