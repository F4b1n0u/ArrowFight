'use strict';

define(function (require) {
    var KeyboardJS = require("keyboard");
    var VirtualGamePad = require('scripts/modules/core/input/virtualGamePad');
    var Game = require('scripts/modules/core/input/irtualGamePad');


    var initalArrowAngle = 1 / 4 * Math.PI;

    var keyboardMapping = {
        init: function() {
            KeyboardJS.on( 'a', function(){}, function(){
                Game.addArcher( 'green' );
                KeyboardJS.clear( 'a' );
            } );

            KeyboardJS.on( 'space',
                function(){
                    Game.archers['green'].jump();
                },
                function(){}
            );

            KeyboardJS.on( 'x',
                function(){
                    Game.archers['green'].draw();
                },
                function(){
                    Game.archers['green'].releaseArrow();
            } );

            KeyboardJS.on( 'up',
                function(){
                    if ( Game.archers['green'] ) {
                        var aimVector = Game.archers['green'].model.aimVector.get().clone();
                        aimVector.y = -1;
                        Game.archers['green'].model.aimVector.set( aimVector );
                    }
                },
                function(){
                    if ( Game.archers['green'] ) {
                        var aimVector = Game.archers['green'].model.aimVector.get().clone();
                        aimVector.y = 0;
                        Game.archers['green'].model.aimVector.set( aimVector );
                    }
                }
            );

            KeyboardJS.on( 'down',
                function(){
                    if ( Game.archers['green'] ) {
                        var aimVector = Game.archers['green'].model.aimVector.get().clone();
                        aimVector.y = 1;
                        Game.archers['green'].model.aimVector.set( aimVector );
                    }
                },
                function(){
                    if ( Game.archers['green'] ) {
                        var aimVector = Game.archers['green'].model.aimVector.get().clone();
                        aimVector.y = 0;
                        Game.archers['green'].model.aimVector.set( aimVector );
                    }
                }
            );

            KeyboardJS.on( 'left',
                function(){
                    if ( Game.archers['green'] ) {
                        var aimVector = Game.archers['green'].model.aimVector.get().clone();
                        aimVector.x = -1;

                        Game.archers['green'].model.aimVector.set( aimVector );
                        Game.archers['green'].walk();
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
                        var aimVector = Game.archers['green'].model.aimVector.get().clone();
                        aimVector.x = 1;
                        Game.archers['green'].model.aimVector.set( aimVector );
                        Game.archers['green'].walk();
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
