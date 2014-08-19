'use strict';

define( function (require) {
    var Physics =           require( 'physicsjs' );
    var WorldHelper =       require( 'worldHelper' );
    var Renderers =         require( 'renderers' );
    var Elements =          require( 'elements' );
    var Events =            require( 'minivents' );
    var VirtualGamePad =    require( 'virtualGamePad');

    var Game = function () {
        this.world = null;
        this.items = [];
        this.archers = []
        this.mapParts = [];
        this.sandbox = new Events();
        this.virtualGamePad = new VirtualGamePad( this.sandbox );

        var start = _.bind( function() {
            this.world = WorldHelper.init();
            addMap( 'TwilightSpire' );
            addArcher( 'green' );
            Physics.util.ticker.start();
        }, this );

        var addArcher = function( id ) {
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
        }.bind( this );

        var realesArrow = function( archer , angle) {
            var element = new Elements.items.Arrow( {
                x: archer.body.state.pos.x,
                y: archer.body.state.pos.y,
                angle: angle
            } );
            
            element.launch( 0.9 );

            if ( element.hasOwnProperty( 'body' ) ) {
                this.world.add( element.body );
            }
            if ( element.hasOwnProperty( 'behaviors' ) ) {
                this.world.add( element.behaviors );
            }
            if ( element.hasOwnProperty( 'view' ) && element.view ) {
                Renderers.pixi.stage.addChild( element.view);
            }
            this.items.push( element );
        }.bind( this );

        var addMap = function( id ) {
            var element = new Elements.maps[ id ]();
            
            if ( element.hasOwnProperty( 'bodies' ) ) {
                this.world.add( element.bodies );
            }
            if ( element.hasOwnProperty( 'behaviors' ) ) {
                this.world.add( element.behaviors );
            }
            if ( element.hasOwnProperty( 'view' ) && element.view ) {
                Renderers.pixi.stage.addChild( element.view);
            }

            this.mapParts.push( element );
        }.bind( this );

        // binding with the virtualgamePad
        this.sandbox.on( 'virtualGamePad:joystick:vertical', function(value) {
            
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:joystick:horizontal', function(value) {

        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:jump', function(value) {

        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:fire', function(value) {

        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:start', function(value) {
            start();
        }.bind( this ) );
    };

    return Game;
} );
