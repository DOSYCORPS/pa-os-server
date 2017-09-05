"use strict";
{
  const bodyParser = require('body-parser');
  const browserify = require('browserify-middleware');
  const sg = require('selector-generalization');
  const path = require('path');
  const views = require('./views.js');
  const db = {
    generalized: '',
    examples : {
      positive : [
      ],
      negative : [
      ]
    }
  };
  const express = require('express');


  let app;

  start();

  function start() {
    app = express();
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use('/', express.static(path.join(__dirname, './')));
    app.use('/scripts', browserify((path.join(__dirname, './scripts'))));
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

    app.get('/db', (req,res,next) => {
      res.type('json');
      res.end(JSON.stringify(db));
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
    let {generalized, positive, negative} = params;

    if ( positive ) {
      if ( !Array.isArray(positive) ) {
        positive = [positive]; 
      }
      positive = positive.filter( s => s.trim().length > 0 );
      let {positive_delete} = params;
      if ( positive_delete ) {
        if ( !Array.isArray(positive_delete) ) {
          positive_delete = [positive_delete]; 
        }
        positive_delete = new Set(positive_delete.map( idx => parseInt(idx)));
        positive = positive.filter( (sel,idx) => !positive_delete.has(idx) );
      }
      Object.assign( db.examples, { positive } );
    }
    if ( negative ) {
      if ( !Array.isArray(negative) ) {
        negative = [negative]; 
      }
      negative = negative.filter( s => s.trim().length > 0 );
      let {negative_delete} = params;
      if ( negative_delete ) {
        if ( !Array.isArray(negative_delete) ) {
          negative_delete = [negative_delete]; 
        }
        negative_delete = new Set(negative_delete.map( idx => parseInt(idx)));
        negative = negative.filter( (sel,idx) => !negative_delete.has(idx) );
      }
      Object.assign( db.examples, { negative } );
    }
    if ( generalized ) {
      db.generalized = generalized;
    }
  }
}
