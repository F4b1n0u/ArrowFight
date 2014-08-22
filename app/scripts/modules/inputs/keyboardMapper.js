define(function (require) {
  'use strict';

  var keyboardJS = require('keyboard');

  /**
   * [keyboardMapper helper to link keyboard event to a virtual game pad]
   * @param  {[type]} virtualGamePad
   * @param  {Object} mapping for each team, for a specific part of the game pad what keyboard key correspond and the range of use
   * example:
   *    {
   *      {team}: {
   *        button: [
   *          {
   *            action: {start|jump|fire},
   *            key: {KeyboardJS key code},
   *            max: {true|false},
   *            min: {true|false},
   *          },
   *          ...
   *        ],
   *        joystick: [
   *          {
   *            axe: {horizontal|vertical},
   *            key: {KeyboardJS key code},
   *            max: {-1 to +1},
   *            max: {-1 to +1},
   *          },
   *          ...
   *        ]
   *      },
   *      ...
   *    }
   * @return {no return}
   */
  var keyboardMapper = function (virtualGamePad, mapping) {
    if (mapping.hasOwnProperty('button')) {
      mapping.button.forEach(function (mapping) {
        keyboardJS.on(mapping.key,
          function () {
            virtualGamePad.button[this.action].set(this.max);
          }.bind(mapping),
          function () {
            virtualGamePad.button[this.action].set(this.min);
          }.bind(mapping));
      });
    }

    if (mapping.hasOwnProperty('joystick')) {
      mapping.joystick.forEach(function (mapping) {
        keyboardJS.on(mapping.key,
          function () {
            virtualGamePad.joystick[this.axe].set(this.max);
          }.bind(mapping),
          function () {
            virtualGamePad.joystick[this.axe].set(this.min);
          }.bind(mapping));
      });
    }
  };

  return keyboardMapper;
});
