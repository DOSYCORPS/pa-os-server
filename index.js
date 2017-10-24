"use strict";
{
  const express = require('express');
  const bodyParser = require('body-parser');
  const browserify = require('browserify-middleware');
  const path = require('path');
  const {I} = require('dosyhil');
  const views = require('./views.js');
  const {db,connect,update_db} = require('./db.js');

  let app;

  if ( !module.parent ) {
    start();
  }
  start();

  module.exports = { start };

  function start() {
    app = express();
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use('/styles', express.static(path.join(__dirname, './styles')));
    app.use('/scripts', browserify((path.join(__dirname, './scripts'))));
    views.serveTo({app,db,update_db});
    app.listen(process.env.PORT || 8080, () => {
      connect();
      console.log("Server started...");
    });
  }
}
