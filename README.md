ArrowFight
==========

tiny web game where 2 teams ( green and blue ) fight which bow and arrow

to run the project: 
you need to add:

	if ( styles.hasOwnProperty( 'alpha' ) ) {
        console.log("modif for alpha");
        graphics.alpha = styles.alpha;
    }

In the PixiRenderer#createPolygon function of the physicsJS library.
Because the pixi renderer doesn't deal with the alpha yet, ( it's will comming soon I guess :D )

controls:

	press 'enter' to start the game
	green team:
		press 'up', 'left', 'down', 'right' to aim or walk
		press 'p' to jump
		press 'x' to draw the bow, realese it to throw an arrow
	red team:
		press 'z', 'q', 's', 'd' to aim or walk
		press 'r' to jump
		press 'f' to draw the bow, realese it to throw an arrow
