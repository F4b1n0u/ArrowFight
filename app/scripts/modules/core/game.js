'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var WorldHelper = require("scripts/modules/physics/worldHelper");
    var Renderers = require("scripts/modules/core/renderers");
    var Elements = require("scripts/modules/core/elements");

    var Game = {
        world: null,
        items: [],
        archers: [],
        mapParts: []
    };

    Game.start = function() {
        Physics.util.ticker.start();
    };

    Game.initWorld= _.bind( function() {
        this.world = WorldHelper.init();
    }, Game );

    Game.addArcher = _.bind( function( id ) {
        var element = new Elements.archers.Archer( id,
        {
            x: 480,
            y: 360
        } );
        
        if ( element.hasOwnProperty( 'body' ) ) {
            this.world.add( element.body );
        }
        if ( element.hasOwnProperty( 'behaviors' ) ) {
            this.world.add( element.behaviors );
        }
        if ( element.hasOwnProperty( 'view' ) ) {
            Renderers.pixi.stage.addChild( element.view);
        }

        this.archers[id] = element;
    }, Game );
    
    Game.addArrow = _.bind( function( initalArrowAngle ) {
        var element = new Elements.items.Arrow( {
            x: 480,
            y: 360,
            angle: initalArrowAngle
        } );
        
        if ( element.hasOwnProperty( 'body' ) ) {
            this.world.add( element.body );
        }
        if ( element.hasOwnProperty( 'behaviors' ) ) {
            this.world.add( element.behaviors );
        }
        if ( element.hasOwnProperty( 'view' ) ) {
            Renderers.pixi.stage.addChild( element.view);
        }

        this.items.push( element );
    }, Game );

    Game.addMap = _.bind( function() {
        var element = new Elements.maps.TwilightSpire();
        
        if ( element.hasOwnProperty( 'bodies' ) ) {
            this.world.add( element.bodies );
        }
        if ( element.hasOwnProperty( 'behaviors' ) ) {
            this.world.add( element.behaviors );
        }
        if ( element.hasOwnProperty( 'view' ) ) {
            Renderers.pixi.stage.addChild( element.view);
        }

        this.mapParts.push( element );
    }, Game );

    Game.launchArrows = _.bind( function() {
        this.items.forEach( function( element ){
            element.launch( 0.9 );
        } );
    }, Game );

    Game.turnArrows = _.bind( function(direction ) {
        this.items.forEach( function( element ){
            var delta = 1 / 32 * Math.PI;
            if ( direction === 'left' ) {
                delta *= -1;
            }
            element.body.state.angular.pos += delta;
        } );
    }, Game );

    return Game;
} );
