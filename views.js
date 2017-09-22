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

  const build = def`build ${{file:'mm.html'}}`;

  // helpers

  const views = {
    build
  };

  module.exports = views;
}
