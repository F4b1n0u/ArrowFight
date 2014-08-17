'use strict';

define(function (require) {
    var Sprites = {
        archers: {
            ArcherA: function() {
                return PIXI.Sprite.fromImage( 'images/archers/archer_A_stand.png' );
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
