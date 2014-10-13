define(function (require) {
  'use strict';

  var Physics = require('physicsjs/physicsjs-0.6.0');
  var WorldHelper = require('worldHelper');
  var Events = require('minivents');

  var ArcherElement = require('archerElement');
  var ArrowElement = require('arrowElement');
  var MapElement = require('mapElement');

  var utils = require('utils');

  /**
   * [Game constructor of game object]
   * @param {string} mapId id use for the map, exemple: "TwilightSpire"
   */
  var Game = function (mapId) {
    this.world = WorldHelper.init();
    this.map = this.sandbox = new Events();

    /**
     * [_initMap initialize an element map to the game in function of an id]
     * @param {string} mapId id use for the map, exemple: "TwilightSpire"
     */
    var _initMap = function (mapId) {
      this.map = new MapElement(mapId);
      utils.addElement(this.world, this.map);
    }.bind(this);

    /**
     * [_addArcher add an element archer to the game in function of an id]
     * @param {String} team could be 'green' or 'red'
     * @param {Event} sandbox
     */
    var _addArcher = function (team) {
      var respawn = this.map.getRespawnLocation(team);
      var element = new ArcherElement(team, this.sandbox, {respawn: respawn});
      utils.addElement(this.world, element);

      this.sandbox.on('round:finish:looser', function (looser) {
        looser.reset();
        utils.addElement(this, looser);
      }.bind(this.world));

      return element;
    }.bind(this);

    /**
     * [_releaseArrow add and launch an arrow from an archer]
     * @param  {Element} archer
     * @return {[type]}
     */
    var _releaseArrow = function (archer) {
      var aimVectorAngle = archer.body.aimVector.get().angle();
      var angle = isNaN(aimVectorAngle) ? archer.body.mainDirection.get().angle() : aimVectorAngle;
      var element = new ArrowElement({
        x: archer.body.state.pos.x,
        y: archer.body.state.pos.y,
        angle: angle
      });

      element.launch(0.35);
      utils.addElement(this.world, element);
    }.bind(this);

    /**
     * [plugVirtualGamePad plug an virtual gamepad dedicated to an specific team, it's add the player to the game]
     * @param  {VirtualGamePad} virtualGamePad
     * @return {no return}
     */
    this.plugVirtualGamePad = function (virtualGamePad) {
      var team = virtualGamePad.team;
      var baseChannel = team + ':virtualGamePad:';

      var archer = _addArcher(team, this.sandbox);

      this.sandbox.on(baseChannel + 'joystick:vertical', function (value) {
        var aimVectorField = this.body.aimVector;
        var aimVector = aimVectorField.get().clone();
        aimVector.y = value.new;
        aimVectorField.set(aimVector);
      }.bind(archer));

      this.sandbox.on(baseChannel + 'joystick:horizontal', function (value) {
        var aimVectorField = this.body.aimVector;
        var aimVector = aimVectorField.get().clone();
        aimVector.x = value.new;
        aimVectorField.set(aimVector);
        if (aimVector.x) {
          this.body.mainDirection.get().x = aimVector.x;
        }
      }.bind(archer));

      this.sandbox.on(baseChannel + 'button:jump', function (value) {
        if (value.new && !this.body.isJumping.get()) {
          this.jump();
        }
      }.bind(archer));

      this.sandbox.on(baseChannel + 'button:fire', function (value) {
        if (value.new) {
          this.draw();
        } else if (this.body.isDrawing.get()) {
          _releaseArrow(this);
          this.releaseArrow();
        }
      }.bind(archer));

      this.sandbox.on(baseChannel + 'button:start', function (value) {
        if (value.new && !Physics.util.ticker.isActive()) {
          Physics.util.ticker.start();
        }
      });
    }.bind(this);

    _initMap(mapId);
  };

  return Game;
});
