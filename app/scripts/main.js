(function requireConfig() {
  'use strict';

  require.config({
    baseUrl: './',

    paths: {
      jquery: './scripts/libs/jquery/dist/jquery',
      underscore: './scripts/libs/underscore/underscore',
      pixi: './scripts/libs/pixi.js/bin/pixi.dev',
      keyboard: './scripts/libs/KeyboardJS/keyboard',

      minivents: './scripts/libs/allouis-minivents/minivents',

      archerElement: './scripts/modules/core/elements/archer',
      arrowElement: './scripts/modules/core/elements/arrow',
      mapElement: './scripts/modules/core/elements/map',

      quiverModel: './scripts/modules/core/models/quiver',
      archerModels: './scripts/modules/core/models/archer',
      twilightSpireMapModels: './scripts/modules/core/models/maps/twilightSpire',

      quiverView: './scripts/modules/core/views/quiver',
      archerView: './scripts/modules/core/views/archer',
      arrowView: './scripts/modules/core/views/arrow',
      twilightSpireMapView: './scripts/modules/core/views/maps/twilightSpire',

      utils: './scripts/modules/core/utils',
      field: './scripts/modules/core/field',
      game: 'scripts/modules/core/game',
      renderers: './scripts/modules/core/renderers',

      keyboardMapper: 'scripts/modules/inputs/keyboardMapper',
      keyboardMappings: 'scripts/modules/inputs/keyboardMappings',
      virtualGamePad: './scripts/modules/inputs/virtualGamePad',

      behaviors: './scripts/modules/physics/behaviors',
      bodies: './scripts/modules/physics/bodies',
      bounds: './scripts/modules/physics/bounds',
      worldHelper: './scripts/modules/physics/worldHelper',

      spriteCache: 'scripts/modules/pixi/spriteCache'
    },

    packages: [{
      name: 'physicsjs',
      location: './scripts/libs/PhysicsJS/dist/',
      main: 'physicsjs-full-0.6.0'
    }],

    shim: {
      'jquery': {
        exports: '$'
      },
      'underscore': {
        exports: '_'
      },
      'pixi': {
        exports: 'PIXI'
      },
      'minivents': {
        exports: 'Events'
      }
    }
  });
}());

define(function (require) {
  'use strict';
  require("jquery");
  require("underscore");

  var Game = require('game');
  var KeyboardMappings = require('keyboardMappings');
  var VirtualGamePad = require('virtualGamePad');

  var keyboardMapper = require('keyboardMapper');
  var spriteCache = require('spriteCache');

  var mapId = 'TwilightSpire';

  function loadGame() {
    var game = new Game(mapId);

    var teams = ['green', 'red'];
    teams.forEach(function (team) {
      var virtualGamePad = new VirtualGamePad(game, team);
      keyboardMapper(virtualGamePad, KeyboardMappings[team]);
    });
  }

  spriteCache(loadGame);
});
