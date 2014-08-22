(define(function (require) {
  'use strict';

  var Physics = require("physicsjs");
  var Field = require("scripts/modules/core/field");

  /**
   * [Archer Constructor of Archer model]
   * @param {[type]} sandbox
   */
  var Archer = function (sandbox) {
    this.sandbox = sandbox;
    this.quiver = {
      amount: 0,
      isEmpty: function () {
        return this.amount <= 0;
      },
      pick: function () {
        if (!this.isEmpty()) {
          this.amount--;
          return true;
        }
        return false;
      },
      collect: function () {
        this.amount++;
      },
      full: function () {
        this.amount = 3;
      }
    };
    this.quiver.full();
    this.score = new Field(0, sandbox, 'model:archer:score');
    this.aimVector = new Field(Physics.vector(0, 0), sandbox, 'model:archer:aimVector');
    /**
     * [mainDirection use to know in witch direction we should launch an arrow if the user don't design any aime direction {x: 0, y: 0}]
     * @type {Field}
     */
    this.mainDirection = new Field(Physics.vector(1, 0), sandbox, 'model:archer:mainDirection');
  };

  return Archer;
}));
