'use strict';

define(function (require) {
    var Physics = require('physicsjs');
    var Renderers = require("scripts/modules/physics/renderers");

    var x = 0;
    var y = 0;
    var width = width | Renderers.pixiRenderer.el.width;
    var height = height | Renderers.pixiRenderer.el.height;

    var Bounds = {
        frame: Physics.aabb(x, y, width, height)
    };

    return Bounds;
});
