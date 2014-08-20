'use strict';

define(function (require) {
    var Physics =   require( 'physicsjs' );
    var Renderers = require( 'renderers' );
    var Behaviors = require( 'behaviors' );
    var Models =    require( 'models' );
    var Views =     require( 'views' );
    var Field =     require( 'field' );
    var Events =    require( 'minivents' );
    var Bodies =    require( 'bodies' );

    var defaults = {
        x: 0,
        y: 0,
        angle: 0,
        vx: 0,
        vy: 0
    }

    var _remove = function( element ){
        element.body._world.remove( element.body );
        Renderers.pixi.stage.removeChild( element.view );
    }

    var _updateBehaviors = function( behaviors, target ) {
        behaviors.forEach( function( behavior ) {
            var targets = ( behavior._targets instanceof Array ) ? behavior._targets : [];
            targets.push( this );
            behavior.applyTo( targets );
        }, target );
    };

    var _changeView = function ( elementTarget, params ) {
        var oldView = elementTarget.view;
        switch( params.type ) {
            case 'sprite':
                if ( elementTarget.view instanceof PIXI.Sprite ) {
                    var texture = PIXI.Texture.fromFrame( params.textureIds[0] );
                    elementTarget.view.setTexture( texture );
                } else if ( elementTarget.view instanceof PIXI.MovieClip ) {
                    var newView = PIXI.Sprite.fromFrame( textureId );
                    elementTarget.view.stop();
                    
                    element.view = newView;
                    _reshape( elementTarget );

                    Renderers.pixi.stage.removeChild( oldView );
                    Renderers.pixi.stage.addChild( newView );
                }
                break;
            case 'movieclip':
                if ( elementTarget.view instanceof PIXI.MovieClip ) {
                    elementTarget.view.stop();
                    elementTarget.view.setTextures( textureIds );
                } else if ( elementTarget.view instanceof PIXI.Sprite ) {
                    var newView = PIXI.MovieClip( params.textureIds );
                    
                    element.view = newView;
                    Renderers.pixi.stage.removeChild( oldView );
                    Renderers.pixi.stage.addChild( newView );
                }
                targetedView.animationSpeed = params.animationSpeed;
                targetedView.play();
                break;
        }
    }

    var _reshape = function( elementTarget ) {
        var bodyWidth = elementTarget.body.width;
        var bodyHeight = elementTarget.body.height;
        var viewWidth = elementTarget.view.width;
        var viewHeight = elementTarget.view.height;

        if ( bodyWidth != viewWidth ) {
            elementTarget.body.width = viewWidth
        }
        if ( bodyHeight != viewHeight ) {
            elementTarget.body.height = viewHeight
        }
    }

    var Elements = {
        Archer: function( team, options ) {
            this.team = team;
            this.sandbox = new Events();
            this.model = new Models.Archer( this.sandbox );

            var width = 52;
            var height = 57;
            
            var params = {
                height: height,
                width: width,

                collect: new Field( null, this.sandbox, 'body:archer:collect' ),
                isHit: new Field( null, this.sandbox, 'body:archer:isHit' ),

                isInTheAir: new Field( false, this.sandbox, 'body:archer:isInTheAir' ),
                isFalling: new Field( false, this.sandbox, 'body:archer:isFalling' ),
                isJumping: new Field( false, this.sandbox, 'body:archer:isJumping' ),
                isDrawing: new Field( false, this.sandbox, 'body:archer:isDrawing')
            }
            params = $.extend( {}, params, options );
            this.body = new Bodies.Archer( params );

            this.body.view = new Views.archers.Archer( this.team, null );

            this.view = this.body.view;

            this.behaviors = [];
            this.behaviors.push(
                Behaviors.touchDetection,
                Behaviors.fallingJumpingDetection,
                Behaviors.collectDetection,
                Behaviors.hitDetection,
                Behaviors.gravityArcher,
                Behaviors.bodyImpulseResponse,
                Behaviors.bodyCollisionDetection,
                Behaviors.sweepPrune
            );

            _updateBehaviors( this.behaviors, this.body );

            this.move = function() {
                if ( !this.body.isDrawing.get() ) {
                    var direction = this.model.aimVector.get().x;
                    this.body.state.vel.x = 0.3 * direction;
                }
            };

            this.jump = function() {
                if ( !this.body.isInTheAir.get() ) {
                    var move = new Physics.vector( 0, - 2.5 );
                    this.body.applyForce( move );
                    this.body.isInTheAir.set( true );
                }
            };

            this.stop = function() {
                if ( !this.body.isInTheAir.get() ) {
                    this.body.state.vel.x = 0;
                }
            };

            this.draw = function() {
                if ( !this.body.isDrawing.get()) {
                    this.stop();
                    if ( this.model.quiver.pick() ) {
                        this.body.isDrawing.set( true );
                    }
                }
            }.bind( this );

            this.releaseArrow = function() {
                if ( this.body.isDrawing) {
                    window.setTimeout( function() {
                        this.body.isDrawing.set( false );
                    }.bind( this ), 50);
                }
            }.bind( this );

            this.sandbox.on( 'body:archer:isFalling', function( value ){
                if ( value.new ) {
                    _changeView( this, {
                        type: 'sprite',
                        textureIds: [ 'archer_' + this.team + '_fall_1' ]
                    } );
                } else {
                    _changeView( this, {
                        type: 'sprite',
                        textureIds: [ 'archer_' + this.team + '_no_drawing' ]
                    } );
                }
            }, this );

            this.sandbox.on( 'body:archer:isDrawing', function( value ){
                if ( value.new ) {
                    this.stop();
                    this.sandbox.emit( 'model:archer:aimVector', {
                        old: this.model.aimVector.get(),
                        new: this.model.aimVector.get()
                    } );
                } else {
                    _changeView( this, {
                        type: 'sprite',
                        textureIds: [ 'archer_' + this.team + '_no_drawing' ]
                    } );
                }
            }, this );

            this.sandbox.on( 'model:archer:aimVector', function( value ){
                if ( this.body.isDrawing.get() ) {
                    var aimVector = this.model.aimVector.get();
                    
                    if ( aimVector.y === 0 ) {
                        _changeView( this, {
                            type: 'sprite',
                            textureIds: [ 'archer_' + this.team + '_drawing_front' ]
                        } );
                    } else if ( aimVector.y < 0 ) {
                        if ( aimVector.x === 0 ) {
                            _changeView( this, {
                                type: 'sprite',
                                textureIds: [ 'archer_' + this.team + '_drawing_up' ]
                            } );
                        } else {
                            _changeView( this, {
                                type: 'sprite',
                                textureIds: [ 'archer_' + this.team + '_drawing_up_diag' ]
                            } );
                        }
                    } else if ( aimVector.y > 0 ) {
                        if ( aimVector.x === 0 ) {
                            _changeView( this, {
                                type: 'sprite',
                                textureIds: [ 'archer_' + this.team + '_drawing_down' ]
                            } );
                        } else {
                            _changeView( this, {
                                type: 'sprite',
                                textureIds: [ 'archer_' + this.team + '_drawing_down_diag' ]
                            } );
                        }
                    }
                } else {
                    this.move();
                    _changeView( this, {
                        type: 'sprite',
                        textureIds: [ 'archer_' + this.team + '_no_drawing' ]
                    } );
                }
                if (value.new.x != 0 ) {
                    this.view.scale.x = value.new.x;
                }
            }, this );

            this.sandbox.on( 'body:archer:isJumping', function( value ){
                if ( value.new ) {
                    _changeView( this, {
                        type: 'sprite',
                        textureIds: [ 'archer_' + this.team + '_jump_1' ]
                    } );
                }
            }, this );

            this.sandbox.on( 'body:archer:collect', function(){
                this.model.quiver.collect();
            }, this );

            this.sandbox.on( 'body:archer:isHit', function(){
                _remove( this );
            }, this );
            
        },
        Arrow: function( options ) {
            var width = 43;
            var height = 17;
            
            this.sandbox = new Events();

            var params = {
                width: width,
                height: height,

                collected: new Field( null, this.sandbox, 'body:arrow:collected' ),
                isPlant: new Field( null , this.sandbox, 'model:arrow:isPlant'),

                isMortal: new Field( false , this.sandbox, 'model:arrow:isMortal')
            }
            params = $.extend({}, params, options);
            this.body = new Bodies.Arrow( params );

            this.body.view = new Views.items.Arrow();

            this.view = this.body.view;

            this.behaviors = [];

            this.behaviors.push(
                // Behaviors.borderWarp,
                // Behaviors.gravityArrow,
                Behaviors.mortalDetection,
                Behaviors.mortalDetection,
                Behaviors.hitDetection,
                Behaviors.gravity,
                Behaviors.bodyImpulseResponse,
                Behaviors.bodyCollisionDetection,
                Behaviors.sweepPrune
            );

            _updateBehaviors( this.behaviors, this.body );

            this.launch = function( strength ) {
                var launch = new Physics.vector( strength, 0 );
                launch.rotate( this.body.state.angular.pos );
                this.body.applyForce( launch, this.body.movedCentroid() );
            };

            this.sandbox.on( 'body:arrow:collected', function(){
                _remove( this );
            }, this );


            this.sandbox.on( 'body:arrow:isPlant', function(){
                // TODO stop the arrow
            }, this );
        },
        Map: function( mapId ) {
            this.bodies = [];
            
            this.model = new Models[ mapId ]();

            this.model.parts.forEach( _.bind( function( part ){
                var params = {
                    x: part.x,
                    y: part.y,
                    height: part.height,
                    width: part.width,
                    unitBlockSize: 30
                };
                this.bodies.push( new Bodies.MapPart( params ) );
            } , this ) );

            this.view = new Views.maps.TwilightSpire();

            this.behaviors = [];
            this.behaviors.push(
                Behaviors.bodyImpulseResponse,
                Behaviors.bodyCollisionDetection,
                Behaviors.sweepPrune
            );

            this.bodies.forEach( function( body ) {
                _updateBehaviors( this.behaviors, body );
            }, this );
        }
    };

    return Elements;
});
