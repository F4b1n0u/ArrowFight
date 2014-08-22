(function requireConfig() {
  'use strict';

  require.config({
    baseUrl: './',

    paths: {
      jquery: '../bower_components/jquery/dist/jquery',
      underscore: '../bower_components/underscore/underscore',
      pixi: '../bower_components/pixi.js/bin/pixi.dev',
      keyboard: '../bower_components/KeyboardJS/keyboard',

      minivents: './libs/allouis-minivents/minivents',

      archerElement: './scripts/modules/core/elements/Archer',
      arrowElement: './scripts/modules/core/elements/Arrow',
      mapElement: './scripts/modules/core/elements/Map',

      archerModels: './scripts/modules/core/models/Archer',
      twilightSpireMapModels: './scripts/modules/core/models/maps/twilightSpire',

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
      location: '../bower_components/PhysicsJS/dist/',
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
  require('pixi');

  var Game = require('game');
  var KeyboardMappings = require('keyboardMappings');
  var VirtualGamePad = require('virtualGamePad');

  var keyboardMapper = require('keyboardMapper');
  var spriteCache = require('spriteCache');

  var mapId = 'TwilightSpire';

  var loadGame = function () {
    var game = new Game(mapId);

    var teams = ['green', 'red'];
    teams.forEach(function (team) {
      var virtualGamePad = new VirtualGamePad(game, team);
      keyboardMapper(virtualGamePad, KeyboardMappings[team]);
    });
  };

  spriteCache(loadGame);
});
