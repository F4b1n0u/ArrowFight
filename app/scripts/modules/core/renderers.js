define(function (require) {

  PIXI = require('pixi');
  var Physics = require('physicsjs');

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
