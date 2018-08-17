import * as engine from './engine';
import Enemy from './Enemy';
import Player from './Player';
import Resources from './resources';

let player;
let allEnemies;

function reset() {
    player = new Player(reset);
    allEnemies = [
        new Enemy(400,player, reset),
        new Enemy(300,player, reset),
        new Enemy(200,player, reset),
        new Enemy(100,player, reset),
        new Enemy(50, player, reset)
    ];
    engine.setPlayer(player);
    engine.setAllEnemies(allEnemies);
}

reset();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png'
]);
Resources.onReady(engine.init.bind(undefined, player, allEnemies));
