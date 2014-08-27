(define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Physics = require('physicsjs');
  var Behaviors = require('behaviors');
  var ArrowView = require('arrowView');
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

      collected: new Field(null, this.sandbox, 'arrow:collected'),
      isPlant: new Field(null, this.sandbox, 'arrow:isPlant'),

      isMortal: new Field(false, this.sandbox, 'arrow:isMortal')
    };
    params = $.extend({}, params, options);
    this.body = new Bodies.Arrow(params);

    this.view = new ArrowView();
    this.body.view = this.view.sprite;

    this.behaviors = [];
    this.behaviors.push(
      Behaviors.plantDetection,
      Behaviors.mortalDetection,
      Behaviors.hitDetection,
      Behaviors.gravityArrow,
      Behaviors.airBrake,
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

    this.sandbox.on('arrow:collected', function () {
      utils.removeElement(this);
    }, this);

    this.sandbox.on('arrow:isPlant', function () {
      utils.updateBehaviors([
        Behaviors.hitDetection,
        Behaviors.airBrake
      ], this.body, false);
    }, this);
  };

  return Arrow;
}));
