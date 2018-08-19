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

    // Constants for private members
    var _sprite = Symbol('_sprite');
    var _row = Symbol('row');
    var _col = Symbol('_col');
    var _x = Symbol('_x');
    var _y = Symbol('_y');
    var _width = Symbol('_width');
    var _height = Symbol('_height');
    var _gameOver = Symbol('_gameOver');
    var _status = Symbol('_status');

    var _getRandomGrassRow = Symbol('getRandomGrass_row');
    var _getRandomGrassY = Symbol('getRandomGrassY');
    var _getRandomGrassColumn = Symbol('getRandomGrass_column');
    var _getRandomGrassX = Symbol('getRandomGrassX');

    var Y_PIX_PLAYER_SELF_OFFSET = Symbol('Y_PIX_PLAYER_SELF_OFFSET');

    var INITIAL_COL = 0;
    var INITIAL_ROW = 5;

    var Player = function () {
        function Player(reset) {
            _classCallCheck(this, Player);

            this[_sprite] = 'images/char-boy.png';
            this[_row] = INITIAL_ROW;
            this[_col] = INITIAL_COL;
            this[_x] = Player[_getRandomGrassX](this[_col]);
            this[_y] = Player[_getRandomGrassY](this[_row]);

            // This is the width and height of the PNG files used
            this[_width] = 101;
            this[_height] = 171;

            this[_gameOver] = false;
            this[_status] = '';
            this.reset = reset;
        }

        _createClass(Player, [{
            key: 'update',
            value: function update() {
                if (this.getRow() === 0 && this[_status] !== 'win') {
                    this.gameOver('win');
                    setTimeout(this.reset.bind(undefined, 'win'), 1000);
                }
            }
        }, {
            key: 'render',
            value: function render(ctx) {
                if (this.isGameOver() && this[_status] === 'lose') {
                    // Shrink the player when the game is over. This adds to the visual feedback.
                    if (this[_width] > 0 && this[_height] > 0) {
                        ctx.drawImage(_resources2.default.get(this[_sprite]), this[_x] += 5, this[_y] += 5, this[_width] -= 10, this[_height] -= 10);
                    }
                } else {
                    ctx.drawImage(_resources2.default.get(this[_sprite]), this[_x], this[_y]);
                }
            }
        }, {
            key: 'handleInput',
            value: function handleInput(key) {
                // Move the player only if the movement doesn't push him off the screen
                if (!this[_gameOver]) {
                    switch (key) {
                        case 'left':
                            if (this[_col] > 0) {
                                this[_col]--;
                                this[_x] -= _constants2.default.COL_PIXELS;
                            }
                            break;
                        case 'up':
                            if (this[_row] > 0) {
                                this[_row]--;
                                this[_y] -= _constants2.default.ROW_PIXELS;
                            }
                            break;
                        case 'right':
                            if (this[_col] < _constants2.default.TOTAL_COLS - 1) {
                                this[_col]++;
                                this[_x] += _constants2.default.COL_PIXELS;
                            }
                            break;
                        case 'down':
                            if (this[_row] < _constants2.default.TOTAL_ROWS - 1) {
                                this[_row]++;
                                this[_y] += _constants2.default.ROW_PIXELS;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }, {
            key: 'gameOver',
            value: function gameOver(status) {
                this[_gameOver] = true;
                this[_status] = status;
            }
        }, {
            key: 'isGameOver',
            value: function isGameOver() {
                return this[_gameOver];
            }
        }, {
            key: 'getRow',
            value: function getRow() {
                return this[_row];
            }
        }, {
            key: 'getWidth',
            value: function getWidth() {
                return this[_width];
            }
        }, {
            key: 'getX',
            value: function getX() {
                return this[_x];
            }
        }], [{
            key: _getRandomGrassRow,
            value: function value() {
                return _constants2.default.NUM_WATER_ROWS + _constants2.default.NUM_STONE_ROWS + Util.getRandomInt(_constants2.default.NUM_GRASS_ROWS);
            }
        }, {
            key: _getRandomGrassY,
            value: function value(row) {
                return row * _constants2.default.ROW_PIXELS + Player[Y_PIX_PLAYER_SELF_OFFSET];
            }
        }, {
            key: _getRandomGrassColumn,
            value: function value() {
                return Util.getRandomInt(_constants2.default.TOTAL_COLS);
            }
        }, {
            key: _getRandomGrassX,
            value: function value(col) {
                return col * _constants2.default.COL_PIXELS;
            }
        }]);

        return Player;
    }();

    exports.default = Player;


    Player[Y_PIX_PLAYER_SELF_OFFSET] = -25;
});