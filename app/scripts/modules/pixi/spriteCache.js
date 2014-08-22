define(function (require) {
  'use strict';

  var PIXI = require('pixi');
  var spriteCache = function (callback) {

    var assetLoader = new PIXI.AssetLoader(['images/archers/archer_green.json', 'images/archers/archer_red.json']);

    assetLoader.on('onProgress', function () {
      console.log('loading ...');
    });

    assetLoader.on('onComplete', callback);
    assetLoader.load();
  };
  return spriteCache;
});
