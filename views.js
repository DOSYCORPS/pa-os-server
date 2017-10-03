"use strict";
{
  const {def,T,I} = require('dosyhil');
  const {TYPES} = require('./data.js');
  const stylesheet = 'styles/xyz.css';
  const script = 'scripts/size.js';
  const views = {
    serveTo
  };

  I.deep_clone = o => JSON.parse( JSON.stringify( o ) );

  def`mymaps ${{file:'markup/mymaps.html', script }}`;
  def`myjourneys ${{file:'markup/myjourneys.html', script }}`;
  def`buildmap ${{file:'markup/buildmap.html', script}}`;
  def`buildjourney ${{file:'markup/buildjourney.html', script}}`;
  def`map ${{file:'markup/map.html', script, stylesheet}}`;
  def`journey ${{file:'markup/journey.html', script, stylesheet}}`;
  def`prop ${{file:'markup/prop.html', script, stylesheet}}`;
  def`searchmaps ${{file:'markup/searchmaps.html', script, stylesheet}}`;
  def`searchprops ${{file:'markup/searchprops.html', script, stylesheet}}`;
  def`mapsearchresult ${{file:'markup/mapsearchresult.html', script, stylesheet}}`;
  def`propsearchresult ${{file:'markup/propsearchresult.html', script, stylesheet}}`;
  def`db ${0}
    ${ d => JSON.stringify(d) } 
  `;

  module.exports = views;

  function update_working_memory(db,req) {
    for( const type of TYPES ) {
      if ( req.path == "/" + type ) {
        const target_name = req.query[type];
        const target = !! target_name && db[type+'s'].find( ({name}) => name == target_name );
        console.log(target_name,target);
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
