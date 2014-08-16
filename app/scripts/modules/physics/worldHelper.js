'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Renderers = require("scripts/modules/physics/renderers");
    var Behaviors = require("scripts/modules/physics/behaviors");
    var Elements = require("scripts/modules/core/elements");

    var amountOfArrows = 6;
    var initalArrowAngle = - 1 / 2 * Math.PI;

    var worldHelper = {
        init: function( elements ) {
            var world = Physics.world( {
                timestep: 1000.0 / 600,
                maxIPF: 60,
                integrator: 'verlet'
            },function( world ){
                world.add( Renderers.pixi );

                world.on('step', function(){
                    world.render();
                } );

                Physics.util.ticker.on(function( time, dt ){
                    world.step( time );
                } );
            } );

            return world;
        },
    }
    return worldHelper;
} );
