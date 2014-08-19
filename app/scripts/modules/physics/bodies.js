'use strict';

define( function ( require ) {
    var Physics =  require( 'physicsjs' );

    Physics.body( 'archer', 'convex-polygon', function ( parent ) {
        return {
            init: function (options) {
                var defaults = {
                    restitution: 0,
                    cof: 0,
                    mass: 10, 
                    treatment: 'dynamic'
                };
                parent.init.call( this, $.extend( {}, defaults, options ) );
            }
        }
    });

    Physics.body( 'arrow', 'convex-polygon', function ( parent ) {
        return {
            init: function (options) {
                var defaults = {
                    restitution: 1,
                    cof: 1,
                    mass: 1,
                    treatment: 'dynamic'
                };
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
            movedCentroid: function() {
                return new Physics.vector( this.width / 2, 0 ).rotate( - this.state.angular.pos );
            }
        }
    });

    Physics.body( 'map-part', 'convex-polygon', function ( parent ) {
        return {
            init: function ( options ) {
                var defaults = {
                    restitution: 0,
                    cof: 2,
                    mass: 1,
                    treatment: 'static'
                };
                parent.init.call( this, $.extend( {}, defaults, options ) );
            },
        }
    });

    var Bodies = {
        Archer: function( params ) { return Physics.body( 'archer', params) },
        Arrow: function( params ) { return Physics.body( 'arrow', params ) },
        MapPart: function( params ) { return Physics.body( 'map-part', params ) }
    };

    return Bodies;
});


