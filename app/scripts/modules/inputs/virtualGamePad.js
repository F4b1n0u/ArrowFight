define(function (require) {
  'use strict';

  var Field = require('field');

  /**
   * [VirtualGamePad Constructor of virtual game pad Object, to add an abstraction of the real device use (keyboard, usb controller, wireless controller, phone ...)]
   * @param {Game} game game where the gamepad will be plug
   * @param {String} team id to define the team of the controller
   */
  var VirtualGamePad = function (game, team) {
    this.team = team;
    this.sandbox = game.sandbox;

    var baseChannel = this.team + ':virtualGamePad:';

    this.joystick = {
      horizontal: new Field(0, this.sandbox, baseChannel + 'joystick:horizontal'),
      vertical: new Field(0, this.sandbox, baseChannel + 'joystick:vertical')
    };

    this.button = {
      jump: new Field(false, this.sandbox, baseChannel + 'button:jump'),
      fire: new Field(false, this.sandbox, baseChannel + 'button:fire'),
      start: new Field(false, this.sandbox, baseChannel + 'button:start')
    };

    game.plugVirtualGamePad(this);
  };

  return VirtualGamePad;
});
