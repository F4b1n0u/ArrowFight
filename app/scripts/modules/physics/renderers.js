define(function (require) {
    PIXI = require("pixi");
    var Physics = require("physicsjs");

    var Renderers = {
        pixi: Physics.renderer( 'pixi', {
            el: 'viewport',
            width: 960,
            height: 720,
            styles: {
                'convex-polygon' : {
                    lineWidth: 1,
                    alpha: 0.5,
                    strokeStyle: 'white',
                    angleIndicator: 'white',
                    fillStyle: 'red'
                }
            }
        } )
    }

    return Renderers;
});
