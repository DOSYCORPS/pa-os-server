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
  I.flow_data = {};

  def`/ ${{file:'markup/root.html', stylesheet: navstyle }}`;
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

  def`bg.svg ${{file:'styles/bg.svg', no_viewport: true}}`;

  def`flows ${{file:'markup/flows/test_index.html'}}`;

  defflow( {name:'enlistment',stylesheet: navstyle}, 'markup/flows/enlistment/contact.html', 'markup/flows/enlistment/oauth_min_permissions.html' );

  module.exports = views;

  function defflow( spec, ...files ) {
    let name, stylesheet, script;
    if ( typeof spec !== "string" ) {
      ({name,stylesheet,script} = spec);
    } else {
      name = spec;
    }
    if ( Array.isArray( files ) ) {
      // ordered 
      const flowviews = files.map( (file,i) => def`${{name: 'flow_'+name+'_'+i, file, stylesheet, script}}`) ;
      const flowinfo = {};
      I.flow_data[name] = flowinfo;
      flowinfo.last_index = files.length - 1;
      flowinfo.first = flowviews[0].cname;
      flowinfo.last = flowviews[flowinfo.last_index].cname;
    } else if ( typeof files == "object" ) {
      // named
      const flowinfo = {};
      I.flow_data[name] = flowinfo;
      for( const cname of files ) {
        const file = files[cname];
        flowinfo[cname] = def`${{name: 'flow_'+cname, file, stylesheet, script}}`;
      }
    }
  }

  /* probably ought to move this out of views and into some
     control or app logic file */
     
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

    function get_extension(fname) {
      const dotpos = fname.lastIndexOf(".");
      if ( dotpos < 0 ) {
        return "";
      }
      return fname.slice(dotpos);
    }

    function get_flow( viewname ) {
      const [ prefix, name, rawindex ] = viewname.split(/_/g);
      const index = parseInt(rawindex);
      if ( Number.isInteger( index) && prefix == 'flow' ) {
        const flow_next = `flow_${name}_${index+1}`;
        const flow_prev = `flow_${name}_${index-1}`;
        let flow_first = false, flow_last = false;
        if ( index == 0 ) {
          flow_first = true; 
        } 
        if ( index == I.flow_data[name].last_index ) {
          flow_last = true;
        }
        return { flow_next, flow_prev, flow_first, flow_last };
      }
    }

    function serveTo({app,db,update_db}) {
      for( const view in I ) {
        const ext = get_extension(view) || 'html';
        const flow = get_flow(view);
        app.get(`/${view}`, async (req,res,next) => {
          res.type(ext);
          update_working_memory(db,req);
          const dbc = I.deep_clone(db);
          dbc.req_method = req.method;
          dbc.route_params = req.params;
          dbc.query_params = req.query; 
          dbc.body_params = req.body;
          Object.assign(dbc,flow);
          const html = await I[view](dbc);
          res.end(html);
        });
        app.post(`/${view}`, async (req,res,next) => {
          res.type('html');
          update_db(db,req.body);
          const dbc = I.deep_clone(db);
          dbc.req_method = req.method;
          dbc.route_params = req.params;
          dbc.query_params = req.query; 
          dbc.body_params = req.body;
          const html = await I[view](dbc);
          res.end(html);
        });
      }
    }
}
