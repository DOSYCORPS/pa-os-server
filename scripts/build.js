"use strict";
{
  const sg = require('selector-generalization');
  const rp = require('request-promise');
  const build = { setup };

  try { module.exports = build; } catch(e) {}
  try { Object.assign( self, { build }); } catch(e) {}

  function setup() {
    self.addEventListener('load', () => install() );    
    console.log("Build environment setup", sg);
  }

  function install() {
    const generalize_action = document.querySelector('#generalize'); 
    generalize_action.addEventListener('click', e => recalculate(e));
  }

  async function recalculate(e) {
    e.preventDefault();
    console.log("Recalculating...");
    const generalized = document.querySelector('#generalized'); 
    const ngeneralized = document.querySelector('#ngeneralized'); 
    const db = JSON.parse(await rp('http://localhost:8080/db'));
    const result = sg.generalize( db.examples.positive, db.examples.negative, true );
    generalized.value = `${result.positive}`;
    ngeneralized.value = `${result.negative}`;
    console.log("Generalization recomputed", generalized.value);
  }
}
