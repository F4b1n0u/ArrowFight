'use strict';

define(function (require) {
    var KeyboardJS = require( 'keyboard' );

    var keyboardMapper = function ( virtualGamePad, mapping) {
        this.virtualGamePad = virtualGamePad;
        this.mapping = mapping

        if ( this.mapping.hasOwnProperty( 'button' ) ) {
            this.mapping.button.forEach( function( mapping ) {
                KeyboardJS.on( mapping.key,
                    function(){
                        virtualGamePad.button[ this.action ].set ( this.max );
                    }.bind( mapping ),
                    function(){
                        virtualGamePad.button[ this.action ].set ( this.min );
                    }.bind( mapping )
                );
            } );
        }

        if ( this.mapping.hasOwnProperty( 'joystick' ) ) {
            this.mapping.joystick.forEach( function( mapping ) {
                KeyboardJS.on( mapping.key,
                    function(){
                        virtualGamePad.joystick[ this.axe ].set ( this.max );
                    }.bind( mapping ),
                    function(){
                        virtualGamePad.joystick[ this.axe ].set ( this.min );
                    }.bind( mapping )
                );
            } );
        }
    };

    return keyboardMapper;
} );
