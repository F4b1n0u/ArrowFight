'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Behaviors = require("scripts/modules/physics/behaviors");
    var Models = require("scripts/modules/core/models");
    var Views = require("scripts/modules/core/views");
    require("scripts/modules/physics/bodies");

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

    var Elements = {
        archers: {
            Archer: function( team, options ) {
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
                    ]
                }
                params = $.extend( {}, params, options );

                this.model = new Models.archers.Archer();

                this.body = Physics.body( 'archer', params );
                this.body.view = new Views.archers.Archer( team, null );

                this.view = this.body.view;

                this.behaviors = [];

                this.behaviors.push(
                    // Behaviors.borderWarp,
                    Behaviors.gravityArcher,
                    Behaviors.bodyImpulseResponse,
                    Behaviors.bodyCollisionDetection,
                    Behaviors.sweepPrune
                );

                _updateBehaviors( this.behaviors, this.body );

                this.walk = function( direction ) {
                    var way = ( direction === 'right' ) ?  1 : -1;

                    this.body.state.vel.x = 0.2 * way;

                    this.view.scale.x = way;
                }.bind( this );

                this.jump = function() {
                    var move = new Physics.vector( 0, - 2.5 );
                    this.body.applyForce( move );
                }.bind( this );

                this.stop = function() {
                    this.body.state.vel.x = 0;
                }.bind( this );
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

                this.body = Physics.body( 'arrow', params );

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
                    this.bodies.push( Physics.body('map-part', {
                        x: centroidX,
                        y: centroidY,
                        vertices: [
                            { x: centroidX - halfWidth, y: centroidY - halfHeigth},
                            { x: centroidX + halfWidth, y: centroidY - halfHeigth},
                            { x: centroidX + halfWidth, y: centroidY + halfHeigth},
                            { x: centroidX - halfWidth, y: centroidY + halfHeigth}
                        ]
                    } ) )
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
