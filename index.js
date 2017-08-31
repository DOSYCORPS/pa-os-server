"use strict";
{
  const path = require('path');
  const views = require('./views.js');
  const express = require('express');
  let app;

  start();

  function start() {
    app = express();
    app.use('/', express.static(path.join(__dirname, './')))
    define_handlers();
    app.listen(8080, () => {
      console.log("Server started...");
    });
  }

  function define_handlers() {
    app.get('/build', async (req,res,next) => {
      res.type('html');
      const html = await views.build({});
      res.end(html);
    });

    app.get('/search', async (req,res,next) => {
      res.type('html');
      const html = await views.search({});
      res.end(html);
    });
  }
}
