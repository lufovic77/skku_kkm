
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('back', './assets/images/back.png');
    game.load.image('ground_long', './assets/images/platform_long.png');
    game.load.image('ground_column', './assets/images/platform_column.png');
    game.load.image('star', './assets/images/star.png');
    game.load.image('base', './assets/images/ground.png');
    game.load.spritesheet('dude', './assets/images/dude.png', 28, 42);

}
var testing;
var player;
var platforms;
var cursors;
function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'back');
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 15, 'base');
    //ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    ground = platforms.create(0, game.world.height-625 , 'base');
    ground.body.immovable = true;


    var ledge = platforms.create(43, 500, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(319, 60, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(40, 60, 'ground_column');
    ledge.body.immovable = true;

    ledge = platforms.create(720, 60, 'ground_column');
    ledge.body.immovable = true;

    // The player and its settings

    
    player = game.add.sprite(32, game.world.height - 60, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 8, true);
    player.animations.add('right', [5, 6, 7, 8], 8, true);
    //  Our controls.
    
    cursors = game.input.keyboard.createCursorKeys();
    

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
}
