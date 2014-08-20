'use strict';

define(function (require) {
	var Field = function( val, sandbox, channel) {
	    var value = val;
	    var sandbox = sandbox;
	    var channel = channel;
	   
	    this.get = function(){
	        return value;
	    };
	   
	    this.set = function( val ){
	    	var old = value
	    	if ( val != old ) {
				value = val;
	            sandbox.emit( channel, {
	            	old: old,
	            	new: val
	            } );
	    	}
        };

        this.trigger = function () {
        	sandbox.emit( channel );
        }
	};
	return Field;
} );