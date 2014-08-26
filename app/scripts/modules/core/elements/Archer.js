(define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Physics = require('physicsjs');
  var Behaviors = require('behaviors');
  var ArcherModel = require('archerModels');
  var ArcherView = require('archerView');
  var Field = require('field');
  var Events = require('minivents');
  var Bodies = require('bodies');
  var utils = require('utils');

  /**
   * [Archer Constuctor to build an Archer]
   * @param {string} team could be 'red' or 'green'
   * @param {Array} options wrapper to customise the archer, mainly use to set the coordinate of the body
   * @param {Event} sandbox events container
   */
  var Archer = function (team, sandbox, options) {
    this.team = team;
    this.sandbox = new Events();
    this.model = new ArcherModel(this.sandbox);

    var width = 52;
    var height = 57;

    var params = {
      height: height,
      width: width,

      collect: new Field(null, this.sandbox, 'archer:collect'),
      isHit: new Field(null, this.sandbox, 'archer:isHit'),

      isInTheAir: new Field(false, this.sandbox, 'archer:isInTheAir'),
      isFalling: new Field(false, this.sandbox, 'archer:isFalling'),
      isJumping: new Field(false, this.sandbox, 'archer:isJumping'),
      isDrawing: new Field(false, this.sandbox, 'archer:isDrawing'),
      isWalking: new Field(false, this.sandbox, 'archer:isWalking'),
      isClinging: new Field(false, this.sandbox, 'archer:isClinging'),

      aimVector: new Field(Physics.vector(0, 0), this.sandbox, 'archer:aimVector'),
      mainDirection: new Field(Physics.vector(1, 0), this.sandbox, 'archer:mainDirection')
    };
    params = $.extend({}, params, options);
    this.body = new Bodies.Archer(params);

    this.view = new ArcherView(this);
    this.body.view = this.view.sprite;

    this.behaviors = [];
    this.behaviors.push(
      Behaviors.walkingMovement,
      Behaviors.fallingJumpingDetection,
      Behaviors.collectDetection,
      Behaviors.hitDetection,
      Behaviors.gravityArcher,
      Behaviors.bodyImpulseResponse,
      Behaviors.bodyCollisionDetection,
      Behaviors.sweepPrune
    );

    utils.updateBehaviors(this.behaviors, this.body);

    /**
     * [move ask to the body to move in function of the direction pointed but the aimVector]
     * @return {no return}
     */
    this.move = function () {
      if (!this.body.isDrawing.get()) {
        var direction = this.body.aimVector.get().x;
        this.body.state.vel.x = 0.3 * direction;
      }
    };

    /**
     * [jump to jump]
     * @return {no return}
     */
    this.jump = function () {
      if (!this.body.isInTheAir.get()) {
        var move = new Physics.vector(0, -2.5);
        this.body.applyForce(move);
        this.body.isInTheAir.set(true);
      }
    };

    /**
     * [draw to draw the bow]
     * @return {no return}
     */
    this.draw = function () {
      if (!this.body.isDrawing.get()) {
        this.body.isWalking.set(false);
        if (this.model.quiver.pick()) {
          this.body.isDrawing.set(true);
        }
      }
    };

    /**
     * [releaseArrow to release an arrow after bowing]
     * @return {no return}
     */
    this.releaseArrow = function () {
      if (this.body.isDrawing) {
        window.setTimeout(function () {
          this.body.isDrawing.set(false);
        }.bind(this), 50);
      }
    };

    /**
     * [reset to reset the quiver and the location of the archer]
     * @param  {[type]} coordinate
     * @return {[type]}
     */
    this.reset = function (coordinate) {
      this.body.state.pos.x = coordinate.x;
      this.body.state.pos.y = coordinate.y;
      this.model.quiver.full();
    };

    this.sandbox.on('archer:collect', function () {
      this.model.quiver.collect();
    }, this);

    this.sandbox.on('archer:isHit', function () {
      utils.removeElement(this);
      sandbox.emit('round:finish:looser', this);
    }, this);
  };

  return Archer;
}));
