"use strict";
{
  const bodyParser = require('body-parser');
  const browserify = require('browserify-middleware');
  const sg = require('selector-generalization');
  const path = require('path');
  const views = require('./views.js');
  const {I} = require('dosyhil');
  const {connect} = require('./db.js');
  const db = {
    maps: [
      'friends list map',
      'recent posts map',
      'profile map'
    ],
    places: [
      'friend name',
      'post title',
      'post date',
      'profile name',
      'profile picture [src link]',
      'freind profile [link]'
    ],
    map : {
      places: [
        { prop: 'post like', slot: 'likebutton' },
        { prop: 'login', slot: 'login' },
        { prop: 'logout', slot: 'logout' },
        { prop: 'open settings [link]', slot: 'settings' },
        { prop: 'post', slot: 'publish post' },
        { prop: 'attach photo to post', slot: 'add photo' }
      ],
      name : 'app controls',
      desc: 'controls for this social media app, such as login, logout, post, like, etc',
      concepts: [
        'social media',
        'app',
        'control',
        'automation',
        'control surface map'
      ]
    },
    prop : {
      generalized: 'body --webkit-any(span, p)',
      ngeneralized: 'a',
      locations: [
        'body > div > span',
        'body > article p'
      ],
      name : 'article text',
      desc: 'paragraphs containing article text',
      concepts: [
        'article',
        'text',
        'paragraphs'
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
    views.serveTo({app,db,update_db});
    app.listen(8080, () => {
      connect();
      console.log("Server started...");
    });
  }

  function update_db(db, params) {
    for ( const slot in params ) {
      try {
        resolve_slot(db,slot);
      } catch(e) {
        console.warn(e);
        continue;
      } 
      set_slot(db,slot,params[slot]);
    }
  }

  // helpers
    function resolve_slot(o,s) {
      const keys = s.split(/\./g);
      while( o !== undefined && keys.length > 1 ) {
        o = o[keys.shift()]; 
      }
      const lastKey = keys[0];
      const object = o;
      if ( object == undefined || ! object.hasOwnProperty(lastKey) ) {
        throw new TypeError("db object has not such slot given by key path:" + s);
      }
      return { object, lastKey };
    }

    function set_slot(o,s,v) {
      const {object,lastKey} = resolve_slot(o,s); 
      if ( object[lastKey] != v ) {
        object[lastKey] = v;
      }
    }
}
