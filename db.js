"use strict";
{
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

  module.exports = { connect };

  async function connect() {
    console.log("Starting database clients...");
    const sql = await mysql();
    const g = await neo4j();
    const doc = await mongodb();
    //console.log("Clients started.", { sql, g, doc } );
  }
}
