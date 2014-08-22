define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Renderers = require('renderers');

  /**
   * [archer function to get a view compatible with pixi of an archer]
   * @param  {[type]} options wrapper to customise the object
   * @return {[type]}
   */
  var archer = function (options) {
    var defaults = {
      texture: './images/blank.png',
      anchor: {
        x: 0.5,
        y: 0.5
      }
    };
    var params = $.extend({}, defaults, options);

    var view = Renderers.pixi.createDisplay('sprite', params);

    return view;
  };

  return archer;
});
