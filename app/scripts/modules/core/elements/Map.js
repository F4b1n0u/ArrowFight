(define(function (require) {
  'use strict';

  var Behaviors = require('behaviors');
  var TwilightSpireMapModels = require('twilightSpireMapModels');
  var twilightSpireMapView = require('twilightSpireMapView');
  var Bodies = require('bodies');
  var utils = require('utils');

  /**
   * [Map Constuctor to build a Map]
   * @param {string} mapId id use for the map, exemple: "TwilightSpire"
   */
  var Map = function (mapId) {
    this.bodies = [];
    if (mapId === "TwilightSpire") {
      this.model = new TwilightSpireMapModels();
      this.view = twilightSpireMapView();
    }

    this.model.parts.forEach(function (part) {
      var params = {
        x: part.x,
        y: part.y,
        height: part.height,
        width: part.width,
        unitBlockSize: 30
      };
      this.bodies.push(new Bodies.MapPart(params));
    }.bind(this));



    this.behaviors = [];
    this.behaviors.push(
      Behaviors.bodyImpulseResponse,
      Behaviors.bodyCollisionDetection,
      Behaviors.sweepPrune
    );

    this.bodies.forEach(function (body) {
      utils.updateBehaviors(this.behaviors, body);
    }, this);

  };

  return Map;
}));
