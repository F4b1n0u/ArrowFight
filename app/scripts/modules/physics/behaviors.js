define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Physics = require('physicsjs');
  var Renderers = require('renderers');
  var Bounds = require('bounds');

  Physics.behavior('border-warp-behaviour', 'edge-collision-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {
          aabb: Bounds.frame,
          channel: 'border-collisions:detected',
          restitution: 0.99,
          cof: 1
        };

        parent.init.call(this, $.extend({}, defaults, options));
      },

      connect: function (world) {
        world.on('integrate:velocities', this.checkAll, this);
        world.on('border-collisions:detected', this.checkCollisions, this);
      },

      disconnect: function (world) {
        world.off('integrate:velocities', this.checkAll);
        world.off('border-collisions:detected', this.checkCollisions);
      },

      checkCollisions: function (data) {
        data.collisions.forEach(function (collision) {
          var elementMoving = (collision.bodyA.view) ? collision.bodyA : collision.bodyB;

          if (collision.norm.x) {
            var newX = (collision.norm.x * 70) + (Renderers.pixi.el.width / 2) * (1 - collision.norm.x);
            elementMoving.state.pos.x = newX;
          }

          if (collision.norm.y) {
            var newY = (collision.norm.y * 70) + (Renderers.pixi.el.width / 2) * (1 - collision.norm.y);
            elementMoving.state.pos.y = newY;
          }
        });
      }
    };
  });

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

  Physics.behavior('air_brake', function () {
    return {
      behave: function () {
        this.getTargets().forEach(function (body) {
          if (body.state.vel.norm() > 0.1) {
            var brake = new Physics.vector(-0.00075, 0).rotate(body.state.angular.pos);
            body.accelerate(brake);
          }
        });
      }
    };
  });

  Physics.behavior('collect-detection', 'body-collision-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      connect: function (world) {
        world.on('collisions:detected', this.checkGroundCollision, this);
      },

      disconnect: function (world) {
        world.off('collisions:detected', this.checkGroundCollision);
      },

      checkGroundCollision: function (data) {
        data.collisions.forEach(function (collision) {
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'archer') {
            if (!collision.bodyB.isDrawing.get()) {
              collision.bodyB.collect.trigger();
              collision.bodyA.collected.trigger();
            }
          } else if (collision.bodyA.name === 'archer' && collision.bodyB.name === 'arrow') {
            if (!collision.bodyA.isDrawing.get()) {
              collision.bodyB.collected.trigger();
              collision.bodyA.collect.trigger();
            }
          }
        });
      }
    };
  });

  Physics.behavior('cling-detection', 'body-collision-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      connect: function (world) {
        world.on('collisions:detected', this.checkGroundCollision, this);
      },

      disconnect: function (world) {
        world.off('collisions:detected', this.checkGroundCollision);
      },

      checkGroundCollision: function (data) {
        data.collisions.forEach(function (collision) {
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

  Physics.behavior('hit-detection', 'body-collision-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      connect: function (world) {
        world.on('collisions:detected', this.checkGroundCollision, this);
      },

      disconnect: function (world) {
        world.off('collisions:detected', this.checkGroundCollision);
      },

      checkGroundCollision: function (data) {
        data.collisions.forEach(function (collision) {
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'archer') {
            if (collision.bodyA.isMortal.get() && !collision.bodyB.isDrawing.get()) {
              collision.bodyB.isHit.trigger();
              collision.bodyA.isPlant.trigger();
            }
          } else if (collision.bodyA.name === 'archer' && collision.bodyB.name === 'arrow') {
            if (collision.bodyB.isMortal.get() && !collision.bodyA.isDrawing.get()) {
              collision.bodyA.isHit.trigger();
              collision.bodyB.isPlant.trigger();
            }
          }
        });
      }
    };
  });

  Physics.behavior('mortal-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      behave: function () {
        this.getTargets().forEach(function (body) {
          if (body.state.vel.norm() > 1) {
            body.isMortal.set(true);
          } else {
            body.isMortal.set(false);
          }
        });
      }
    };
  });

  Physics.behavior('falling-jumping-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      behave: function () {
        this.getTargets().forEach(function (body) {
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

  Physics.behavior('walking-movement', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      behave: function () {
        this.getTargets().forEach(function (body) {
          if (body.isWalking.get()) {
            var direction = body.aimVector.get().x;
            body.state.vel.x = 0.3 * direction;
          }
        });
      }
    };
  });


  Physics.behavior('plant-detection', 'body-collision-detection', function (parent) {
    return {
      init: function (options) {
        var defaults = {};
        parent.init.call(this, $.extend({}, defaults, options));
      },

      connect: function (world) {
        world.on('collisions:detected', this.checkMapCollision, this);
      },

      disconnect: function (world) {
        world.off('collisions:detected', this.checkMapCollision);
      },

      checkMapCollision: function (data) {
        data.collisions.forEach(function (collision) {
          if (collision.bodyA.name === 'arrow' && collision.bodyB.name === 'map-part') {
            collision.bodyA.isPlant.trigger();
          } else if (collision.bodyA.name === 'map-part' && collision.bodyB.name === 'arrow') {
            collision.bodyB.isPlant.trigger();
          }
        });
      }
    };
  });

  var Behaviors = {


    // ARROW
    gravityArrow: Physics.behavior('gravity-arrow', {
      acc: {
        x: 0,
        y: 0.002
      }
    }),
    mortalDetection: Physics.behavior('mortal-detection'),
    airBrake: Physics.behavior('air_brake'),
    plantDetection: Physics.behavior('plant-detection'),

    // ARCHER
    gravityArcher: Physics.behavior('gravity-archer', {
      acc: {
        x: 0,
        y: 0.002
      }
    }),
    fallingJumpingDetection: Physics.behavior('falling-jumping-detection'),
    walkingMovement: Physics.behavior('walking-movement'),
    clingDetection: Physics.behavior('cling-detection'),

    // BOTH
    collectDetection: Physics.behavior('collect-detection'),
    hitDetection: Physics.behavior('hit-detection'),
    borderWarp: Physics.behavior('border-warp-behaviour'),
    bodyImpulseResponse: Physics.behavior('body-impulse-response'),
    bodyCollisionDetection: Physics.behavior('body-collision-detection'),
    sweepPrune: Physics.behavior('sweep-prune')
  };

  return Behaviors;
});
