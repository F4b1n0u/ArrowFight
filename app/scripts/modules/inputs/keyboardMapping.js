'use strict';

define(function (require) {
    var KeyboardJS = require( 'keyboard' );

    var keyboardMapping = function ( virtualGamePad ) {
        KeyboardJS.on( 'a',
            function(){
                virtualGamePad.button.start.set ( true );
            },
            function(){
                virtualGamePad.button.start.set ( false );
            }
        );

        KeyboardJS.on( 'space',
            function(){
                virtualGamePad.button.jump.set ( true );
            },
            function(){
                virtualGamePad.button.jump.set ( false );
            }
        );

        KeyboardJS.on( 'x',
            function(){
                virtualGamePad.button.fire.set ( true );
            },
            function(){
                virtualGamePad.button.fire.set ( false );
            }
        );

        KeyboardJS.on( 'up',
            function(){
                virtualGamePad.joystick.vertical.set ( -1 );
            },
            function(){
                virtualGamePad.joystick.vertical.set ( 0 );
            }
        );

        KeyboardJS.on( 'down',
            function(){
                virtualGamePad.joystick.vertical.set ( 1 );
            },
            function(){
                virtualGamePad.joystick.vertical.set ( 0 );
            }
        );

        KeyboardJS.on( 'left',
            function(){
                virtualGamePad.joystick.horizontal.set ( -1 );
            },
            function(){
                virtualGamePad.joystick.horizontal.set ( 0 );
            }
        );

        KeyboardJS.on( 'right',
            function(){
                virtualGamePad.joystick.horizontal.set ( 1 );
            },
            function(){
                virtualGamePad.joystick.horizontal.set ( 0 );
            }
        );
    };

    return keyboardMapping;
} );
