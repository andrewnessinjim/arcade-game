(() => {
    const _getRandomGrassRow = Symbol('getRandomGrassRow');
    const _getRandomGrassY = Symbol('getRandomGrassY');
    const _getRandomGrassColumn = Symbol('getRandomGrassColumn');
    const _getRandomGrassX = Symbol('getRandomGrassX');

    const Y_PIX_PLAYER_SELF_OFFSET = Symbol('Y_PIX_PLAYER_SELF_OFFSET');

    class Player {
        constructor() {
            this.sprite = 'images/char-boy.png';
            this.row = Player[_getRandomGrassRow]();
            this.col = Player[_getRandomGrassColumn]();
            this.x = Player[_getRandomGrassX](this.col);
            this.y = Player[_getRandomGrassY](this.row);
        }

        update() {
        }

        render() {
            window.ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y);
        }

        handleInput(key) {
            switch(key) {
            case 'left':
                if(this.col > 0) {
                    this.col--;
                    this.x -= window.constants.COL_PIXELS;
                }
                break;
            case 'up':
                if(this.row > 0) {
                    this.row--;
                    this.y -= window.constants.ROW_PIXELS;
                }
                break;
            case 'right':
                if(this.col < (window.constants.numCols - 1)) {
                    this.col++;
                    this.x += window.constants.COL_PIXELS;
                }
                break;
            case 'down':
                if(this.row < (window.constants.numRows - 1)) {
                    this.row++;
                    this.y += window.constants.ROW_PIXELS;
                }
                break;
            default:
                break;
            }
        }

        static [_getRandomGrassRow]() {
            return window.constants.NUM_WATER_ROWS +
                    window.constants.NUM_STONE_ROWS +
                    window.util.getRandomInt(window.constants.NUM_GRASS_ROWS);
        }

        static [_getRandomGrassY](row) {
            return (row * window.constants.ROW_PIXELS) +
                    Player[Y_PIX_PLAYER_SELF_OFFSET];
        }

        static [_getRandomGrassColumn]() {
            return window.util.getRandomInt(window.constants.numCols);
        }

        static [_getRandomGrassX](col) {
            return col * window.constants.COL_PIXELS;
        }
    }

    Player[Y_PIX_PLAYER_SELF_OFFSET] = -25;

    window.Player = Player;
})();
