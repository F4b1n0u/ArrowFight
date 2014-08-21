ArrowFight
==========

description:

	tiny web game where 2 teams ( green and blue ) fight which bow and arrow

how to run:

- add:

	if ( styles.hasOwnProperty( 'alpha' ) ) {
        graphics.alpha = styles.alpha;
    }

	In the PixiRenderer createPolygon function of the physicsJS library. (search "PixiRenderer#createPolygon" in the lib) Because the pixi renderer doesn't deal with the alpha yet, ( it's will comming soon I guess :D )

- add app dependencies
	run the command in the root folder of the solution ( ArrowFight/ )

	bower install

- add node dependencies,
	run the command in the root folder of the solution ( ArrowFight/ )

	npm install

- launch with:
	run the command in the root folder of the solution ( ArrowFight/ )

	grunt serve

how to play:

	press 'enter' to start the game
	green team:
		press 'up', 'left', 'down', 'right' to aim or walk
		press 'p' to jump
		press 'x' to draw the bow, realese it to throw an arrow
	red team:
		press 'z', 'q', 's', 'd' to aim or walk
		press 'r' to jump
		press 'f' to draw the bow, realese it to throw an arrow
