define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Renderers = require('renderers');

  /**
   * [archer function to get a view compatible with pixi of the TwilightSpire map]
   * @param  {[type]} options wrapper to customise the object
   * @return {[type]}
   */
  var TwilightSpire = function (options) {
    var defaults = {
      texture: './images/maps/twilightSpire.png',
      anchor: {
        x: 0,
        y: 0
      }
    };
    var params = $.extend({}, defaults, options);

    this.sprite = Renderers.pixi.createDisplay('sprite', params);
  };

  return TwilightSpire;
});
