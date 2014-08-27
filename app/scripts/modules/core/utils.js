(define(function (require) {
  'use strict';

  var PIXI = require('pixi');
  var renderers = require('renderers');

  /**
   * [utils object that will contains utils methods]
   * @type {Object}
   */
  var utils = {
    /**
     * [add add an element to the game (body and view in the world)]
     * @param {[Element} element
     */
    addElement: function (world, element) {
      if (element.hasOwnProperty('body')) {
        world.add(element.body);
      }
      if (element.hasOwnProperty('bodies')) {
        world.add(element.bodies);
      }
      if (element.hasOwnProperty('behaviors')) {
        world.add(element.behaviors);
      }
      if (element.view) {
        renderers.pixi.stage.addChild(element.view.sprite);
      }
    },

    /**
     * [remove remove an element from the game (body and view from the world)]
     * @param  {Element} element
     * @return {no return}
     */
    removeElement: function (element) {
      element.body._world.remove(element.body);
      renderers.pixi.stage.removeChild(element.view.sprite);
    },

    /**
     * [_updateBehaviors add or remove body from targets of behaviors]
     * @param  {Array} behaviors
     * @param  {Body} target
     * @return {no return}
     */
    updateBehaviors: function (behaviors, target, add) {
      add = (add === undefined) ? true : add;
      behaviors.forEach(function (behavior) {
        var targets = (behavior._targets instanceof Array) ? behavior._targets : [];
        if (add) {
          targets.push(this);
        } else {
          var index = targets.indexOf(target);
          if (index > -1) {
            targets.splice(index, 1);
          }
        }
        behavior.applyTo(targets);
      }, target);
    },

    /**
     * [_changeView change the view of an element]
     * @param  {Element} elementTarget
     * @param  {Array} params
     *  {
     *    textureIds: {Array} ids of the Textures loaded in the TextureCache of PIXI
     *    type: 'sprite' or 'movieclip'
     *    animationSpeed: speed of the animation (usefull only in movieclip only)
     *  }
     *
     * @return {no return}
     */
    changeView: function (elementTarget, params) {
      var oldSprite = elementTarget.view.sprite;
      var newSprite = null;
      switch (params.type) {
      case 'sprite':
        if (oldSprite instanceof PIXI.Sprite) {
          var texture = PIXI.Texture.fromFrame(params.textureIds[0]);
          oldSprite.setTexture(texture);
          if (params.anchor) {
            oldSprite.anchor = params.anchor;
          }
        } else if (oldSprite instanceof PIXI.MovieClip) {
          oldSprite.stop();
          newSprite = PIXI.Sprite.fromFrame(params.textureIds[0]);

          elementTarget.view.sprite = newSprite;

          renderers.pixi.stage.removeChild(oldSprite);
          renderers.pixi.stage.awddChild(newSprite);
        }
        break;
        // case 'movieclip':
        //   if (oldView instanceof PIXI.MovieClip) {
        //     oldView.stop();
        //     oldView.setTextures(params.textureIds[0]);
        //   } else if (elementTarget.view instanceof PIXI.Sprite) {
        //     newView = PIXI.MovieClip(params.textureIds[0]);

        //     elementTarget.view = newView;
        //     renderers.pixi.stage.removeChild(oldView);
        //     renderers.pixi.stage.addChild(newView);
        //   }
        //   elementTarget.view.animationSpeed = params.animationSpeed;
        //   elementTarget.view.play();
        //   break;
      }
    }
  };

  return utils;
}));
