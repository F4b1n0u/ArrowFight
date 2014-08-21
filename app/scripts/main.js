'use strict';

require.config({
    baseUrl: './',

    paths: {
        jquery:     '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        pixi:       '../bower_components/pixi.js/bin/pixi.dev',
        keyboard:   '../bower_components/KeyboardJS/keyboard',
        
        minivents:  './libs/allouis-minivents/minivents',

        elements:   './scripts/modules/core/elements',
        field:      './scripts/modules/core/field',
        game:       'scripts/modules/core/game',
        models:     './scripts/modules/core/models',
        renderers:  './scripts/modules/core/renderers',
        views:      './scripts/modules/core/views',
        
        keyboardMapper:     'scripts/modules/inputs/keyboardMapper',
        keyboardMappings:   'scripts/modules/inputs/keyboardMappings',
        virtualGamePad:     './scripts/modules/inputs/virtualGamePad',
        
        behaviors:      './scripts/modules/physics/behaviors',
        bodies:         './scripts/modules/physics/bodies',
        bounds:         './scripts/modules/physics/bounds',
        worldHelper:    './scripts/modules/physics/worldHelper',

        spriteCache:    'scripts/modules/pixi/spriteCache'
    },

    packages: [
        {
            name:       'physicsjs',
            location:   '../bower_components/PhysicsJS/dist/',
            main:       'physicsjs-full-0.6.0'
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

define(function(require) {
    require("jquery");
    require("underscore");
    require("pixi");
    var Game =              require( 'game' );
    var KeyboardMappings =  require( 'keyboardMappings' );
    var VirtualGamePad =    require( 'virtualGamePad');
    var KeyboardMapper =    require( 'keyboardMapper' );
    var SpriteCache =       require( 'spriteCache' );

    var mapId = 'TwilightSpire';

    var loadGame = function() {
        var game = new Game( mapId );

        var teams = [ 'green' , 'red' ];
        teams.forEach( function( team ) {
            new KeyboardMapper( new VirtualGamePad( game, team ) , KeyboardMappings[ team ]);
        } );
    };

    SpriteCache( loadGame );
} );
