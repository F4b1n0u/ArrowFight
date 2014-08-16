'use strict';

define(function (require) {
    var KeyboardJS = require("keyboard");
    var Game = require('scripts/modules/core/game');

    var initalArrowAngle = - 1 / 2 * Math.PI;

    var keyboardMapping = {
        init: function() {
            KeyboardJS.on( 'space', function(){}, function(){
                Game.addArrow( initalArrowAngle );
            } );

            KeyboardJS.on( 'up', function(){}, function(){
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
