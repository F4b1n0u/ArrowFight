'use strict';

define(function (require) {
    var spriteSheetLoader = new PIXI.SpriteSheetLoader( 'images/archers/archer_green.json', function() {
        this.load();
    }, this );
});
