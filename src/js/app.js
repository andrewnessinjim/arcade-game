// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


const player = new window.Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
    new window.Enemy(400),
    new window.Enemy(300),
    new window.Enemy(200),
    new window.Enemy(100),
    new window.Enemy(50)
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
