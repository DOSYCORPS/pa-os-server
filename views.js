"use strict";
{
  const {def,T,I} = require('dosyhil');
  const {PLACE_TYPES,MAP_TYPES,JOURNEY_TYPES} = require('./data.js');
  const stylesheet = 'styles/xyz.css';
  const script = 'scripts/size.js';
  const views = {
    serveTo
  };

  def`searchresult ${{file:'searchresult.html', script, stylesheet}}`;
  def`searchplaces ${{file:'searchplaces.html', script, stylesheet}}`;
  def`maplist ${{file:'maplist.html', script, stylesheet}}`;
  def`mapper ${{file:'mapper.html', stylesheet, script}}`;
  def`mapeditor ${{file:'mapeditor.html', script, stylesheet}}`;
  def`propview ${{file:'propview.html', script, stylesheet}}`;
  def`maplist ${{file:'maplist.html', script, stylesheet}}`;
  def`db ${0}
    ${ d => JSON.stringify(d) } 
  `;

  module.exports = views;

  function serveTo({app,db,update_db}) {
    for( const view in I ) {
      app.get(`/${view}`, async (req,res,next) => {
        res.type('html');
        db.req_method = req.method;
        db.route_params = req.params;
        db.query_params = req.query; 
        db.body_params = req.body;
        const html = await I[view](db);
        res.end(html);
      });
      app.post(`/${view}`, async (req,res,next) => {
        res.type('html');
        db.req_method = req.method;
        db.route_params = req.params;
        db.query_params = req.query; 
        db.body_params = req.body;
        update_db(db,req.body);
        const html = await I[view](db);
        res.end(html);
      });
    }
  }
}
