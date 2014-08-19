'use strict';

require.config({
    baseUrl: './',

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        pixi: '../bower_components/pixi.js/bin/pixi.dev',
        keyboard: '../bower_components/KeyboardJS/keyboard',
        minivents: './libs/allouis-minivents/minivents'
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
    var KeyboardMapping = require('scripts/modules/core/inputs/keyboardMapping');

    Game.initWorld();
    Game.addMap();
    Game.start();

    KeyboardMapping.init();
});
