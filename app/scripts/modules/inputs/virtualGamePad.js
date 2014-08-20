'use strict';

define(function (require) {
	var Events = require( 'minivents' );
	var Field = require( 'field' );

	var VirtualGamePad = function ( game , team ){
		this.team = team;
		this.sandbox = game.sandbox;
		
		var baseChannel = this.team + ':virtualGamePad:';

		this.joystick = {
			horizontal: new Field( 0, this.sandbox, baseChannel + 'joystick:horizontal'),
			vertical: new Field( 0, this.sandbox, baseChannel + 'joystick:vertical')
		}

		this.button = {
			jump: new Field( false, this.sandbox, baseChannel + 'button:jump'),
			fire: new Field( false, this.sandbox, baseChannel + 'button:fire'),
			start: new Field( false, this.sandbox, baseChannel + 'button:start')
		}

		game.plugVirtualGamePad( this );
	};

	return VirtualGamePad;
} );
