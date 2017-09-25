"use strict";
{
  const sg = top.require('selector-generalization');
  const rp = top.require('request-promise');

  setup();

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
    const result = sg.generalize( db.prop.locations, db.prop.nlocations, true );
    generalized.value = `${result.positive}`;
    ngeneralized.value = `${result.negative}`;
  }
}
