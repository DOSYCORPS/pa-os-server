"use strict";
{
  const {def,T,I} = require('dosyhil');
  const {PLACE_TYPES,MAP_TYPES,JOURNEY_TYPES} = require('./data.js');
  const stylesheet = 'xyz.css';
  const views = {
    serveTo
  };

  def`searchresult ${{file:'searchresult.html', stylesheet}}`;
  def`searchplaces ${{file:'searchplaces.html', stylesheet}}`;
  def`maplist ${{file:'maplist.html', stylesheet}}`;
  def`mapper ${{file:'mapper.html', stylesheet}}`;
  def`mapeditor ${{file:'mapeditor.html', stylesheet}}`;
  def`propview ${{file:'propview.html', stylesheet}}`;
  def`maplist ${{file:'maplist.html', stylesheet}}`;
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
