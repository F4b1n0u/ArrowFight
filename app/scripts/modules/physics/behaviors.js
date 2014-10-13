define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Physics = require('physicsjs');
  require('physicsjs/behaviors/edge-collision-detection');
  require('physicsjs/behaviors/constant-acceleration');
  require('physicsjs/behaviors/body-collision-detection');
  require('physicsjs/behaviors/body-impulse-response');
  require('physicsjs/behaviors/body-collision-detection');
  require('physicsjs/behaviors/sweep-prune');

  var Renderers = require('renderers');
  var Bounds = require('bounds');

  // Arrow Behaviors

  Physics.behavior('common-arrow', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      behave: function () {
        this.getTargets().forEach(function (body) {
          // mortal detection
          if (body.state.vel.norm() > 0.5) {
            body.isMortal.set(true);
          } else {
            body.isMortal.set(false);
          }

          // air brake
          if (body.state.vel.norm() > 0.1) {
            var brake = new Physics.vector(-0.00075, 0).rotate(body.state.angular.pos);
            body.accelerate(brake);
          }
        });
      }
    };
  });

  Physics.behavior('collision-arrow', 'body-collision-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      connect: function (world) {
        world.on('collisions:detected', this.checkCollision, this);
      },

      disconnect: function (world) {
        world.off('collisions:detected', this.checkCollision);
      },

      checkCollision: function (data) {
        data.collisions.forEach(function (collision) {
          // arrow plant in map
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'map-part') {
            collision.bodyA.isPlant.set('true');
          } else if (collision.bodyA.name === 'map-part' && collision.bodyB.name === 'arrow') {
            collision.bodyB.isPlant.set('true');
          }

          // arrow hit an archer
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'archer') {
            if (collision.bodyA.isMortal.get() && !collision.bodyB.isDrawing.get()) {
              collision.bodyA.isPlant.trigger();
            }
          } else if (collision.bodyA.name === 'archer' && collision.bodyB.name === 'arrow') {
            if (collision.bodyB.isMortal.get() && !collision.bodyA.isDrawing.get()) {
              collision.bodyB.isPlant.trigger();
            }
          }

          // arrow collect by archer
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'archer') {
            if (!collision.bodyB.isDrawing.get()) {
              collision.bodyA.collected.trigger();
            }
          } else if (collision.bodyA.name === 'archer' && collision.bodyB.name === 'arrow') {
            if (!collision.bodyA.isDrawing.get()) {
              collision.bodyB.collected.trigger();
            }
          }
        });
      }
    };
  });

  Physics.behavior('gravity-arrow', 'constant-acceleration', function () {
    return {
      behave: function () {
        this.getTargets().forEach(function (body) {
          if (body.state.vel.norm() < 1) {
            body.accelerate(this._acc);
          }
          if (body.state.vel.norm() > 0.3) {
            body.state.angular.pos = body.state.vel.angle();
          }
        }, this);
      }
    };
  });

  // Archer Behaviors
  Physics.behavior('common-archer', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      behave: function () {
        this.getTargets().forEach(function (body) {
          // walking
          if (body.isWalking.get()) {
            var direction = body.aimVector.get().x;
            body.state.vel.x = 0.3 * direction;
          }

          // falling detection
          var threshold = 0.1;
          if (body.state.vel.y > 0) {
            if (body.state.vel.y > threshold) {
              body.isFalling.set(true);
              body.isInTheAir.set(true);
            } else {
              body.isFalling.set(false);
              body.isInTheAir.set(false);
            }
          } else {
            if (body.state.vel.y < -threshold) {
              body.isJumping.set(true);
              body.isInTheAir.set(true);
            } else {
              body.isJumping.set(false);
              body.isInTheAir.set(false);
            }
          }
        });
      }
    };
  });

  Physics.behavior('collision-archer', 'body-collision-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      connect: function (world) {
        world.on('collisions:detected', this.checkCollision, this);
      },

      disconnect: function (world) {
        world.off('collisions:detected', this.checkCollision);
      },

      checkCollision: function (data) {
        data.collisions.forEach(function (collision) {
          // archer collect arrow
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'archer') {
            // TODO check why this if ????
            if (!collision.bodyB.isDrawing.get()) {
              collision.bodyB.collect.trigger();
            }
          } else if (collision.bodyA.name === 'archer' && collision.bodyB.name === 'arrow') {
            if (!collision.bodyA.isDrawing.get()) {
              collision.bodyA.collect.trigger();
            }
          }

          // archer is hitten by an arrow
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'archer') {
            if (collision.bodyA.isMortal.get() && !collision.bodyB.isDrawing.get()) {
              collision.bodyB.isHit.trigger();
            }
          } else if (collision.bodyA.name === 'archer' && collision.bodyB.name === 'arrow') {
            if (collision.bodyB.isMortal.get() && !collision.bodyA.isDrawing.get()) {
              collision.bodyA.isHit.trigger();
            }
          }

          // archer is clinging
          if (collision.norm.x === 1) {
            if (collision.bodyA.name === 'map-part' && collision.bodyB.name === 'archer') {
              if (collision.bodyB.isInTheAir.get()) {
                collision.bodyB.isClinging.set(true);
              }
            } else if (collision.bodyA.name === 'archer' && collision.bodyB.name === 'map-part') {
              if (collision.bodyA.isInTheAir.get()) {
                collision.bodyA.isClinging.set(true);
              }
            }
          }
        });
      }
    };
  });

  Physics.behavior('gravity-archer', 'constant-acceleration', function (parent) {
    return {
      behave: function (data) {
        parent.behave.call(this, data);
        this.getTargets().forEach(function (body) {
          body.state.angular.pos = 0;
        });
      }
    };
  });

  // Common

  Physics.behavior('limited-gravity', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },
      behave: function (data) {
        var maximumVelocity = 1;
        this.getTargets().forEach(function (body) {
          if (body.state.vel.norm() < maximumVelocity) {
            parent.behave.call(this, data);
          }
        }, this);
      }
    };
  });

  var Behaviors = {
    // ARROW
    commonArrow: Physics.behavior('common-arrow'),
    collisionArrow: Physics.behavior('collision-arrow'),
    gravityArrow: Physics.behavior('gravity-arrow', {
      acc: {
        x: 0,
        y: 0.002
      }
    }),

    commonArcher: Physics.behavior('common-archer'),
    collisionArcher: Physics.behavior('collision-archer'),
    gravityArcher: Physics.behavior('gravity-archer', {
      acc: {
        x: 0,
        y: 0.002
      }
    }),



    bodyImpulseResponse: Physics.behavior('body-impulse-response'),
    bodyCollisionDetection: Physics.behavior('body-collision-detection'),
    sweepPrune: Physics.behavior('sweep-prune')
  };

  return Behaviors;
});
