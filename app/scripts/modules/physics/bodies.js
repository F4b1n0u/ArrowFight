'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Views = require("scripts/modules/physics/views");
    var Behaviors = require("scripts/modules/physics/behaviors");

    Physics.body( 'arrow', 'convex-polygon', function ( parent ) {
        return {
            init: function (options) {
                var defaults = {
                    restitution: 0.5,
                    cof: 2,
                    mass: 1
                };
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
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


    // Physics.body('platform', 'rectangle', function (parent) {
    //     return {
    //         init: function (options) {
    //             var defaults = {
    //                 restitution: 0.3,
    //                 cof: 1,
    //                 mass: 1,
    //                 treatment: 'static'
    //             };
    //             parent.init.call(this, $.extend({}, defaults, options));
    //         }
    //     }
    // });

    // Physics.body('map-01-part-A', 'convex-polygon', function (parent) {
    //     return {
    //         init: function (options) {
    //             var defaults = {
    //                 restitution: 0.3,
    //                 cof: 1,
    //                 mass: 1,
    //                 treatment: 'static',
    //                 vertices: [
    //                     { x: 0, y: 0 },
    //                     { x: 0, y: 330 },
    //                     { x: 60, y: 330 },
    //                     { x: 60, y: 240 },
    //                     { x: 90, y: 240 },
    //                     { x: 90, y: 210 },
    //                     { x: 120, y: 210 },
    //                     { x: 120, y: 180 },
    //                     { x: 30, y: 180 },
    //                     { x: 30, y: 90 },
    //                     { x: 60, y: 90 },
    //                     { x: 60, y: 60 },
    //                     { x: 120, y: 60 },
    //                     { x: 120, y: 30 },
    //                     { x: 180, y: 30 },
    //                     { x: 180, y: 60 },
    //                     { x: 270, y: 60 },
    //                     { x: 270, y: 90 },
    //                     { x: 330, y: 90 },
    //                     { x: 330, y: 60 },
    //                     { x: 390, y: 60 },
    //                     { x: 390, y: 30 },
    //                     { x: 570, y: 30 },
    //                     { x: 570, y: 60 },
    //                     { x: 630, y: 60 },
    //                     { x: 630, y: 90 },
    //                     { x: 690, y: 90 },
    //                     { x: 690, y: 60 },
    //                     { x: 780, y: 60 },
    //                     { x: 780, y: 30 },
    //                     { x: 840, y: 30 },
    //                     { x: 840, y: 60 },
    //                     { x: 900, y: 60 },
    //                     { x: 900, y: 90 },
    //                     { x: 930, y: 90 },
    //                     { x: 930, y: 180 },
    //                     { x: 840, y: 180 },
    //                     { x: 840, y: 210 },
    //                     { x: 870, y: 210 },
    //                     { x: 870, y: 240 },
    //                     { x: 900, y: 240 },
    //                     { x: 900, y: 330 },
    //                     { x: 960, y: 330 },
    //                     { x: 960, y: 0 }
    //                 ]
    //             };
    //             parent.init.call(this, $.extend({}, defaults, options));
    //         }
    //     }
    // });

    // Physics.body('map-01-part-B', 'convex-polygon', function (parent) {
    //     return {
    //         init: function (options) {
    //             var defaults = {
    //                 restitution: 0.3,
    //                 cof: 1,
    //                 mass: 1,
    //                 treatment: 'static',
    //                 vertices: [
    //                     { x: 960, y: 390 },
    //                     { x: 900, y: 390 },
    //                     { x: 900, y: 420 },
    //                     { x: 930, y: 420 },
    //                     { x: 930, y: 570 },
    //                     { x: 870, y: 570 },
    //                     { x: 870, y: 660 },
    //                     { x: 690, y: 660 },
    //                     { x: 690, y: 630 },
    //                     { x: 630, y: 630 },
    //                     { x: 630, y: 690 },
    //                     { x: 330, y: 690 },
    //                     { x: 330, y: 630 },
    //                     { x: 270, y: 630 },
    //                     { x: 270, y: 660 },
    //                     { x: 90, y: 660 },
    //                     { x: 90, y: 570 },
    //                     { x: 30, y: 570 },
    //                     { x: 30, y: 420 },
    //                     { x: 60, y: 420 },
    //                     { x: 60, y: 390 },
    //                     { x: 0, y: 390 },
    //                     { x: 0, y: 390 },
    //                     { x: 0, y: 720 },
    //                     { x: 960, y: 720 }
    //                 ]
    //             };
    //             parent.init.call(this, $.extend({}, defaults, options));
    //         }
    //     }
    // });
});


