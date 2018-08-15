const player = new window.Player();
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

window.player = player;
window.allEnemies = allEnemies;
