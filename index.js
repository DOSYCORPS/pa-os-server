"use strict";
{
  const path = require('path');
  const express = require('express');
  let app;

  start();

  function start() {
    app = express();
    app.use('/', express.static(path.join(__dirname, './')))
    app.listen(8080, () => {
      console.log("Server started...");
    });
  }
}
