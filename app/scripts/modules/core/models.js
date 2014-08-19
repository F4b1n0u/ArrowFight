'use strict';

define(function (require) {
    var Physics = require("physicsjs");
    var Field = require("scripts/modules/core/field");

    var models = {
    	archers: {
            Archer: function( sandbox ) {
                this.score = new Field( 0 );
                this.quiver = new Field( {
                    amount: 3,
                    isEmpty: function() {
                        this.amount > 0;
                    },
                    pick: function() {
                        if ( !this.isEmpty() ) {
                            this.amount --;
                        }
                    }
                } );
                this.isDrawing = new Field( false, sandbox, 'model:archer:isDrawing');
                this.aimVector = new Field( Physics.vector( 0, 0 ), sandbox, 'model:archer:aimVector' );
            }
        },
    	maps: {
            TwilightSpire: function() {
                this.parts = [
                    {x: 0,  y: 1, width: 2, height: 2},
                    {x: 2,  y: 1, width: 2, height: 1},
                    {x: 0,  y: 0, width: 32, height: 1},
                    {x: 6,  y: 1, width: 7, height: 1},
                    {x: 9, y: 2, width: 2, height: 1},
                    {x: 21, y: 2, width: 2, height: 1},
                    {x: 19, y: 1, width: 7, height: 1},
                    {x: 28, y: 1, width: 2, height: 1},
                    {x: 30, y: 1, width: 2, height: 2},
                    {x: 31, y: 3, width: 1, height: 8},
                    {x: 30, y: 6, width: 1, height: 5},
                    {x: 29, y: 6, width: 1, height: 2},
                    {x: 28, y: 6,  width: 1, height: 1},
                    {x: 31, y: 13, width: 1, height: 6},
                    {x: 30, y: 13, width: 1, height: 1},
                    {x: 29, y: 19, width: 3, height: 4},
                    {x: 21, y: 22, width: 8, height: 1},
                    {x: 21, y: 21, width: 2, height: 3},
                    {x: 9, y: 21, width: 2, height: 3},
                    {x: 3,  y: 22, width: 8, height: 1},
                    {x: 0,  y: 19, width: 3, height: 4},
                    {x: 0,  y: 13, width: 1, height: 6},
                    {x: 1,  y: 13, width: 1, height: 1},
                    {x: 3,  y: 6, width: 1, height: 1},
                    {x: 2,  y: 6, width: 1, height: 2},
                    {x: 1,  y: 6, width: 1, height: 5},
                    {x: 0,  y: 3, width: 1, height: 8},
                    {x: 0, y: 23, width: 32, height: 1},
                    {x: 6, y: 11, width: 2, height: 2},
                    {x: 6, y: 13, width: 8, height: 2},
                    {x: 4, y: 15, width: 6, height: 1},
                    {x: 5, y: 16, width: 3, height: 1},
                    {x: 12, y: 8, width: 2, height: 5},
                    {x: 13, y: 15, width: 1, height: 1},
                    {x: 24, y: 11, width: 2, height: 2},
                    {x: 18, y: 13, width: 8, height: 2},
                    {x: 22, y: 15, width: 6, height: 1},
                    {x: 24, y: 16, width: 3, height: 1},
                    {x: 18, y: 8, width: 2, height: 5},
                    {x: 18, y: 15, width: 1, height: 1},
                ];
            }
        }
    }

    return  models;
} );