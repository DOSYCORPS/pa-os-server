"use strict";
{
  const bodyParser = require('body-parser');
  const browserify = require('browserify-middleware');
  const path = require('path');
  const views = require('./views.js');
  const {I} = require('dosyhil');
  const {db,connect,update_db} = require('./db.js');
  const express = require('express');

  let app;

  if ( !module.parent ) {
    start();
  }

  module.exports = { start };

  function start() {
    app = express();
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use('/styles', express.static(path.join(__dirname, './styles')));
    app.use('/scripts', browserify((path.join(__dirname, './scripts'))));
    views.serveTo({app,db,update_db});
    app.listen(8080, () => {
      connect();
      console.log("Server started...");
    });
  }
}
