ArrowFight
==========

![Alt preview of ArrowFight](https://raw.githubusercontent.com/F4b1n0u/ArrowFight/master/ArrowFight_preview.png)

description
-----------

	tiny web game where 2 teams ( green and blue ) fight which bow and arrow

how to run
----------

### add app dependencies
run commands in the root folder of the solution ( ArrowFight/ )

* add solution dependencies:

`bower install`

* add node dependencies:

`npm install`

* launch with:

`grunt serve`

### tips - PhysicsJS's PIXI renderer improving

* add

`if ( styles.hasOwnProperty( 'alpha' ) ) {graphics.alpha = styles.alpha; }`
In the PixiRenderer createPolygon function of the physicsJS library. (search "PixiRenderer#createPolygon" in the lib) Because the pixi renderer doesn't deal with the alpha yet, ( it's will comming soon I guess :D ).

how to play
-----------

press 'enter' to start the game
* green team:
	* press 'up', 'left', 'down', 'right' to aim or walk
	* press 'c' to jump
	* press 'x' to draw the bow, realese it to throw an arrow
* red team:
	* press 'z', 'q', 's', 'd' to aim or walk
	* press 'r' to jump
	* press 'f' to draw the bow, realese it to throw an arrow
