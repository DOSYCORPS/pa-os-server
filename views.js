"use strict";
{
  const {def,T,I} = require('dosyhil');
  const {PLACE_TYPES,MAP_TYPES,JOURNEY_TYPES} = require('./data.js');
  const TYPES = ['map', 'prop', 'journey'];
  const stylesheet = 'styles/xyz.css';
  const script = 'scripts/size.js';
  const states = {

  };
  const views = {
    serveTo
  };

  I.deep_clone = o => JSON.parse( JSON.stringify( o ) );

  def`maplist ${{file:'maplist.html', script }}`;
  def`journeylist ${{file:'journeylist.html', script }}`;
  def`journeyeditor ${{file:'journeyeditor.html', script, stylesheet}}`;
  def`mapper ${{file:'mapper.html', script}}`;
  def`journeyer ${{file:'journeyer.html', script}}`;
  def`mapeditor ${{file:'mapeditor.html', script, stylesheet}}`;
  def`searchplaces ${{file:'searchplaces.html', script, stylesheet}}`;
  def`searchmaps ${{file:'searchmaps.html', script, stylesheet}}`;
  def`mapsearchresult ${{file:'mapsearchresult.html', script, stylesheet}}`;
  def`searchresult ${{file:'searchresult.html', script, stylesheet}}`;
  def`propview ${{file:'propview.html', script, stylesheet}}`;
  def`db ${0}
    ${ d => JSON.stringify(d) } 
  `;

  module.exports = views;

  function update_working_memory(db,req) {
    for( const type of TYPES ) {
      if ( req.originalUrl.includes(type) ) {
        const target_name = req.query[type];
        const target = !! target_name && db[type+'s'].find( ({name}) => name == target_name );
        if ( !! target ) {
          Object.assign( db[type], I.deep_clone( target ) );
        } else {
          Object.assign( db[type], I.deep_clone( db["empty_"+type] ) );
        }
      }
    }
  }

  function serveTo({app,db,update_db}) {
    for( const view in I ) {
      app.get(`/${view}`, async (req,res,next) => {
        res.type('html');
        db.req_method = req.method;
        db.route_params = I.deep_clone(req.params);
        db.query_params = I.deep_clone(req.query); 
        db.body_params = I.deep_clone(req.body)
        update_working_memory(db,req);
        const html = await I[view](I.deep_clone(db));
        res.end(html);
      });
      app.post(`/${view}`, async (req,res,next) => {
        res.type('html');
        db.req_method = req.method;
        db.route_params = req.params;
        db.query_params = I.deep_clone(req.query); 
        db.body_params = I.deep_clone(req.body);
        update_db(db,req.body);
        const html = await I[view](I.deep_clone(db));
        res.end(html);
      });
    }
  }
}
