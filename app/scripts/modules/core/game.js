'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Renderers = require("scripts/modules/physics/renderers");
    var World = require("scripts/modules/physics/world");
    var Elements = require("scripts/modules/core/elements");
    var Behaviors = require("scripts/modules/physics/behaviors");

    var elements = [];
    var world = null;
    var currentStatus = 1;
    var STATUS= ( function() {
        var status = {
            'NOT_INIT': 1,
            'STARTED': 2,
            'INIT': 3,
            'WORLD_CREATED': 4
        };
        return {
            get: function( name ) {
                return status[name];
            }
        };
    } )();

    var game = {
        start: function() {
            Physics.util.ticker.start();
            currentStatus = STATUS.get( 'STARTED' );
        },
        initElements: function( amountOfArrows, initalArrowAngle ) {
            elements['map'] = [];
            elements['item'] = [];
            elements['behavior'] = [];

            for (var i = 0; i < amountOfArrows; i++) {
                elements['item'].push(
                    new Elements.items.Arrow( {
                        x: 120 * ( 1 + i ),
                        y: 500,
                        angle: initalArrowAngle
                    } )
                );
            };

            elements['map'].push( new Elements.maps.TwilightSpire() );

            var arrowBodies = _.pluck( elements['item'], 'body' );
            elements['behavior'].push(
                Behaviors.borderWarp.applyTo( arrowBodies ),
                //Behaviors.arrowGravity.applyTo( arrowBodies ),
                Behaviors.gravity,
                Behaviors.bodyImpulseResponse,
                Behaviors.bodyCollisionDetection,
                Behaviors.sweepPrune
            );
            STATUS.get( 'INIT' );
        },
        createWorld: function() {
            world = Physics.world( {
                timestep: 1000.0 / 600,
                maxIPF: 60,
                integrator: 'verlet'
            },function( world ){
                elements['item'].forEach( function( element ){
                    if(element.body) {
                        world.add( element.body );
                    }
                    if(element.view) {
                        //Renderers.pixiRenderer.stage.addChild( element.view);
                    }
                } );

                elements['map'].forEach( function( element ){
                    world.add( element.bodies );
                    if( element.view ) {
                        //Renderers.pixiRenderer.stage.addChild( element.view);
                    }
                } );

                world.add( elements['behavior'] );
                world.add( Renderers.pixiRenderer );

                world.on('step', function(){
                    world.render();
                } );

                Physics.util.ticker.on(function( time, dt ){
                    world.step( time );
                } );
            } );
            STATUS.get( 'WORLD_CREATED' );
        },
        launchArrows: function() {
            elements['item'].forEach( function( element ){
                var launch = new Physics.vector(1.5, 0);
                launch.rotate( element.body.state.angular.pos );
                element.body.applyForce( launch, element.body.movedCentroid() );
            } );
        },
        turnArrows: function(direction ) {
            elements['item'].forEach( function( element ){
                var delta = 1 / 32 * Math.PI;
                if ( direction === 'left' ) {
                    delta *= -1;
                }
                element.body.state.angular.pos += delta;
            } );
        }
    };

    return game;
} );
