define(function (require) {
  'use strict';

  var $ = require('jquery');
  var renderers = require('renderers');

  /**
   * [archer function to get a view compatible with pixi of an arrow]
   * @param  {[type]} options wrapper to customise the object
   * @return {[type]}
   */
  var arrow = function (options) {
    var defaults = {
      texture: './images/items/arrow.png',
      anchor: {
        x: 0.5,
        y: 0.5
      }
    };

    var params = $.extend({}, defaults, options);

    var view = renderers.pixi.createDisplay('sprite', params);

    return view;
  };

  return arrow;
});
