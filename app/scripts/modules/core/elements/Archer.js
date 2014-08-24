(define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Physics = require('physicsjs');
  var Behaviors = require('behaviors');
  var ArcherModel = require('archerModels');
  var archerView = require('archerView');
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
  var Archer = function (team, options, sandbox) {
    this.team = team;
    this.sandbox = new Events();
    this.model = new ArcherModel(this.sandbox);

    var width = 52;
    var height = 57;

    var params = {
      height: height,
      width: width,

      collect: new Field(null, this.sandbox, 'body:archer:collect'),
      isHit: new Field(null, this.sandbox, 'body:archer:isHit'),

      isInTheAir: new Field(false, this.sandbox, 'body:archer:isInTheAir'),
      isFalling: new Field(false, this.sandbox, 'body:archer:isFalling'),
      isJumping: new Field(false, this.sandbox, 'body:archer:isJumping'),
      isDrawing: new Field(false, this.sandbox, 'body:archer:isDrawing')
    };
    params = $.extend({}, params, options);
    this.body = new Bodies.Archer(params);

    this.body.view = archerView(this.team);

    this.view = this.body.view;

    this.behaviors = [];
    this.behaviors.push(
      Behaviors.touchDetection,
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
        var direction = this.model.aimVector.get()
          .x;
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
     * [stop to stop the horizontal movement]
     * @return {no return}
     */
    this.stop = function () {
      if (!this.body.isInTheAir.get()) {
        this.body.state.vel.x = 0;
      }
    };

    /**
     * [draw to draw the bow]
     * @return {no return}
     */
    this.draw = function () {
      if (!this.body.isDrawing.get()) {
        this.stop();
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

    this.sandbox.on('body:archer:isFalling', function (value) {
      if (value.new) {
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_fall_1']
        });
      } else {
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_no_drawing']
        });
      }
    }, this);

    this.sandbox.on('body:archer:isDrawing', function (value) {
      if (value.new) {
        this.stop();
        this.sandbox.emit('model:archer:aimVector', {
          old: this.model.aimVector.get(),
          new: this.model.aimVector.get()
        });
      } else {
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_no_drawing']
        });
      }
    }, this);

    this.sandbox.on('model:archer:aimVector', function (value) {
      if (this.body.isDrawing.get()) {
        var aimVector = this.model.aimVector.get();

        if (aimVector.y === 0) {
          utils.changeView(this, {
            type: 'sprite',
            textureIds: ['archer_' + this.team + '_drawing_front']
          });
        } else if (aimVector.y < 0) {
          if (aimVector.x === 0) {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_up']
            });
          } else {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_up_diag']
            });
          }
        } else if (aimVector.y > 0) {
          if (aimVector.x === 0) {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_down']
            });
          } else {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_down_diag']
            });
          }
        }
      } else {
        this.move();
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_no_drawing']
        });
      }
      if (value.new.x !== 0) {
        this.view.scale.x = value.new.x;
      }
    }, this);

    this.sandbox.on('body:archer:isJumping', function (value) {
      if (value.new) {
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_jump_1']
        });
      }
    }, this);

    this.sandbox.on('body:archer:collect', function () {
      this.model.quiver.collect();
    }, this);

    this.sandbox.on('body:archer:isHit', function () {
      utils.removeElement(this);
      sandbox.emit('round:finish:looser', this);
    }, this);
  };

  return Archer;
}));
