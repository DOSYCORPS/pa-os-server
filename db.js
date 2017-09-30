"use strict";
{
  const db = {
    // functions
    deep_clone,
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
    ],
    places: [
      { name: 'links', slot: '',
        desc: 'all links', generalized: 'a', locations: []},
      { name: 'paragraphs', slot: '',
        desc: 'all paragraphs', generalized: 'p', locations: [] }
    ],
    map: {
      addprop: '',
      removeprop: '',
      save: '',
      places: [
      ],
      name : '',
      desc: '',
      concepts: [
      ]
    },
    empty_map: {
      addprop: '',
      removeprop: '',
      save: '',
      places: [
      ],
      name : 'test map',
      desc: 'test',
      concepts: [
        'test'
      ]
    },
    prop: {
      size: 0,
      dellocation: '',
      save: '',
      savelocation: '',
      generalized: '',
      ngeneralized: '',
      locations: [
      ],
      nlocations: [],
      name : '',
      slot: '',
      desc: '',
      concepts: [
      ]
    },
    empty_prop: {
      size: 0,
      dellocation: '',
      save: '',
      savelocation: '',
      generalized: '',
      ngeneralized: '',
      locations: [
      ],
      nlocations: [],
      name : 'test prop',
      slot: 'test',
      desc: 'test prop',
      concepts: [
        'test'
      ]
    }
  };
  const actions = {
    'map.save': val => {
      const map_exists = db.maps.find( ({name}) => name == db.map.name );
      if ( !! map_exists ) {
        Object.assign( map_exists, deep_clone( db.map ) );
      } else if ( /* validates */ !! db.map.name ) {
        db.maps.push( deep_clone( db.map ) );
      }
    },
    'prop.save': val => {
      const prop_exists = db.places.find( ({name}) => name == db.prop.name );
      if ( !! prop_exists ) {
        Object.assign( prop_exists, deep_clone( db.prop ) );
      } else if ( /* validates */ !! db.prop.name ) {
        db.places.push( deep_clone( db.prop ) );
      }
    },
    'map.removeprop': val => {
      db.map.places = db.map.places.filter( ({name}) => val !== name );
      actions['map.save'](db.map.name);
    },
    'map.addprop': val => {
      let prop;
      try {
        prop = JSON.parse(val);
      } catch(e) {
        console.warn("Incoming map.addprop value failed JSON parse", val+'');
        return;
      }
      db.map.places.push( prop );
      actions['map.save'](db.map.name);
    },
    'prop.dellocation': val => {
      db.prop.locations.splice( val, 1 );
      actions['prop.save'](db.prop.name);
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
        todo.push( () => (actions[name](val), set_slot(db,slot,'')) );
      }
    }
    todo.forEach( act => act() );
  }

  function deep_clone( o ) {
    return JSON.parse( JSON.stringify( o ) );
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
