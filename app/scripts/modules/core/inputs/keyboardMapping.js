'use strict';

define(function (require) {
    var KeyboardJS = require("keyboard");
    var Game = require('scripts/modules/core/game');

    var keyboardMapping = {
        init: function() {
            KeyboardJS.on( 'a', function(){}, function(){
                Game.start();
            } );

            KeyboardJS.on( 'z', function(){}, function(){
                KeyboardJS.clear( 'a' );
                Game.launchArrows();
            } );

            KeyboardJS.on( 'e', function(){}, function(){
                Game.turnArrows( 'left' );
            } );

            KeyboardJS.on( 'r', function(){}, function(){
                Game.turnArrows( 'right' );
            } );
        }
    };

    return keyboardMapping;
} );
