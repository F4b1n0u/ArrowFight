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

    var _updateBehaviors = function( behaviors, target ) {
        behaviors.forEach( function( behavior ) {
            var targets = ( behavior._targets instanceof Array ) ? behavior._targets : [];
            targets.push( this );
            behavior.applyTo( targets );
        }, target );
    };

    var _replaceView = function ( elementTarget, params ) {
        var oldView = elementTarget.view;
        switch( params.type ) {
            case 'sprite':
                var texture = PIXI.Texture.fromFrame( params.textureIds[0] );

                if ( elementTarget.view instanceof PIXI.Sprite ) {
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
        archers: {
            Archer: function( team, options ) {
                var sandbox = new Events();
                var width = 52;
                var height = 57;

                var centroidX = options.x + ( width / 2 );
                var centroidY = options.y + ( height / 2 );
                var halfHeigth = height / 2;
                var halfWidth = width / 2;

                var params = {
                    vertices: [
                        { x: centroidX - halfWidth, y: centroidY - halfHeigth},
                        { x: centroidX + halfWidth, y: centroidY - halfHeigth},
                        { x: centroidX + halfWidth, y: centroidY + halfHeigth},
                        { x: centroidX - halfWidth, y: centroidY + halfHeigth}
                    ],
                    isInTheAir: new Field( false, sandbox, 'body:archer:isInTheAir' ),
                    isFalling: new Field( false, sandbox, 'body:archer:isFalling' ),
                    isJumping: new Field( false, sandbox, 'body:archer:isJumping' )
                }
                params = $.extend( {}, params, options );

                this.model = new Models.archers.Archer( sandbox );

                this.body = new Bodies.Archer( params );
                this.body.view = new Views.archers.Archer( team, null );

                this.view = this.body.view;

                this.behaviors = [];

                this.behaviors.push(
                    Behaviors.touchDetection,
                    Behaviors.fallingJumpingDetection,
                    Behaviors.gravityArcher,
                    Behaviors.bodyImpulseResponse,
                    Behaviors.bodyCollisionDetection,
                    Behaviors.sweepPrune
                );

                _updateBehaviors( this.behaviors, this.body );

                this.walk = function() {
                    if ( !this.model.isDrawing.get() ) {
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
                    if ( !this.model.isDrawing.get()) {
                        this.stop();
                        var quiver = this.model.quiver.get();
                        if ( !quiver.isEmpty() ) {
                            quiver.pick();
                            this.model.isDrawing.set( true );
                        }
                    }
                };

                this.releaseArrow = function() {
                    if ( this.model.isDrawing) {
                        // TODO throw arrow from the position of the archer
                        this.model.isDrawing.set( false );
                    }
                };

                sandbox.on( 'model:archer:isDrawing', function( value ){
                    var aimVector = this.model.aimVector.get();
                    
                    
                    if ( aimVector.y === 0 ) {
                        _replaceView( this, {
                            type: 'sprite',
                            textureIds: [ 'archer_green_drawing_front' ]
                        } );
                    } else if ( aimVector.y < 0 ) {
                        _replaceView( this, {
                            type: 'sprite',
                            textureIds: [ 'archer_green_drawing_up' ]
                        } );
                    }
                }, this );

                sandbox.on( 'body:archer:isFalling', function( value ){
                    if ( value.new ) {
                        _replaceView( this, {
                            type: 'sprite',
                            textureIds: [ 'archer_green_fall_1' ]
                        } );
                    } else {
                        _replaceView( this, {
                            type: 'sprite',
                            textureIds: [ 'archer_green_no_drawing' ]
                        } );
                    }
                }, this );

                sandbox.on( 'model:archer:aimVector', function( value ){
                    var way = value.new.x;
                    this.view.scale.x = way;
                }, this );

                sandbox.on( 'body:archer:isJumping', function( value ){
                    if ( value.new ) {
                        _replaceView( this, {
                            type: 'sprite',
                            textureIds: [ 'archer_green_jump_1' ]
                        } );
                    } else {
                        _replaceView( this, {
                            type: 'sprite',
                            textureIds: [ 'archer_green_no_drawing' ]
                        } );
                    }
                }, this );           
            }
        },
        items: {
            Arrow: function( options ) {
                var width = 43;
                var height = 17;

                var centroidX = options.x + ( width / 2 );
                var centroidY = options.y + ( height / 2 );
                var halfHeigth = height / 2;
                var halfWidth = width / 2;

                var params = {
                    vertices: [
                        { x: centroidX - halfWidth, y: centroidY - halfHeigth},
                        { x: centroidX + halfWidth, y: centroidY - halfHeigth},
                        { x: centroidX + halfWidth, y: centroidY + halfHeigth},
                        { x: centroidX - halfWidth, y: centroidY + halfHeigth}
                    ]
                }
                params = $.extend({}, params, options);

                this.body = new Bodies.Arrow( params );

                this.body.view = new Views.items.Arrow();

                this.view = this.body.view;

                this.behaviors = [];

                this.behaviors.push(
                    // Behaviors.borderWarp,
                    Behaviors.gravityArrow,
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
            }
        },
        maps: {
            TwilightSpire: function() {
                this.bodies = [];
                var blockSize = 30;
                
                this.model = new Models.maps.TwilightSpire();

                this.model.parts.forEach( _.bind( function( part ){
                    var centroidX = ( part.x * 30 ) + ( part.width * blockSize / 2 );
                    var centroidY = ( part.y * 30 ) + ( part.height * blockSize / 2 );
                    var halfHeigth = part.height * blockSize / 2;
                    var halfWidth = part.width * blockSize / 2;
                    var params = {
                        x: centroidX,
                        y: centroidY,
                        vertices: [
                            { x: centroidX - halfWidth, y: centroidY - halfHeigth},
                            { x: centroidX + halfWidth, y: centroidY - halfHeigth},
                            { x: centroidX + halfWidth, y: centroidY + halfHeigth},
                            { x: centroidX - halfWidth, y: centroidY + halfHeigth}
                        ]
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
        }
    };

    return Elements;
});
