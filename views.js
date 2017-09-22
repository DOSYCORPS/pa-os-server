"use strict";
{
  const {def,T,I} = require('dosyhil');

  const PLACE_TYPES = [
    'column',
    'button',
    'input',
    'signpost'
  ];

  const MAP_TYPES = [
    'person',
    'product',
    'stock_price',
    'social_post'
  ];

  const JOURNEY_TYPES = [
    'one-off',
    'regular',
    'triggered',
    'on-demand'
  ];

  def`searchresult ${{file:'searchresult.html'}}`;
  def`searchplaces ${{file:'searchplaces.html'}}`;
  def`maplist ${{file:'maplist.html'}}`;
  def`editmap ${{file:'editmap.html'}}`;
  def`mapeditor ${{file:'mapeditor.html'}}`;
  def`build ${{file:'maplist.html'}}`;

  function serveTo({app,db,update_db}) {
    for( const view in I ) {
      app.get(`/${view}`, async (req,res,next) => {
        res.type('html');
        const html = await I[view](db);
        res.end(html);
      });
      app.post(`/${view}`, async (req,res,next) => {
        res.type('html');
        update_db(db,req.body);
        const html = await I[view](db);
        res.end(html);
      });
    }
  }

  const views = {
    serveTo
  };

  module.exports = views;
}
