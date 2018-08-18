
import * as engine from './engine';
import { Dashboard } from './Dashboard'
import Enemy from './Enemy';
import Player from './Player';
import Resources from './resources';


let player;
let allEnemies;
const dashboard = new Dashboard(0);

const INITIAL_SPEED_MULTIPLIER = 1;
let speedMultiplier;

function reset(status) {
    if(status === 'win') {
        speedMultiplier += 0.1;
        dashboard.level += 1;
    } else {
        speedMultiplier = INITIAL_SPEED_MULTIPLIER;
        dashboard.level = 0;
    }

    player = new Player(reset);
    allEnemies = [
        new Enemy(400 * speedMultiplier, player, reset),
        new Enemy(300 * speedMultiplier, player, reset),
        new Enemy(200 * speedMultiplier, player, reset),
        new Enemy(100 * speedMultiplier, player, reset),
        new Enemy(50 * speedMultiplier, player, reset)
    ];

    engine.setPlayer(player);
    engine.setAllEnemies(allEnemies);
    engine.setDashboard(dashboard);

    console.table(allEnemies);
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
