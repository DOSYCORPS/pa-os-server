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

  // TODO: might want to factor this out to separate file
  function update_db(db, params) {
    //FIXME: implement new version
    return;

    let {ngeneralized, generalized, positive, negative} = params;

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
    if ( generalized !== undefined ) {
      db.generalized = generalized;
    }
    if ( ngeneralized !== undefined ) {
      db.ngeneralized = ngeneralized;
    }

    let {placename, placeconcepts, placedesc, placetype} = params;

    if ( placetype !== undefined ) {
      db.placetype = placetype;
    }
    if ( placename !== undefined ) {
      db.placename = placename;
    }

    if ( placeconcepts !== undefined ) {
      db.placeconcepts = placeconcepts;
    }

    if ( placedesc !== undefined ) {
      db.placedesc = placedesc;
    }

    let {includeopen, excludeopen} = params;
    let {descriptionopen, howdoiaddopen} = params;

    if ( includeopen == 'false' ) {
      db.includeopen = false;
    } else if ( includeopen == 'true' ) {
      db.includeopen = true;
    }

    if ( excludeopen == 'false' ) {
      db.excludeopen = false;
    } else if ( excludeopen == 'true' ) {
      db.excludeopen = true;
    }

    if ( descriptionopen == 'false' ) {
      db.descriptionopen = false;
    } else if ( descriptionopen == 'true' ) {
      db.descriptionopen = true;
    }

    if ( howdoiaddopen == 'false' ) {
      db.howdoiaddopen = false;
    } else if ( howdoiaddopen == 'true' ) {
      db.howdoiaddopen = true;
    }
  }
}
