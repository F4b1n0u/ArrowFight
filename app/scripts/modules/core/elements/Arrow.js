(define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Physics = require('physicsjs');
  var Behaviors = require('behaviors');
  var arrowView = require('arrowView');
  var Field = require('field');
  var Events = require('minivents');
  var Bodies = require('bodies');
  var utils = require('utils');

  /**
   * [Arrow Constuctor to build an arrow]
   * @param {Array} options wrapper tu customize the Element, mainly use to set the coordinate of the body
   */
  var Arrow = function (options) {
    this.sandbox = new Events();

    var params = {
      width: 43,
      height: 17,

      collected: new Field(null, this.sandbox, 'body:arrow:collected'),
      isPlant: new Field(null, this.sandbox, 'model:arrow:isPlant'),

      isMortal: new Field(false, this.sandbox, 'model:arrow:isMortal')
    };
    params = $.extend({}, params, options);
    this.body = new Bodies.Arrow(params);

    this.body.view = arrowView();

    this.view = this.body.view;

    this.behaviors = [];

    this.behaviors.push(
      // Behaviors.borderWarp,
      // Behaviors.gravityArrow,
      Behaviors.mortalDetection,
      Behaviors.mortalDetection,
      Behaviors.hitDetection,
      Behaviors.gravity,
      Behaviors.bodyImpulseResponse,
      Behaviors.bodyCollisionDetection,
      Behaviors.sweepPrune
    );

    utils.updateBehaviors(this.behaviors, this.body);

    /**
     * [launch tu launch the arrow]
     * @param  {int} strength define the strength use to throw the arrow
     * @return {ne return}
     */
    this.launch = function (strength) {
      var launch = new Physics.vector(strength, 0);
      launch.rotate(this.body.state.angular.pos);
      this.body.applyForce(launch, this.body.movedCentroid());
    };

    this.sandbox.on('body:arrow:collected', function () {
      utils.remove(this);
    }, this);


    this.sandbox.on('body:arrow:isPlant', function () {
      // TODO stop the arrow
    }, this);
  };

  return Arrow;
}));
