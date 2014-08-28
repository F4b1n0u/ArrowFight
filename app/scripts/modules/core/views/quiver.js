define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Renderers = require('renderers');

  var defaults = {
    texture: './images/blank.png',
    anchor: {
      x: 0.5,
      y: 0.5
    }
  };

  /**
   * [constructor of the archer view to get a view compatible with pixi of an archer]
   * @param {Element}  team    [element of archer]
   * @param {Array}   options [wrapper of option]
   */
  var Quiver = function (element, options) {
    var params = $.extend({}, defaults, options);
    this.sprite = Renderers.pixi.createDisplay('sprite', params);

    params.texture = './images/ammunition.png';

    element.sandbox.on('quiver:amount', function (value) {
      this.sprite.children.forEach(function (child) {
        this.removeChild(child);
      }, this.sprite);

      var i, ammunition;
      for (i = 0; i < value.new; i += 1) {
        ammunition = Renderers.pixi.createDisplay('sprite', params);
        ammunition.y = -40;
        ammunition.x = -10 + (i * 10);
        this.sprite.addChild(ammunition);
      }
    }, this);
  };

  return Quiver;
});
