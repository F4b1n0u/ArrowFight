'use strict';

require.config({
    baseUrl: './',

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        pixi: '../bower_components/pixi.js/bin/pixi.dev',
        keyboard: '../bower_components/KeyboardJS/keyboard',
        
        minivents: './libs/allouis-minivents/minivents',

        game: 'scripts/modules/core/game',
        elements: './scripts/modules/core/elements',
        virtualGamePad: './scripts/modules/inputs/virtualGamePad',
        behaviors: './scripts/modules/physics/behaviors',
        renderers: './scripts/modules/core/renderers',
        bounds: './scripts/modules/physics/bounds',
        field: './scripts/modules/core/field',
        worldHelper: './scripts/modules/physics/worldHelper',
        bodies: './scripts/modules/physics/bodies',
        models: './scripts/modules/core/models',
        views: './scripts/modules/core/views',
        keyboardMapping: 'scripts/modules/inputs/keyboardMapping',
        spriteCache: 'scripts/modules/pixi/spriteCache'
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
    var Game =              require( 'game' );
    var KeyboardMapping =   require( 'keyboardMapping' );
    var SpriteCache =       require( 'spriteCache' );

    var mapId = 'TwilightSpire';
    var teams = [ 'green' ];    

    var loadGame = function() {
        var game = new Game( mapId, teams );
        var keyboardMapping = new KeyboardMapping( game.virtualGamePad );
    } 

    SpriteCache( loadGame );
});
