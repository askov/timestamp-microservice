'use strict';

const express = require('express'),
  app = express(),
  config = require('./config');

app.use(require('./controllers'));

const server = app.listen(config.port, function() {
  console.log(`Server listening at port ${server.address().port}`);
});

module.exports = server;
