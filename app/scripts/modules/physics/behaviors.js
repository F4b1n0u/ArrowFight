'use strict';

define(function (require) {
    var $ = require('jquery');
    var Physics = require('physicsjs');
    var Renderers = require("scripts/modules/physics/renderers");
    var Bounds = require("scripts/modules/physics/bounds");

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
                        var newX = (collision.norm.x * 70) + (Renderers.pixiRenderer.el.width / 2 ) * ( 1 - collision.norm.x );
                        elementMoving.state.pos.x = newX;
                    }

                    if (collision.norm.y) {
                        var newY = (collision.norm.y * 70) + (Renderers.pixiRenderer.el.width / 2 ) * ( 1 - collision.norm.y );
                        elementMoving.state.pos.y = newY;
                    }
                });
            }
        }
    });

    Physics.behavior( 'arrow-gravity', 'constant-acceleration', function( parent ) {
        return {
            init: function( options ) {
                var defaults = {};
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
            behave: function( data ) {
                data.bodies.forEach( _.bind( function( body ){
                    body.applyForce( this._acc, body.movedCentroid());

                    // if ( body.state.vel.norm() != 0 ) {
                    //     body.state.angular.vel -= body.state.angular.vel * body.state.vel.norm();
                    // }
                    //body.applyForce( plumeSupportForce, body.tailCentroid());

                    // if ( body.state.vel.norm() > 1 ) {
                    //     body.state.vel.normalize();
                    // }
                }, this ) );
            }
        }
    });

    var Behaviors = {
        borderWarp:             Physics.behavior('border-warp-behaviour'),
        gravity:                Physics.behavior('constant-acceleration', { acc: { x : 0, y: 0.003 }}),
        arrowGravity:           Physics.behavior('arrow-gravity', { acc: { x : 0, y: 0.0004 }}),
        bodyImpulseResponse:    Physics.behavior('body-impulse-response'),
        bodyCollisionDetection: Physics.behavior('body-collision-detection'),
        sweepPrune:             Physics.behavior('sweep-prune')
    };

    return Behaviors;
});
