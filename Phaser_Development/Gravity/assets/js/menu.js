var start;
var Menu = {
    preload : function() {
        // load menu image form game object
        game.load.image('back', './assets/images/back.png');
        game.load.image('start', './assets/images/startButton.png');
    },
 
    create: function () {
        // add image
        game.add.sprite(0, 0, 'back');
        start = Menu.add.sprite(640, 350, 'start');
        start.width=100;
        start.height=60;
        start.anchor.set(0.5);
        start.inputEnabled = true;     //Sending the signal of clicking the switch button
        start.events.onInputDown.add(this.startGame, this);

    },
    
    startGame: function () {
        // Change the state to the actual game.
        this.state.start('Game');
        console.log("hello ");
    }

};