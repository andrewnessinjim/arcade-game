export default function setUpPlayerMovement(player) {
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

    attachTouchNavigationListener('.game-controls__up', 'up', player);
    attachTouchNavigationListener('.game-controls__right', 'right', player);
    attachTouchNavigationListener('.game-controls__down', 'down', player);
    attachTouchNavigationListener('.game-controls__left', 'left', player);

    document.querySelector('.buttons_toggle').addEventListener('click',() => {
        document.querySelector('.game-controls__navContainer').classList.toggle('hide');
    });

    document.querySelector('.game-controls').addEventListener('touchend', function(e) {
        e.preventDefault();
        e.target.click();
    });
}

function attachTouchNavigationListener(elementName, direction, player) {
    document.querySelector(elementName).addEventListener('click', () => {
        player.handleInput(direction);
    })
}
