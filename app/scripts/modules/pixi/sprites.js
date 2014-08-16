'use strict';

define(function (require) {
    var Renderers = require("scripts/modules/physics/renderers");

    var Sprites = {
        items : {
            Arrow: function(){
                var sprite = PIXI.Sprite.fromImage( 'images/items/arrow.png' );
                sprite.scale = new PIXI.Point( 0.056, 0.056 );
                return sprite;
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
