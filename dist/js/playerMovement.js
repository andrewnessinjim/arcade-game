define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setUpPlayerMovement = setUpPlayerMovement;
    exports.setPlayer = setPlayer;
    var _player = void 0;

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.

    function setUpPlayerMovement() {

        document.addEventListener('keyup', function (e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };
            _player.handleInput(allowedKeys[e.keyCode]);
        });

        attachTouchNavigationListener('.game-controls__up', 'up', _player);
        attachTouchNavigationListener('.game-controls__right', 'right', _player);
        attachTouchNavigationListener('.game-controls__down', 'down', _player);
        attachTouchNavigationListener('.game-controls__left', 'left', _player);

        document.querySelector('.buttons_toggle').addEventListener('click', function () {
            document.querySelector('.game-controls__navContainer').classList.toggle('hide');
        });

        document.querySelector('.game-controls').addEventListener('touchend', function (e) {
            e.preventDefault(); // Disable double tap to zoom feature on touch screens
            e.target.click(); // Turn it into a click event instead. This gives better control on touch screens
        });
    }

    function attachTouchNavigationListener(elementName, direction, player) {
        document.querySelector(elementName).addEventListener('click', function () {
            player.handleInput(direction);
        });
    }

    function setPlayer(player) {
        _player = player;
    }
});