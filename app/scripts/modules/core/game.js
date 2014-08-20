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
        this.mapParts = [];
        this.archers = {};
        this.sandbox = new Events();
        this.virtualGamePad = new VirtualGamePad( this.sandbox );

        var _addElement = function( element, rack, location ) {
            if ( element.hasOwnProperty( 'body' ) ) {
                this.world.add( element.body );
            }
            if ( element.hasOwnProperty( 'bodies' ) ) {
                this.world.add( element.bodies );
            }
            if ( element.hasOwnProperty( 'behaviors' ) ) {
                this.world.add( element.behaviors );
            }
            if ( element.view ) {
                Renderers.pixi.stage.addChild( element.view);
            }
            if ( location ) {
                if ( rack.hasOwnProperty( location ) ) {
                    rack[location] = null;
                }
                rack[location] = element;
            } else {
                rack.push( element );
            }
        }.bind( this );

        var _addMap = function( id ) {
            var element = new Elements.Map( id );
            _addElement( element , this.mapParts );
        }.bind( this );

        var _addArcher = function( team ) {
            var element = new Elements.Archer( team,
            {
                x: 480,
                y: 360
            } );
            _addElement( element, this.archers, team );
        }.bind( this );

        var _releaseArrow = function( archer ) {
            var angle =
                ( archer.model.aimVector.get().x === 0 && archer.model.aimVector.get().y === 0 )
                ?
                archer.model.mainDirection.get().angle() : archer.model.aimVector.get().angle();
            var element = new Elements.Arrow( {
                x: archer.body.state.pos.x,
                y: archer.body.state.pos.y,
                angle: angle
            } );
            element.launch( 0.45 );
            _addElement( element , this.items );
        }.bind( this );

        this.sandbox.on( 'virtualGamePad:joystick:vertical', function(value) {
            var aimVectorField = this.archers.green.model.aimVector
            var aimVector = aimVectorField.get().clone();
            aimVector.y = value.new;
            aimVectorField.set( aimVector );
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:joystick:horizontal', function(value) {
            var aimVectorField = this.archers.green.model.aimVector
            var aimVector = aimVectorField.get().clone();
            aimVector.x = value.new;
            aimVectorField.set( aimVector );
            if ( aimVector.x ) {
                this.archers.green.model.mainDirection.get().x = aimVector.x;
            }
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:jump', function(value) {
            this.archers.green.jump();
        }.bind( this ) );

        this.sandbox.on( 'virtualGamePad:button:fire', function(value) {
            var archer = this.archers.green;
            if ( value.new ) {
                archer.draw();
            } else if ( archer.body.isDrawing.get() ){
                _releaseArrow( archer );
                archer.releaseArrow();
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
