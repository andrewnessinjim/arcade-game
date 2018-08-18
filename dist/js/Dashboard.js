define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var _level = Symbol('level');

    var Dashboard = exports.Dashboard = function () {
        function Dashboard(level) {
            _classCallCheck(this, Dashboard);

            this[_level] = level;
        }

        _createClass(Dashboard, [{
            key: 'update',
            value: function update() {}
        }, {
            key: 'render',
            value: function render(ctx) {
                ctx.font = '24px arial';
                ctx.fillText('Level ' + this.level, 20, 30);
            }
        }, {
            key: 'level',
            set: function set(level) {
                this[_level] = level;
            },
            get: function get() {
                return this[_level];
            }
        }]);

        return Dashboard;
    }();
});