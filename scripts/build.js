"use strict";
{
  const sg = require('selector-generalization');
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

  function recalculate(e) {
    console.log("Recalculating...");
    e.preventDefault();

  }
}
