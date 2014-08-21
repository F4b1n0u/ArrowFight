
'use strict';

define(function (require) {
    var $ =         require( 'jquery' );
    var Renderers = require( 'renderers' );
    
    var defaults = {
        anchor: {
            x: 0.5,
            y: 0.5
        }
    };

    var Views = {
        items: {
            Arrow: function( options ){
                var arrowDefault = {
                    texture: './images/items/arrow.png',
                };
                var params = $.extend( {}, defaults, arrowDefault, options );

                var view = Renderers.pixi.createDisplay( 'sprite', params );

                return view;
            }
        },
        archers: {
            Archer: function( team, options ){
                var arrowDefault = {
                    texture: './images/blank.png'
                };
                var params = $.extend( {}, defaults, arrowDefault, options );

                var view = Renderers.pixi.createDisplay( 'sprite', params );
                
                return view;
            }
        },
        maps: {
            TwilightSpire: function( options ) {
                var mapDefault = {
                    texture: './images/maps/twilightSpire.png',
                    anchor: {
                        x: 0,
                        y: 0
                    }
                }
                var params = $.extend( {}, defaults, mapDefault, options );

                var view = Renderers.pixi.createDisplay( 'sprite', params );
                
                return view;
            }
        }
    };

    return Views;
});
