(define(function (require) {
  'use strict';

  var QuiverModel = require('quiverModel');

  /**
   * [Archer Constructor of Archer model]
   * @param {[type]} sandbox
   */
  var Archer = function (sandbox) {
    this.sandbox = sandbox;
    this.quiver = new QuiverModel(this.sandbox);
  };

  return Archer;
}));
