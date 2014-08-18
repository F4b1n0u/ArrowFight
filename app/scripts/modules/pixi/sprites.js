'use strict';

define(function (require) {
    var Sprites = {
        archers: {
            Archer: function( team ) {
                return PIXI.Sprite.fromImage( 'images/archers/archer_' + team + '_stand.png' );
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
