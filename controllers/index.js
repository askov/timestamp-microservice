const express = require('express'),
  router = express.Router();

router.use('/api/timestamp', require('./timestamp'));

router.get('/', (req, res) => {
  const examples = [
    `${process.env.HOST}/api/timestamp/4423232`,
    `${process.env.HOST}/api/timestamp/2018-02-05`,
    `${process.env.HOST}/api/timestamp/ff2018-02-05`,
  ];
  res.render('index', {
    examples
  });
});


module.exports = router;
