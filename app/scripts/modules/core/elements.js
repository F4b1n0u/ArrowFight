
'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Views = require("scripts/modules/physics/views");
    var Behaviors = require("scripts/modules/physics/behaviors");
    var Renderers = require("scripts/modules/core/renderers");
    var Models = require("scripts/modules/core/models");
    require("scripts/modules/physics/bodies");

    var defaults = {
        x: 0,
        y: 0,
        angle: 0,
        vx: 0,
        vy: 0
    }

    var Elements = {
        archers: {
            ArcherA: function( options ) {
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
                params = $.extend({}, params, options);

                this.model = new Models.archers.ArcherA();

                this.body = Physics.body( 'archer', params );
                this.body.view = new Views.archers.ArcherA();

                this.view = this.body.view;

                this.behaviors = [];

                this.behaviors.push(
                    Behaviors.gravity,
                    Behaviors.bodyImpulseResponse,
                    Behaviors.bodyCollisionDetection,
                    Behaviors.sweepPrune
                );

                this.walk = function( direction ) {
                    var strength = 0.2;
                    if( direction === 'left' ) {
                        strength *= -1;
                    }
                    var launch = new Physics.vector( strength, 0 );
                    this.body.applyForce( launch );
                };
                this.stop = function(  ) {

                };
                this.jump = function( level ) {
                    var strength = 2 * level;
                    var launch = new Physics.vector( 0 , - strength );
                    this.body.applyForce( launch );
                };
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
                    ],
                    movedCentroid: function() {
                        return new Physics.vector( + this.width / 2, 0 ).rotate( - this.state.angular.pos );
                    }
                }
                params = $.extend({}, params, options);

                this.body = Physics.body( 'arrow', params );
                this.body.view = new Views.items.Arrow();

                this.view = this.body.view;

                this.behaviors = [];

                this.behaviors.push(
                    //Behaviors.borderWarp,
                    Behaviors.gravity,
                    Behaviors.bodyImpulseResponse,
                    Behaviors.bodyCollisionDetection,
                    Behaviors.sweepPrune
                );

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

                this.bodies.forEach( _.bind( function( body ) {
                    this.behaviors.push(
                        Behaviors.bodyImpulseResponse,
                        Behaviors.bodyCollisionDetection,
                        Behaviors.sweepPrune
                    );
                }, this ) );
            }
        }
    };

    return Elements;
});
