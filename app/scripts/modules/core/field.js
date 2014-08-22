define(function () {
  'use strict';

  /**
   * [Field attribut of a class, to factor the event triggering]
   * @param {[type]} val value of the attribute at his creation
   * @param {[type]} sandbox location where the event will be trigger
   * @param {[type]} channel channel use to listen the event triggering
   */
  var Field = function (val, sandbox, channel) {
    var value = val;
    this.sandbox = sandbox;
    this.channel = channel;

    this.get = function () {
      return value;
    };

    this.set = function (val) {
      var old = value;
      if (val !== old) {
        value = val;
        this.sandbox.emit(this.channel, {
          old: old,
          new: val
        });
      }
    };

    /**
     * [trigger to trigger the event without any change on the value of the attribute, mainly use to re-use the event factoring, in this case the value is not very usefull]
     * @return {ne return}
     */
    this.trigger = function () {
      this.sandbox.emit(this.channel);
    };
  };
  return Field;
});
