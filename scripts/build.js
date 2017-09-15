"use strict";
{
  const sg = require('selector-generalization');
  const rp = require('request-promise');
  const build = { setup };

  Object.assign( self, { build });

  function setup() {
    self.addEventListener('load', () => install() );    
  }

  function install() {
    const generalize_action = document.querySelector('#generalize'); 
    generalize_action.addEventListener('click', e => recalculate(e));
  }

  async function recalculate(e) {
    e.preventDefault();
    const generalized = document.querySelector('#generalized'); 
    const ngeneralized = document.querySelector('#ngeneralized'); 
    const db = JSON.parse(await rp('http://localhost:8080/db'));
    const result = sg.generalize( db.examples.positive, db.examples.negative, true );
    generalized.value = `${result.positive}`;
    ngeneralized.value = `${result.negative}`;
  }
}
