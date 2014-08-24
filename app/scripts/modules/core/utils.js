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
        renderers.pixi.stage.addChild(element.view);
      }
    },

    /**
     * [remove remove an element from the game (body and view from the world)]
     * @param  {Element} element
     * @return {no return}
     */
    removeElement: function (element) {
      element.body._world.remove(element.body);
      renderers.pixi.stage.removeChild(element.view);
    },

    /**
     * [_updateBehaviors add as arget a body to a behaviors]
     * @param  {Behabior} behaviors
     * @param  {Body} target
     * @return {no return}
     */
    updateBehaviors: function (behaviors, target) {
      behaviors.forEach(function (behavior) {
        var targets = (behavior._targets instanceof Array) ? behavior._targets : [];
        targets.push(this);
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
      var oldView = elementTarget.view;
      var newView = null;
      switch (params.type) {
      case 'sprite':
        if (elementTarget.view instanceof PIXI.Sprite) {
          var texture = PIXI.Texture.fromFrame(params.textureIds[0]);
          elementTarget.view.setTexture(texture);
          if (params.anchor) {
            elementTarget.view.anchor = params.anchor;
          }
        } else if (elementTarget.view instanceof PIXI.MovieClip) {
          newView = PIXI.Sprite.fromFrame(params.textureIds[0]);
          elementTarget.view.stop();

          elementTarget.view = newView;

          renderers.pixi.stage.removeChild(oldView);
          renderers.pixi.stage.addChild(newView);
        }
        break;
      case 'movieclip':
        if (elementTarget.view instanceof PIXI.MovieClip) {
          elementTarget.view.stop();
          elementTarget.view.setTextures(params.textureIds[0]);
        } else if (elementTarget.view instanceof PIXI.Sprite) {
          newView = PIXI.MovieClip(params.textureIds[0]);

          elementTarget.view = newView;
          renderers.pixi.stage.removeChild(oldView);
          renderers.pixi.stage.addChild(newView);
        }
        elementTarget.view.animationSpeed = params.animationSpeed;
        elementTarget.view.play();
        break;
      }
    }
  };

  return utils;
}));
