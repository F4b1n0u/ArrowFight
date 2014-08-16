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
                    lineWidth: 3,
                    alpha: 0.3
                }
            }
        } ),
        canvas: Physics.renderer( 'canvas', {
            el: 'viewport',
            width: 960,
            height: 720,
            styles: {
                'convex-polygon' : {
                    lineWidth: 3,
                    alpha: 0.3
                }
            }
        } )
    }

    return Renderers;
});
