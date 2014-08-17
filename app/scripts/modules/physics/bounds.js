'use strict';

define(function (require) {
    var Physics = require('physicsjs');
    var Renderers = require("scripts/modules/core/renderers");

    var x = 0;
    var y = 0;
    var width = width | Renderers.pixi.el.width;
    var height = height | Renderers.pixi.el.height;

    var Bounds = {
        frame: Physics.aabb(x, y, width, height)
    };

    return Bounds;
});
