"use strict";
{
  const bodyParser = require('body-parser');
  const sg = require('selector-generalization');
  const path = require('path');
  const views = require('./views.js');
  const express = require('express');

  const db = {
    generalized: 'asdasd',
    examples : {
      positive : [
        'abc',
        'ddd',
      ],
      negative : [
        'ooo'
      ]
    }
  };

  let app;

  start();

  function start() {
    app = express();
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use('/', express.static(path.join(__dirname, './')))
    define_handlers();
    app.listen(8080, () => {
      console.log("Server started...");
    });
  }

  function define_handlers() {
    app.get('/build', async (req,res,next) => {
      res.type('html');
      const html = await views.build(db);
      res.end(html);
    });

    app.post('/build', async (req,res,next) => {
      res.type('html');
      update_db(db,req.body);
      const html = await views.build(db);
      res.end(html);
    });

    app.get('/search', async (req,res,next) => {
      res.type('html');
      const html = await views.search({});
      res.end(html);
    });
  }

  // TODO: might want to factor this out to separate file
  function update_db(db, params) {
    console.log(params);
    let {positive, negative} = params;

    // turn into arrays (singles are not put in arrays in bodyparser)
      if ( !Array.isArray(positive) ) {
        positive = [positive]; 
      }
      if ( !Array.isArray(negative) ) {
        negative = [negative]; 
      }

    // remove emptys
      positive = positive.filter( s => s.trim().length > 0 );
      negative = negative.filter( s => s.trim().length > 0 );

    db.examples = { positive, negative };
  }
}
