'use strict';

define(function (require) {
	var Events = require( 'minivents' );
	var Field = require( 'field' );

	var VirtualGamePad = function ( sandbox ){
		this.sandbox = sandbox;
		
		this.joystick = {
			horizontal: new Field( 0, sandbox, 'virtualGamePad:joystick:horizontal'),
			vertical: new Field( 0, sandbox, 'virtualGamePad:joystick:vertical')
		}

		this.button = {
			jump: new Field( false, sandbox, 'virtualGamePad:button:jump'),
			fire: new Field( false, sandbox, 'virtualGamePad:button:fire'),
			start: new Field( false, sandbox, 'virtualGamePad:button:start')
		}
	}

	return VirtualGamePad;
} );
