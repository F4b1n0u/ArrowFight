'use strict';

define(function (require) {
    var Renderers = require( 'renderers' );

    var spriteSheetLoader = new PIXI.SpriteSheetLoader( 'images/archers/archer_green.json' ).load();

    var Sprites = {
        archers: {
            Archer: function( team ) {
                var sprite = PIXI.Sprite.fromImage( 'images/blank.png' );
                sprite.setTexture( PIXI.Texture.fromFrame( 'archer_green_no_drawing' ) );
                return sprite;
            }
        },
        items : {
            Arrow: function(){
                return PIXI.Sprite.fromImage( 'images/items/arrow.png' );;
            }
        },
        maps: {
            TwilightSpire: function(){
                return PIXI.Sprite.fromImage( 'images/maps/twilightSpire.png' );
            }
        }
    };

    return Sprites;
});
