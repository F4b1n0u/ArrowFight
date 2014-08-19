'use strict';

require.config({
    baseUrl: './',

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        pixi: '../bower_components/pixi.js/bin/pixi.dev',
        keyboard: '../bower_components/KeyboardJS/keyboard',
        
        minivents: './libs/allouis-minivents/minivents',

        elements: './scripts/modules/core/elements',
        virtualGamePad: './scripts/modules/inputs/virtualGamePad',
        game: './scripts/modules/core/game',
        behaviors: './scripts/modules/physics/behaviors',
        renderers: './scripts/modules/core/renderers',
        bounds: './scripts/modules/physics/bounds',
        field: './scripts/modules/core/field',
        worldHelper: './scripts/modules/physics/worldHelper',
        bodies: './scripts/modules/physics/bodies',
        models: './scripts/modules/core/models',
        views: './scripts/modules/core/views'
    },

    packages: [
        {
            name: 'physicsjs',
            location: '../bower_components/PhysicsJS/dist/',
            main: 'physicsjs-full-0.6.0'
        }
    ],
    
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore':  {
            exports: '_'
        },
        'pixi':  {
            exports: 'PIXI'
        },
        'minivents': {
            exports: 'Events'
        } 
    }
});

var amountOfArrows = 7;

define(function(require) {
    require("jquery");
    require("underscore");
    require("pixi");
    var Game = require('scripts/modules/core/game');
    var KeyboardMapping = require('scripts/modules/inputs/keyboardMapping');

    var game = new Game();
    var keyboardMapping = new KeyboardMapping( game.virtualGamePad );
    keyboardMapping.game = game;     // TO DELETE
});
