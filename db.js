"use strict";
{
  const db = {
    /**
      things like query.<thing>
      and <thing>.remove ought to trigger an action when they update.
      I could standardise things like remove...maybe? 
      Prefer to just have some way to add actions
      This really ought to be here.
    **/
    query: {
      place: '',
      map: '',
      journey: ''
    },
    maps: [
      'friends list map',
      'recent posts map',
      'profile map'
    ],
    places: [
      { prop: 'friend name', slot: '' },
      { prop: 'post title', slot: ''},
      { prop: 'post date', slot: ''},
      { prop: 'profile name', slot: ''},
      { prop: 'profile picture [src link]', slot: ''},
      { prop: 'freind profile [link]', slot: ''}
    ],
    map: {
      removeplace: '',
      save: '',
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
    prop: {
      dellocation: '',
      save: '',
      savelocation: '',
      generalized: '',
      ngeneralized: '',
      locations: [
      ],
      nlocations: [],
      name : 'article text',
      desc: 'paragraphs containing article text',
      concepts: [
        'article',
        'text',
        'paragraphs'
      ]
    }
  };
  const actions = {
    'map.removeplace': val => {
      db.map.places = db.map.places.filter( ({prop}) => val !== prop );
    },
    'prop.dellocation': val => {
      db.prop.locations.splice( val, 1 );
    }
  }
  const mysql = function () {
      return new Promise( (res,rej) => {
      const db = require('mysql');
      const host = 'localhost';
      const user = 'root';
      const password = 'mysql';
      const sql = db.createConnection({ host, user, password });
      sql.connect( err => {
        if ( !!err ) {
          rej(err);
        }
        process.on('exit', () => sql.end() );
        res(sql);
      });
    });
  }
  const neo4j = function () {
      return new Promise( (res,rej) => {
      const db = require('neo4j-driver').v1;
      const url = "bolt://localhost";
      try { 
        const driver = db.driver(url, db.auth.basic("neo4j", "neo4j"));
        process.on('exit', () => driver.close() );
        res(driver);
      } catch(e) {
        rej(e);
      }
    });
  }
  const mongodb = function () { 
      return new Promise( (res,rej) => {
      const db = require('mongodb').MongoClient;
      const url = 'mongodb://localhost:27017/myproject';
      db.connect(url, (err, doc) => {
        if ( !! err ) {
          rej(err);
        } else {
          process.on('exit', () => doc.close() );
          res(doc);
        }
      });
    });
  }

  module.exports = { connect, db, update_db };

  async function connect() {
    console.log("Starting database clients...");
    const sql = await mysql();
    const g = await neo4j();
    const doc = await mongodb();
    //console.log("Clients started.", { sql, g, doc } );
    console.log("Add JENA");
  }

  function update_db(db, params) {
    const todo = [];
    for ( const name in params ) {
      const [slot,type] = name.split(';'); 
      try {
        resolve_slot(db,slot);
      } catch(e) {
        console.warn(e);
        continue;
      } 
      let val = params[name];
      if ( type == 'json' ) {
        try {
          val = JSON.parse(val);
        } catch(e) {
          console.warn(e);
          continue;
        }
      } else if ( type == 'array' ) {
        val = val.split(/,/g);
      }
      set_slot(db,slot,val);
      if ( actions[name] && not_empty( val ) ) {
        console.log("Adding action", name, val );
        todo.push( () => (actions[name](val), set_slot(db,slot,'')) );
      }
    }
    todo.forEach( act => act() );
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
        console.log(object,lastKey);
        throw new TypeError("db object has not such slot given by key path:" + s);
      }
      return { object, lastKey };
    }

    function not_empty( v ) {
      return  v !== undefined && v !== null && v != '';
    }

    function set_slot(o,s,v) {
      const {object,lastKey} = resolve_slot(o,s); 
      //FIXME: this equality check can be more efficient for arrays
      // to avoid setting an array that didn't change
      if ( object[lastKey] != v ) {
        if ( Array.isArray( object[lastKey] ) && ! Array.isArray( v ) ) {
          if ( not_empty(v) ) {
            object[lastKey].push(v);
          }
        } else {
          if ( Array.isArray( v ) ) {
            const val = v.filter( not_empty );
            object[lastKey] = val;
          } else {
            object[lastKey] = v;
          }
        }
      }
    }
}
