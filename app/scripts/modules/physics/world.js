'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Renderers = require("scripts/modules/physics/renderers");
    var Behaviors = require("scripts/modules/physics/behaviors");
    var Elements = require("scripts/modules/core/elements");

    var amountOfArrows = 6;
    var initalArrowAngle = - 1 / 2 * Math.PI;

    var world = {
        init: function( elements ) {
            var world = Physics.world( {
                timestep: 1000.0 / 600,
                maxIPF: 60,
                integrator: 'verlet'
            },function( world ){
                elements['item'].forEach( function( element ){
                    if(element.body) {
                        world.add( element.body );
                    }
                    if(element.view) {
                        Renderers.pixiRenderer.stage.addChild( element.view);
                    }
                } );

                this.elements['map'].forEach( function( element ){
                    world.add( element.bodies );
                    if( element.view ) {
                        Renderers.pixiRenderer.stage.addChild( element.view);
                    }
                } );

                world.add( this.elements['behavior'] );
                world.add( Renderers.pixiRenderer );

                world.on('step', function(){
                    world.render();
                } );

                Physics.util.ticker.on(function( time, dt ){
                    world.step( time );
                } );
            } );

            return world;
        },
        launchArrows: function( world ) {
            elements['item'].forEach( function( element ){
                var launch = new Physics.vector(1.5, 0);
                launch.rotate( element.body.state.angular.pos );
                element.body.applyForce( launch, element.body.movedCentroid() );
            } );
        },
        turnArrows: function( world, direction ) {
            elements['item'].forEach( function( element ){
                var delta = 1 / 32 * Math.PI;
                if ( direction === 'left' ) {
                    delta *= -1;
                }
                element.body.state.angular.pos += delta;
            } );
        }
    }
    return world;
} );
