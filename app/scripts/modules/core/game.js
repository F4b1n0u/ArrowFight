'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Renderers = require("scripts/modules/physics/renderers");
    var WorldHelper = require("scripts/modules/physics/worldHelper");
    var Elements = require("scripts/modules/core/elements");

    var elements = [];
    elements['item'] = [];
    elements['mapParts'] = [];
    var world = null;
    var currentStatus = 1;
    
    var game = {
        start: function() {
            Physics.util.ticker.start();
        },
        initWorld: function() {
            world = WorldHelper.init();
        },
        addArrow: function( initalArrowAngle ) {
            var element = new Elements.items.Arrow( {
                x: 480,
                y: 360,
                angle: initalArrowAngle
            } );
            
            if ( element.hasOwnProperty( 'body' ) ) {
                world.add( element.body );
            }
            if ( element.hasOwnProperty( 'behaviors' ) ) {
                world.add( element.behaviors );
            }
            if ( element.hasOwnProperty( 'view' ) ) {
                Renderers.pixi.stage.addChild( element.view);
            }

            elements['item'].push( element );
        },
        addMap: function() {
            var element = new Elements.maps.TwilightSpire();
            elements['mapParts'].push( element );

            if ( element.hasOwnProperty( 'bodies' ) ) {
                world.add( element.bodies );
            }
            if ( element.hasOwnProperty( 'behaviors' ) ) {
                world.add( element.behaviors );
            }
            if ( element.hasOwnProperty( 'view' ) ) {
                Renderers.pixi.stage.addChild( element.view);
            }
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
        },
    };

    return game;
} );
