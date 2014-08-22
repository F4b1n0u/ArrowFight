define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Physics = require('physicsjs');

  var defaults = {
    x: 0,
    y: 0,
    angle: 0,
    vx: 0,
    vy: 0
  };

  Physics.body('archer', 'convex-polygon', function (parent) {
    return {
      init: function (options) {
        var halfHeigth = options.height / 2;
        var halfWidth = options.width / 2;
        var centroidX = options.x + halfWidth;
        var centroidY = options.y + halfHeigth;
        var archerDefaults = {
          restitution: 0,
          cof: 0,
          mass: 10,
          treatment: 'dynamic',
          vertices: [{
            x: centroidX - halfWidth,
            y: centroidY - halfHeigth
          }, {
            x: centroidX + halfWidth,
            y: centroidY - halfHeigth
          }, {
            x: centroidX + halfWidth,
            y: centroidY + halfHeigth
          }, {
            x: centroidX - halfWidth,
            y: centroidY + halfHeigth
          }]
        };

        parent.init.call(this, $.extend({}, defaults, archerDefaults, options));
      }
    };
  });

  Physics.body('arrow', 'convex-polygon', function (parent) {
    return {
      init: function (options) {
        var halfHeigth = options.height / 2;
        var halfWidth = options.width / 2;
        var centroidX = options.x + halfWidth;
        var centroidY = options.y + halfHeigth;
        var arrowDefaults = {
          restitution: 0,
          cof: 1,
          mass: 1,
          treatment: 'dynamic',
          vertices: [{
            x: centroidX - halfWidth,
            y: centroidY - halfHeigth
          }, {
            x: centroidX + halfWidth,
            y: centroidY - halfHeigth
          }, {
            x: centroidX + halfWidth,
            y: centroidY + halfHeigth
          }, {
            x: centroidX - halfWidth,
            y: centroidY + halfHeigth
          }]
        };
        parent.init.call(this, $.extend({}, defaults, arrowDefaults, options));
      },
      movedCentroid: function () {
        return new Physics.vector(this.width / 2, 0).rotate(-this.state.angular.pos);
      }
    };
  });

  Physics.body('map-part', 'convex-polygon', function (parent) {
    return {
      init: function (options) {
        var unitBlockSize = options.unitBlockSize;

        var halfHeigth = options.height * unitBlockSize / 2;
        var halfWidth = options.width * unitBlockSize / 2;

        var centroidX = (options.x * unitBlockSize) + halfWidth;
        var centroidY = (options.y * unitBlockSize) + halfHeigth;

        var params = {
          restitution: 0.3,
          cof: 1,
          mass: 1,
          treatment: 'static',
          x: centroidX,
          y: centroidY,
          vertices: [{
            x: centroidX - halfWidth,
            y: centroidY - halfHeigth
          }, {
            x: centroidX + halfWidth,
            y: centroidY - halfHeigth
          }, {
            x: centroidX + halfWidth,
            y: centroidY + halfHeigth
          }, {
            x: centroidX - halfWidth,
            y: centroidY + halfHeigth
          }]
        };
        parent.init.call(this, $.extend({}, params));
      },
    };
  });

  var Bodies = {
    Archer: function (params) {
      return Physics.body('archer', params);
    },
    Arrow: function (params) {
      return Physics.body('arrow', params);
    },
    MapPart: function (params) {
      return Physics.body('map-part', params);
    }
  };

  return Bodies;
});
