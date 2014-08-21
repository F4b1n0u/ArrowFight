'use strict';

define(function (require) {
	var Field = function( val, sandbox, channel) {
		var value = val;
		this.sandbox = sandbox;
		this.channel = channel;

		this.get = function(){
			return value;
		};
	   
		this.set = function( val ){
			var old = value;
			if ( val !== old ) {
				value = val;
				this.sandbox.emit( this.channel, {
					old: old,
					new: val
				} );
			}
		};

		this.trigger = function () {
			this.sandbox.emit( this.channel );
		};
	};
	return Field;
} );