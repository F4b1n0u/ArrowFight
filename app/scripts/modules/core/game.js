'use strict';

define( function (require) {
    var Physics =           require( 'physicsjs' );
    var WorldHelper =       require( 'worldHelper' );
    var Renderers =         require( 'renderers' );
    var Elements =          require( 'elements' );
    var Events =            require( 'minivents' );
    var VirtualGamePad =    require( 'virtualGamePad');

    var Game = function ( mapId, teams ) {
        this.world = WorldHelper.init();
        this.items = [];
        this.archers = []
        this.mapParts = [];
        this.sandbox = new Events();
        this.virtualGamePad = new VirtualGamePad( this.sandbox );

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

        var _addMap = function( id ) {
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

        var _addArcher = function( id ) {
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

        this.sandbox.on( 'virtualGamePad:joystick:vertical', function(value) {
            var aimVectorField = this.archers[ teams[0] ].model.aimVector
            var aimVector = aimVectorField.get().clone();
            aimVector.y = value.new;
            aimVectorField.set( aimVector );
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:joystick:horizontal', function(value) {
            var aimVectorField = this.archers[ teams[0] ].model.aimVector
            var aimVector = aimVectorField.get().clone();
            aimVector.x = value.new;
            aimVectorField.set( aimVector );
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:jump', function(value) {
            this.archers[ teams[0] ].jump();
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:fire', function(value) {
            if ( value.new ) {
                this.archers[ teams[0] ].draw();
            } else {
                this.archers[ teams[0] ].releaseArrow();
            }
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:start', function(value) {
            if ( value.new && ! Physics.util.ticker.isActive()) {
                Physics.util.ticker.start();
            }
        }.bind( this ) );

        _addMap( mapId );
        _addArcher( teams[0] );
    };

    return Game;
} );
