define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getRandomInt = getRandomInt;
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
});