'use strict';

define( function(require) {
	
	var SpriteCache = function( callback ) {
		var spriteSheetLoader = new PIXI.SpriteSheetLoader( 'images/archers/archer_green.json' )
	    spriteSheetLoader.on( 'loaded', function() {
	    	var spriteSheetLoader = new PIXI.SpriteSheetLoader( 'images/archers/archer_red.json' )
		    spriteSheetLoader.on( 'loaded', callback );
		    spriteSheetLoader.load();
	    } );
	    spriteSheetLoader.load();
	}

	return SpriteCache;
} );

	