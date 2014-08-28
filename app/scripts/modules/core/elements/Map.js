(define(function (require) {
  'use strict';

  var Behaviors = require('behaviors');
  var TwilightSpireMapModels = require('twilightSpireMapModels');
  var TwilightSpireMapView = require('twilightSpireMapView');
  var Bodies = require('bodies');
  var utils = require('utils');

  /**
   * [Map Constuctor to build a Map]
   * @param {string} mapId id use for the map, exemple: "TwilightSpire"
   */
  var Map = function (mapId) {
    var unitBlockSize = 30;

    this.bodies = [];
    if (mapId === "TwilightSpire") {
      this.model = new TwilightSpireMapModels();
      this.view = new TwilightSpireMapView();
    }

    this.model.parts.forEach(function (part) {
      var params = {
        x: part.x,
        y: part.y,
        height: part.height,
        width: part.width,
        unitBlockSize: unitBlockSize
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

    this.getRespawnLocation = function (team) {
      return {
        x: this.model.respawns[team].x * unitBlockSize,
        y: this.model.respawns[team].y * unitBlockSize
      };
    };

  };

  return Map;
}));
