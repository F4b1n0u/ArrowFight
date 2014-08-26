(define(function (require) {
  'use strict';

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
          this.amount -= 1;
          return true;
        }
        return false;
      },
      collect: function () {
        this.amount += 1;
      },
      full: function () {
        this.amount = 4;
      }
    };
    this.quiver.full();
    this.score = new Field(0, sandbox, 'model:archer:score');
  };

  return Archer;
}));
