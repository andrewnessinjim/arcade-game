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
            this.x = Enemy[X_PIX_BUG_START];
            this.y = Enemy[_getRandomStoneY](this.row);
            this.speed = speed;
            this.width = 101;
            this.player = player;
            this.reset = reset;
        }

        _createClass(Enemy, [{
            key: 'update',
            value: function update(dt) {
                if (!this.player.isGameOver()) {
                    this.x = this.x + this.speed * dt;
                    if (this.x > _constants2.default.CANVAS_WIDTH) {
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
                    if (this.row === this.player.getRow() && this.x - _constants2.default.COLLISION_OFFSET <= this.player.getX() + this.player.getWidth() && this.x + _constants2.default.COLLISION_OFFSET + this.width >= this.player.getX()) {
                        this.player.gameOver('lose');
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


    // Avoid constants being loaded into closure of every Enemy object
    Enemy[Y_PIX_BUG_SELF_OFFSET] = -20;
    Enemy[X_PIX_BUG_START] = -200;
});