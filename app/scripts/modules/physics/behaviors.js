'use strict';

define(function (require) {
    var $ =         require( 'jquery' );
    var Physics =   require( 'physicsjs' );
    var Renderers = require( 'renderers' );
    var Bounds =    require( 'bounds' );
    
    Physics.behavior('border-warp-behaviour', 'edge-collision-detection', function ( parent ) {
        return {
            init: function ( options ) {
                var defaults = {
                    aabb: Bounds.frame,
                    channel: 'border-collisions:detected',
                    restitution: 0.99,
                    cof: 1
                };

              parent.init.call( this, $.extend( {}, defaults, options ) );
            },

            connect: function (world){
                world.on('integrate:velocities', this.checkAll, this);
                world.on('border-collisions:detected', this.checkCollisions, this);
            },

            disconnect: function (world){
                world.off('integrate:velocities', this.checkAll);
                world.off('border-collisions:detected', this.checkCollisions);
            },

            checkCollisions: function (data) {
                data.collisions.forEach(function(collision) {
                    var elementMoving = (collision.bodyA.view) ? collision.bodyA : collision.bodyB;

                    if (collision.norm.x) {
                        var newX = (collision.norm.x * 70) + (Renderers.pixi.el.width / 2 ) * ( 1 - collision.norm.x );
                        elementMoving.state.pos.x = newX;
                    }

                    if (collision.norm.y) {
                        var newY = (collision.norm.y * 70) + (Renderers.pixi.el.width / 2 ) * ( 1 - collision.norm.y );
                        elementMoving.state.pos.y = newY;
                    }
                });
            }
        }
    });

    Physics.behavior( 'limited-gravity', 'constant-acceleration', function ( parent ) {
        return {
            init: function( options ) {
                var defaults = {};
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
            behave: function( data ) {
                var maximumVelocity = 1;
                this.getTargets().forEach( function( body ){
                    if ( body.state.vel.norm() < maximumVelocity ) {
                        parent.behave.call( this, data );
                    }
                }, this );
            }
        }
    });

    Physics.behavior( 'gravity-arrow', 'limited-gravity', function ( parent ) {
        return {
            init: function( options ) {
                var defaults = {};
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
            behave: function( data ) {
                this.getTargets().forEach( function( body ){
                    var movedCentroid = body.movedCentroid();
                    body.applyForce( this._acc, body.movedCentroid());
                    // var tangent = new Physics.vector( body.state.old.pos.x - movedCentroid.x, body.state.old.pos.y - movedCentroid.y );
                    // if ( tangent.norm() ) {
                    //     body.state.angular.pos = tangent.angle();
                    // }
                }, this );
            }
        }
    });

    Physics.behavior( 'gravity-archer', 'limited-gravity', function ( parent ) {
        return {
            behave: function( data ){
                parent.behave.call( this, data );
                this.getTargets().forEach( function( body ) {
                    body.state.angular.pos = 0;
                } );
            }
        }
    });

    Physics.behavior( 'touch-detection', 'body-collision-detection', function ( parent ) {
        return {
            init: function( options ) {
                var defaults = {};
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
            
            connect: function( world ){
                world.on( 'collisions:detected', this.checkGroundCollision, this );
            },
    
            disconnect: function( world ) {
                world.off( 'collisions:detected', this.checkGroundCollision );
            },

            checkGroundCollision: function( data ){
                var body = null;
                data.collisions.forEach( function( collision ) {
                    if ( collision.bodyA.name === 'archer' || collision.bodyB.name === 'archer' ) {
                        if ( collision.bodyA.name === 'archer' ) {
                            body = collision.bodyA;
                        } else {
                            body = collision.bodyB;
                        }
                        body.isInTheAir.set( false );
                    }
                } );
            }
        }
    });

    Physics.behavior( 'falling-jumping-detection', function ( parent ) {
        return {
            init: function( options ) {
                var defaults = {};
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },

            behave: function( data ){
                this.getTargets().forEach( function( body ) {
                    var threshold = 0.1;
                    if ( body.state.vel.y > 0 ) {
                        if ( body.state.vel.y > threshold ) {
                            body.isFalling.set( true );
                        } else {
                            body.isFalling.set( false );
                        }
                    } else {
                        if ( body.state.vel.y < - threshold ) {
                            body.isJumping.set( true );
                        } else {
                            body.isJumping.set( false );
                        }
                    } 
                } );
            }
        }
    });

    var Behaviors = {
        borderWarp: Physics.behavior( 'border-warp-behaviour'),
        gravityArcher: Physics.behavior( 'gravity-archer', { acc: { x : 0, y: 0.002 } } ),
        gravityArrow: Physics.behavior( 'gravity-arrow', { acc: { x : 0, y: 0.002 } } ),
        touchDetection: Physics.behavior( 'touch-detection' ),
        fallingJumpingDetection: Physics.behavior( 'falling-jumping-detection' ),
        bodyImpulseResponse:  Physics.behavior( 'body-impulse-response' ),
        bodyCollisionDetection: Physics.behavior( 'body-collision-detection' ),
        sweepPrune: Physics.behavior('sweep-prune')
    };

    return Behaviors;
});
