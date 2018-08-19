define(['exports', './util', './constants', './resources'], function (exports, _util, _constants, _resources) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var Util = _interopRequireWildcard(_util);

    var _constants2 = _interopRequireDefault(_constants);

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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _getRandomStoneRow = Symbol('getRandomStoneRow');
    var _getRandomStoneY = Symbol('getRandomStoneY');

    var Y_PIX_BUG_SELF_OFFSET = Symbol('Y_PIX_BUG_SELF_OFFSET');
    var X_PIX_BUG_START = Symbol('X_PIX_BUG_START');

    var Enemy = function () {
        function Enemy(speed, player, reset) {
            _classCallCheck(this, Enemy);

            this.sprite = 'images/enemy-bug.png';
            this.row = Enemy[_getRandomStoneRow]();

            // x and y are the pixel positions of the Enemy on the canvas
            this.x = Enemy[X_PIX_BUG_START];
            this.y = Enemy[_getRandomStoneY](this.row);

            this.speed = speed;
            this.width = 101;

            // A reference to player object to call gameOver on it when collision occurs
            this.player = player;

            this.reset = reset;
        }

        _createClass(Enemy, [{
            key: 'update',
            value: function update(dt) {
                if (!this.player.isGameOver()) {
                    // Stop moving when game is over. This gives visual feedback that the game is over
                    this.x = this.x + this.speed * dt;
                    if (this.x > _constants2.default.CANVAS_WIDTH) {
                        // Start over if the enemy has moved past the canvas
                        this.x = Enemy[X_PIX_BUG_START];
                        this.row = Enemy[_getRandomStoneRow]();
                        this.y = Enemy[_getRandomStoneY](this.row);
                    }
                }
            }
        }, {
            key: 'render',
            value: function render(ctx) {
                ctx.drawImage(_resources2.default.get(this.sprite), this.x, this.y);
            }
        }, {
            key: 'checkCollision',
            value: function checkCollision() {
                if (!this.player.isGameOver()) {
                    // Don't check collision if game is already over
                    // Use the row number directly for checking the collision, because the bug moves in single row only
                    // COLLISION_OFFSET is used to avoid collision when the actual PNG's border collides. It gives a slight overlapping effect
                    if (this.row === this.player.getRow() && this.x - _constants2.default.COLLISION_OFFSET <= this.player.getX() + this.player.getWidth() && this.x + _constants2.default.COLLISION_OFFSET + this.width >= this.player.getX()) {

                        // Notify player when collision occurs
                        this.player.gameOver('lose');

                        // Reset the game after a second. This gives a second of feedback to the user that the game is over
                        setTimeout(this.reset.bind(undefined, 'lose'), 1000);
                    }
                }
            }
        }], [{
            key: _getRandomStoneRow,
            value: function value() {
                return Util.getRandomInt(_constants2.default.NUM_STONE_ROWS) + _constants2.default.NUM_WATER_ROWS;
            }
        }, {
            key: _getRandomStoneY,
            value: function value(row) {
                return row * _constants2.default.ROW_PIXELS + Enemy[Y_PIX_BUG_SELF_OFFSET];
            }
        }]);

        return Enemy;
    }();

    exports.default = Enemy;


    // Avoid constants being loaded into closure of every Enemy object by declaring it on the class itself
    Enemy[Y_PIX_BUG_SELF_OFFSET] = -20;
    Enemy[X_PIX_BUG_START] = -200;
});