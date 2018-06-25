const express = require('express'),
  router = express.Router();

router.use('/api/timestamp', require('./timestamp'));

module.exports = router;
