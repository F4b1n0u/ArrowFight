define(function (require) {
  'use strict';

  var Physics = require('physicsjs');
  require('physicsjs/renderers/pixi-renderer');

  /**
   * [Renderers wrapper of of the different renderer]
   * @type {Object}
   */
  var renderers = {
    pixi: Physics.renderer('pixi', {
      el: 'viewport',
      width: 960,
      height: 720,
      meta: true,
      styles: {
        'convex-polygon': {
          lineWidth: 0,
          alpha: 0
        }
      }
    })
  };

  return renderers;
});
