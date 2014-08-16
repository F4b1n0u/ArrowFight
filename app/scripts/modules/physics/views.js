
'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Sprites = require("scripts/modules/pixi/sprites");

    var defaults = {
        anchor: {
            x: 0.5,
            y: 0.5
        }
    }

    var Views = {
        items: {
            Arrow: function( options ){
                var params = $.extend( {}, defaults, options )

                var view = new Sprites.items.Arrow();
                view.anchor.x = params.anchor.x;
                view.anchor.y = params.anchor.y;

                return view;
            }
        },
        maps: {
            TwilightSpire: function( options ) {
                var mapDefault = {
                    anchor: {
                        x: 0,
                        y: 0
                    }
                }
                var params = $.extend( {}, defaults, mapDefault, options )

                var view = new Sprites.maps.TwilightSpire();
                view.anchor.x = params.anchor.x;
                view.anchor.y = params.anchor.y;

                return view;
            }
        }
    };

    return Views;
});
