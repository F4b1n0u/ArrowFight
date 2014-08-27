define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Renderers = require('renderers');
  var utils = require('utils');

  var defaults = {
    texture: './images/blank.png',
    anchor: {
      x: 0.5,
      y: 0.5
    }
  };

  /**
   * [constructor of the archer view to get a view compatible with pixi of an archer]
   * @param {Element}  team    [element of archer]
   * @param {Array}   options [wrapper of option]
   */
  var Archer = function (element, options) {
    var params = $.extend({}, defaults, options);
    this.sprite = Renderers.pixi.createDisplay('sprite', params);

    element.sandbox.on('archer:isFalling', function (value) {
      if (!this.body.isDrawing.get()) {
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
      }
    }, element);

    element.sandbox.on('archer:isDrawing', function (value) {
      if (value.new) {
        this.body.isWalking.set(false);
        this.body.aimVector.trigger();
      } else {
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_no_drawing'],
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });
      }
    }, element);

    element.sandbox.on('archer:aimVector', function (value) {
      if (this.body.isDrawing.get()) {
        var aimVector = this.body.aimVector.get();

        if (aimVector.y === 0) {
          utils.changeView(this, {
            type: 'sprite',
            textureIds: ['archer_' + this.team + '_drawing_front'],
            anchor: {
              x: 0.23,
              y: 0.5
            }
          });
        } else if (aimVector.y < 0) {
          if (aimVector.x === 0) {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_up'],
              anchor: {
                x: 0.6,
                y: 0.75
              }
            });
          } else {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_up_diag'],
              anchor: {
                x: 0.3,
                y: 0.69
              }
            });
          }
        } else if (aimVector.y > 0) {
          if (aimVector.x === 0) {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_down'],
              anchor: {
                x: 0.5,
                y: 0.25
              }
            });
          } else {
            utils.changeView(this, {
              type: 'sprite',
              textureIds: ['archer_' + this.team + '_drawing_down_diag'],
              anchor: {
                x: 0.3,
                y: 0.3
              }
            });
          }
        }
      } else {
        this.body.isWalking.set(true);
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_no_drawing']
        });
      }
      if (value && value.new.x !== 0) {
        this.view.sprite.scale.x = value.new.x;
      }
    }, element);

    element.sandbox.on('archer:isJumping', function (value) {
      if (value.new) {
        if (!this.body.isDrawing.get()) {
          utils.changeView(this, {
            type: 'sprite',
            textureIds: ['archer_' + this.team + '_jump_1']
          });
        }
      }
    }, element);

    element.sandbox.on('archer:isClinging', function (value) {
      if (value.new) {
        utils.changeView(this, {
          type: 'sprite',
          textureIds: ['archer_' + this.team + '_cling']
        });
      }
    }, element);
  };

  return Archer;
});
