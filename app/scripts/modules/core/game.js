'use strict';

define( function (require) {
    var Physics =           require( 'physicsjs' );
    var WorldHelper =       require( 'worldHelper' );
    var Renderers =         require( 'renderers' );
    var Elements =          require( 'elements' );
    var Events =            require( 'minivents' );    

    var Game = function ( mapId ) {
        this.world = WorldHelper.init();
        this.sandbox = new Events();        

        var _addElement = function( element ) {
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
        }.bind( this );

        var _addMap = function( id ) {
            var element = new Elements.Map( id );
            _addElement( element );
        }.bind( this );

        var _addArcher = function( team, sandbox ) {
            var element = new Elements.Archer( team,
            {
                x: 480,
                y: 360
            }, sandbox );
            _addElement( element );

            this.sandbox.on( 'round:finish:looser', function( looser ) {
                looser.reset( {
                    x: 480,
                    y: 360
                } );
                _addElement( looser );
            } );

            return element;
        }.bind( this );

        var _releaseArrow = function( archer ) {
            var angle =
                ( archer.model.aimVector.get().x === 0 && archer.model.aimVector.get().y === 0 ) ? archer.model.mainDirection.get().angle() : archer.model.aimVector.get().angle();
            var element = new Elements.Arrow( {
                x: archer.body.state.pos.x,
                y: archer.body.state.pos.y,
                angle: angle
            } );
            element.launch( 0.45 );
            _addElement( element );
        }.bind( this );

        this.plugVirtualGamePad = function( virtualGamePad ) {
            var team = virtualGamePad.team;
            var baseChannel = team + ':virtualGamePad:';

            var archer = _addArcher( team, this.sandbox );

            this.sandbox.on( baseChannel + 'joystick:vertical', function( value ) {
                var aimVectorField = this.model.aimVector;
                var aimVector = aimVectorField.get().clone();
                aimVector.y = value.new;
                aimVectorField.set( aimVector );
            }.bind( archer ) );

            this.sandbox.on( baseChannel + 'joystick:horizontal', function( value ) {
                var aimVectorField = this.model.aimVector;
                var aimVector = aimVectorField.get().clone();
                aimVector.x = value.new;
                aimVectorField.set( aimVector );
                if ( aimVector.x ) {
                    this.model.mainDirection.get().x = aimVector.x;
                }
            }.bind( archer ) );

            this.sandbox.on( baseChannel + 'button:jump', function() {
                this.jump();
            }.bind( archer ) );

            this.sandbox.on( baseChannel + 'button:fire', function( value ) {
                if ( value.new ) {
                    this.draw();
                } else if ( this.body.isDrawing.get() ){
                    _releaseArrow( this );
                    this.releaseArrow();
                }
            }.bind( archer ) );

            this.sandbox.on( baseChannel + 'button:start', function(value) {
                if ( value.new && ! Physics.util.ticker.isActive()) {
                    Physics.util.ticker.start();
                }
            }.bind( archer ) );
        }.bind( this );

        _addMap( mapId );
    };

    return Game;
} );
