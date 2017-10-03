"use strict";
{
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

  const TYPES = ['map', 'prop', 'journey' ];
  const STEPS = [ 'get', 'do' ];
  const ACTIONS = [ 'record', 'press', 'scroll', 'hover', 'type' ];

  const data = {
    PLACE_TYPES, MAP_TYPES, JOURNEY_TYPES, TYPES, ACTIONS, STEPS
  };
  
  module.exports = data;
}

