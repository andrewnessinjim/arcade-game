define(['./engine', './Dashboard', './Enemy', './Player', './resources'], function (_engine, _Dashboard, _Enemy, _Player, _resources) {
    'use strict';

    var engine = _interopRequireWildcard(_engine);

    var _Enemy2 = _interopRequireDefault(_Enemy);

    var _Player2 = _interopRequireDefault(_Player);

    var _resources2 = _interopRequireDefault(_resources);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    var player = void 0;
    var allEnemies = void 0;
    var dashboard = new _Dashboard.Dashboard(0);

    var INITIAL_SPEED_MULTIPLIER = 1;
    var speedMultiplier = void 0;

    function reset(status) {
        if (status === 'win') {
            speedMultiplier += 0.1;
            dashboard.level += 1;
        } else {
            speedMultiplier = INITIAL_SPEED_MULTIPLIER;
            dashboard.level = 0;
        }

        player = new _Player2.default(reset);
        allEnemies = [new _Enemy2.default(400 * speedMultiplier, player, reset), new _Enemy2.default(300 * speedMultiplier, player, reset), new _Enemy2.default(200 * speedMultiplier, player, reset), new _Enemy2.default(100 * speedMultiplier, player, reset), new _Enemy2.default(50 * speedMultiplier, player, reset)];

        engine.setPlayer(player);
        engine.setAllEnemies(allEnemies);
        engine.setDashboard(dashboard);
    }

    reset();
    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

    attachTouchNavigationListener('.game-controls__up', 'up');
    attachTouchNavigationListener('.game-controls__right', 'right');
    attachTouchNavigationListener('.game-controls__down', 'down');
    attachTouchNavigationListener('.game-controls__left', 'left');

    function attachTouchNavigationListener(elementName, direction) {
        document.querySelector(elementName).addEventListener('click', function () {
            player.handleInput(direction);
        });
    }

    document.querySelector('.buttons_toggle').addEventListener('click', function () {
        document.querySelector('.game-controls__navContainer').classList.toggle('hide');
    });
    /* Go ahead and load all of the images we know we're going to need to
         * draw our game level. Then set init as the callback method, so that when
         * all of these images are properly loaded our game will start.
         */

    document.querySelector('.game-controls').addEventListener('touchend', function (e) {
        e.preventDefault();
        e.target.click();
    });
    _resources2.default.load(['images/stone-block.png', 'images/water-block.png', 'images/grass-block.png', 'images/enemy-bug.png', 'images/char-boy.png']);
    _resources2.default.onReady(engine.init.bind(undefined, player, allEnemies));
});