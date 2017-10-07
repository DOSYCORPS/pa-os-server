"use strict";
{
  const {def,T,I} = require('dosyhil');
  const {TYPES} = require('./data.js');
  const ModelRoutes = new Set(TYPES.map( t => "/" + t ));
  const compstyle = 'styles/component.css';
  const navstyle = 'styles/nav.css';
  const script = 'scripts/size.js';
  const views = {
    serveTo
  };

  I.deep_clone = o => JSON.parse( JSON.stringify( o ) );

  def`root ${{file:'markup/root.html', stylesheet: navstyle }}`;
  def`mymaps ${{file:'markup/mymaps.html', stylesheet: navstyle }}`;
  def`myjourneys ${{file:'markup/myjourneys.html', stylesheet: navstyle }}`;

  def`buildmap ${{file:'markup/buildmap.html', script, stylesheet: navstyle}}`;
  def`buildjourney ${{file:'markup/buildjourney.html', script, stylesheet: navstyle}}`;

  def`map ${{file:'markup/map.html', script, stylesheet: compstyle}}`;
  def`journey ${{file:'markup/journey.html', script, stylesheet: compstyle}}`;
  def`prop ${{file:'markup/prop.html', script, stylesheet: compstyle}}`;

  def`searchmaps ${{file:'markup/searchmaps.html', script, stylesheet: compstyle}}`;
  def`searchprops ${{file:'markup/searchprops.html', script, stylesheet: compstyle}}`;
  def`mapsearchresult ${{file:'markup/mapsearchresult.html', script, stylesheet: compstyle}}`;
  def`propsearchresult ${{file:'markup/propsearchresult.html', script, stylesheet: compstyle}}`;
  def`db ${0}
    ${ d => JSON.stringify(d) } 
  `;

  module.exports = views;

  function update_working_memory(db,req) {
    if ( ModelRoutes.has( req.path ) ) {
      const type = req.path.slice(1);
      const target_name = req.query[type];
      const target = !! target_name && db[type+'s'].find( ({name}) => name == target_name );
      if ( !! target ) {
        Object.assign( db[type], I.deep_clone( target ) );
      } else if ( target_name == "_new" ) {
        Object.assign( db[type], I.deep_clone( db["empty_"+type] ) );
      }
    }
  }

  function serveTo({app,db,update_db}) {
    for( const view in I ) {
      app.get(`/${view}`, async (req,res,next) => {
        res.type('html');
        db.req_method = req.method;
        db.route_params = req.params;
        db.query_params = req.query; 
        db.body_params = req.body;
        update_working_memory(db,req);
        const html = await I[view](I.deep_clone(db));
        res.end(html);
      });
      app.post(`/${view}`, async (req,res,next) => {
        res.type('html');
        db.req_method = req.method;
        db.route_params = req.params;
        db.query_params = req.query; 
        db.body_params = req.body;
        update_db(db,req.body);
        const html = await I[view](I.deep_clone(db));
        res.end(html);
      });
    }
  }
}
