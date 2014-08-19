'use strict';

define(function (require) {
    var KeyboardJS = require("keyboard");
    var Game = require('scripts/modules/core/game');

    var initalArrowAngle = 1 / 4 * Math.PI;

    var keyboardMapping = {
        init: function() {
            KeyboardJS.on( 'a', function(){}, function(){
                Game.addArcher( 'green' );
                KeyboardJS.clear( 'a' );
            } );

            KeyboardJS.on( 'space',
                function(){
                    Game.archers['green'].draw();
                },
                function(){
                    Game.archers['green'].releaseArrow();
            } );

            KeyboardJS.on( 'up',
                function(){
                    if ( Game.archers['green'] ) {
                        Game.archers['green'].jump();
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
