'use strict';

require.config({
    baseUrl: './',

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        pixi: '../bower_components/pixi.js/bin/pixi',
        keyboard: '../bower_components/KeyboardJS/keyboard'
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
        }
    }
});

var amountOfArrows = 7;
var initalArrowAngle = - 1 / 2 * Math.PI;

define(function(require) {
    require("jquery");
    require("underscore");
    require("pixi");
    var Game = require('scripts/modules/core/game');
    var KeyboardMapping = require('scripts/modules/core/inputs/keyboardMapping');

    Game.initElements( amountOfArrows, initalArrowAngle );
    Game.createWorld();

    KeyboardMapping.init();
});
