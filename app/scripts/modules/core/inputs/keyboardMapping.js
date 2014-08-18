'use strict';

define(function (require) {
    var KeyboardJS = require("keyboard");
    var Game = require('scripts/modules/core/game');

    var initalArrowAngle = - 1 / 2 * Math.PI;

    var keyboardMapping = {
        init: function() {
            KeyboardJS.on( 'a', function(){}, function(){
                Game.addArcher( 'green' );
                KeyboardJS.clear( 'a' );
            } );

            KeyboardJS.on( 'z', function(){}, function(){
                Game.addArrow( initalArrowAngle );
            } );

            KeyboardJS.on( 'space', function(){}, function(){
                Game.launchArrows();
            } );

            KeyboardJS.on( 'up',
                function(){
                    if ( Game.archers['green'] ) {
                        Game.archers['green'].jump( 1.2 );
                    }
                },
                function(){
                    
                }
            );

            KeyboardJS.on( 'left',
                function(){
                    if ( Game.archers['green'] ) {
                        Game.archers['green'].walk( 'left' );
                    }
                },
                function(){
                    if ( Game.archers['green'] ) {
                        Game.archers['green'].stop();
                    }
                }
            );

            KeyboardJS.on( 'right',
                function(){
                    if ( Game.archers['green'] ) {
                        Game.archers['green'].walk( 'right' );
                    }
                },
                function(){
                    if ( Game.archers['green'] ) {
                        Game.archers['green'].stop();
                    }
                }
            );
        }
    };

    return keyboardMapping;
} );
