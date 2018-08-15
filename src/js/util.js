window.util = {
    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    getRandomStoneRowPixels: function() {
        return (window.constants.ROW_PIXELS * (window.util.getRandomInt(window.constants.NUM_STONE_ROWS)+ window.constants.NUM_WATER_ROWS))
                - window.constants.Y_BUG_SELF_OFFSET;
    },
    getRandomGrassColumnPixels: function() {
        return window.constants.COL_PIXELS * window.util.getRandomInt(window.constants.numCols);
    },
    getRandomGrassRowPixels: function() {
        return ((window.constants.NUM_WATER_ROWS + window.constants.NUM_STONE_ROWS + window.util.getRandomInt(window.constants.NUM_GRASS_ROWS)) * window.constants.ROW_PIXELS) - window.constants.Y_PLAYER_SELF_OFFSET;
    }
}
