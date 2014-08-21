define(function (require) {
    PIXI =          require( 'pixi' );
    var Physics =   require( 'physicsjs' );

    var Renderers = {
        pixi: Physics.renderer( 'pixi', {
            el: 'viewport',
            width: 960,
            height: 720,
            meta: true, 
            styles: {
                'convex-polygon' : {
                    lineWidth: 0,
                    alpha: 0
                }
            }
        } )
    }

    return Renderers;
});
