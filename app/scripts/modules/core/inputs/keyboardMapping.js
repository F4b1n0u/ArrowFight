'use strict';

define(function (require) {
    var KeyboardJS = require("keyboard");
    var Game = require('scripts/modules/core/game');

    var keyboardMapping = {
        init: function() {
            KeyboardJS.on( 'space', function(){}, function(){
                Game.start();
            } );

            KeyboardJS.on( 'up', function(){}, function(){
                KeyboardJS.clear( 'a' );
                Game.launchArrows();
            } );

            KeyboardJS.on( 'left', function(){}, function(){
                Game.turnArrows( 'left' );
            } );

            KeyboardJS.on( 'right', function(){}, function(){
                Game.turnArrows( 'right' );
            } );
        }
    };

    return keyboardMapping;
} );
