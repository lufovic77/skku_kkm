
var game = new Phaser.Game(1500, 750, Phaser.AUTO, '', { preload: preload, create: create, update: update, change: change });

function preload() {

    game.load.image('back', './assets/images/back.png');
    game.load.image('ground_long', './assets/images/platform_long.png');
    game.load.image('ground_column', './assets/images/platform_column.png');
    game.load.image('star', './assets/images/star.png');
    game.load.image('base', './assets/images/ground.png');
    game.load.image('switch_on', './assets/images/switch_on.png');
    game.load.image('switch_off', './assets/images/switch_off.png');
    game.load.image('spike', './assets/images/spike.png');
    game.load.image('hole', './assets/images/hole.png');
  //  game.load.atlas('button', './assets/images/button_texture_atlas.png', './assets/button.json');
    game.load.spritesheet('dude', './assets/images/dude.png', 32, 46);

}

var player;
var player2;
var platforms;
var cursors;
var switch_on_1;
var switch_on_2;
var switch_off;
var switch_var=0;

var leftKey;
var rightKey;
var upKey;
var downKey;


var result = 'Click a body';
function create() {

	//spike.width = 40;
	//spike.height = 25;
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'back');
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 100, 'base');
    //ground.scale.setTo(2, 2);
    ground.body.immovable = true;
/*
    ground = platforms.create(0, game.world.height-625 , 'base');
    ground.body.immovable = true;
*/

    var ledge = platforms.create(390, 580, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(670, 540, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(310, 60, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(710, 60, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(310, 60, 'ground_column');
    ledge.body.immovable = true;

    ledge = platforms.create(1110, 60, 'ground_column');
    ledge.body.immovable = true;

    ledge = platforms.create(750, 380, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(310, 420, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(520, 260, 'ground_long');
    ledge.body.immovable = true;


    // The player and its settings

    var spikes;

    for(var i=0;i<2;i++){
    	spikes = platforms.create(670+40*i,515,'spike');	//making the spikes

    	spikes.body.immovable = true;
    	spikes.width=40;
   		spikes.height=25;
   		spikes.body.onCollide = new Phaser.Signal();	
   		spikes.body.onCollide.add(hitSprite, this);
	}

    for(var i=0;i<3;i++){
   		spikes = platforms.create(992+40*i,432,'spike');
    	spikes.anchor.setTo(0,.5);
    	spikes.body.immovable = true;
    	spikes.width=40;
    	spikes.height=25;
    	spikes.scale.y*=-1;
   		spikes.body.onCollide = new Phaser.Signal();	
   		spikes.body.onCollide.add(hitSprite, this);
    }

    for(var i=0;i<3;i++){
   		spikes = platforms.create(680+40*i,312,'spike');
    	spikes.anchor.setTo(0,.5);
    	spikes.body.immovable = true;
    	spikes.width=40;
    	spikes.height=25;
    	spikes.scale.y*=-1;
   		spikes.body.onCollide = new Phaser.Signal();	
   		spikes.body.onCollide.add(hitSprite, this);
    }

    var hole=platforms.create(720,220,'hole');
    hole.body.immovable=true;
    hole.anchor.setTo(0,0);
   	hole.width=40;
   	hole.height=40;
   	hole.body.onCollide = new Phaser.Signal();	
   	hole.body.onCollide.add(hitHole, this);
    
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 650;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 8, true);
    player.animations.add('right', [5, 6, 7, 8], 8, true);
    //  Our controls.


    
    player2 = game.add.sprite(1300, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player2);

    //  Player physics properties. Give the little guy a slight bounce.
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 650;
    player2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player2.animations.add('left', [0, 1, 2, 3], 8, true);
    player2.animations.add('right', [5, 6, 7, 8], 8, true);

    
    cursors = game.input.keyboard.createCursorKeys();

	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);		//for player 2
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);


	game.physics.startSystem(Phaser.Physics.P2JS);

    switch_off = game.add.sprite(-200, -200, 'switch_off');
      //  game.input.onDown.add(change, this);
     // switch_off.immovable=true;

    //game.input.onDown.add(change, this);
 //   switch_on = game.add.sprite(200, 200, 'switch_on');
	//game.physics.p2.enable([ switch_on,switch_off ], false);

    switch_on_1 = game.add.sprite(150, 350, 'switch_on');
    switch_on_1.anchor.set(0.5);
    switch_on_1.inputEnabled = true;
    switch_on_2 = game.add.sprite(1350, 350, 'switch_on');
    switch_on_2.anchor.set(0.5);
    switch_on_2.inputEnabled = true;
    switch_on_1.events.onInputDown.add(change, this);		//Sending the signal of clicking the switch button
    switch_on_2.events.onInputDown.add(change, this);

    player.anchor.setTo(.5,.5);
    player2.anchor.setTo(.5,.5);

}

function update() {
    game.physics.arcade.collide(player, platforms);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }



    game.physics.arcade.collide(player2, platforms);

    //  Reset the players velocity (movement)
    player2.body.velocity.x = 0;

    if (this.leftKey.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -150;

        player2.animations.play('left');
    }
    else if (this.rightKey.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 150;

        player2.animations.play('right');
    }
    else
    {
        //  Stand still
        player2.animations.stop();

        player2.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (this.upKey.isDown && player2.body.touching.down)
    {
        player2.body.velocity.y = -350;
    }
}
	

function change() {

		if(switch_var%2==0){
		    switch_on_1.loadTexture('switch_off', 0);
		    switch_on_2.loadTexture('switch_off', 0);
		    console.log("off");

		    player.scale.y*=-1;
    		player.body.gravity.y = -350;
		    player2.scale.y*=-1;
    		player2.body.gravity.y = -350;
			switch_var+=1;
		}
		else{
			switch_on_1.loadTexture('switch_on',0);
			switch_on_2.loadTexture('switch_on',0);
			console.log("on");

		    player.scale.y*=-1;
    		player.body.gravity.y = 650;
		    player2.scale.y*=-1;
    		player2	.body.gravity.y = 650;
			switch_var+=1;	

		}
	
}

function hitSprite (spike, player) {

	player.kill();

}

function hitHole (hole, player) {

	player.kill();

}