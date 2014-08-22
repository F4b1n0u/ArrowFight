define(function (require) {
  'use strict';

  var Physics = require('physicsjs');
  var Renderers = require('renderers');

  var worldHelper = {
    init: function () {
      var world = Physics.world({
        timestep: 1000.0 / 300,
        maxIPF: 30,
        integrator: 'verlet'
      }, function (world) {
        world.add(Renderers.pixi);

        world.on('step', function () {
          world.render();
        });

        Physics.util.ticker.on(function (time) {
          world.step(time);
        });
      });

      return world;
    },
  };
  return worldHelper;
});
