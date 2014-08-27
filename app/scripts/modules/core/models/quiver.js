(define(function (require) {
  'use strict';

  var Field = require('field');

  /**
   * [Quiver Constructor of Quiver model]
   * @param {[type]} sandbox
   */
  var Quiver = function (sandbox) {
    var maxCapacity = 6;
    var nominalCapacity = 3;

    this.sandbox = sandbox;
    this.amount = new Field(0, this.sandbox, 'quiver:amount');

    this.isEmpty = function () {
      return this.amount.get() <= 0;
    };

    this.pick = function () {
      if (!this.isEmpty()) {
        var amount = this.amount.get();
        this.amount.set(amount - 1);
        return true;
      }
      return false;
    };

    this.collect = function () {
      if (this.amount.get() < maxCapacity) {
        var amount = this.amount.get();
        this.amount.set(amount + 1);
        return true;
      }
      return false;
    };

    this.fill = function () {
      this.amount.set(nominalCapacity);
    };
  };
  return Quiver;
}));
