'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Views = require("scripts/modules/core/views");
    var Behaviors = require("scripts/modules/physics/behaviors");

    Physics.body( 'archer', 'convex-polygon', function ( parent ) {
        return {
            init: function (options) {
                var defaults = {
                    restitution: 0,
                    cof: 0.05,
                    mass: 10, 
                    treatment: 'dynamic'
                };
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
        }
    });

    Physics.body( 'arrow', 'convex-polygon', function ( parent ) {
        return {
            init: function (options) {
                var defaults = {
                    restitution: 0.5,
                    cof: 2,
                    mass: 1,
                    treatment: 'dynamic'
                };
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
            movedCentroid: function() {
                return new Physics.vector( this.width / 2, 0 ).rotate( - this.state.angular.pos );
            }
        }
    });

    Physics.body( 'map-part', 'convex-polygon', function ( parent ) {
        return {
            init: function ( options ) {
                var defaults = {
                    restitution: 0.3,
                    cof: 2,
                    mass: 1,
                    treatment: 'static'
                };
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
        }
    });
});


