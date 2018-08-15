(() => {
    // Constants for private members
    const _sprite = Symbol('_sprite');
    const _row = Symbol('row');
    const _col = Symbol('_col');
    const _x = Symbol('_x');
    const _y = Symbol('_y');
    const _width = Symbol('_width');
    const _height = Symbol('_height');
    const _gameOver = Symbol('_gameOver');
    const _status = Symbol('_status');

    const _getRandomGrassRow = Symbol('getRandomGrass_row');
    const _getRandomGrassY = Symbol('getRandomGrassY');
    const _getRandomGrassColumn = Symbol('getRandomGrass_column');
    const _getRandomGrassX = Symbol('getRandomGrassX');

    const Y_PIX_PLAYER_SELF_OFFSET = Symbol('Y_PIX_PLAYER_SELF_OFFSET');

    class Player {
        constructor() {
            this[_sprite] = 'images/char-boy.png';
            this[_row] = Player[_getRandomGrassRow]();
            this[_col] = Player[_getRandomGrassColumn]();
            this[_x] = Player[_getRandomGrassX](this[_col]);
            this[_y] = Player[_getRandomGrassY](this[_row]);
            this[_width] = 101;
            this[_height] = 171;
            this[_gameOver] = false;
            this[_status] = '';
        }

        update() {
        }

        render() {
            if(this.isGameOver() && this[_status] === 'lose') {
                if(this[_width] > 0 && this[_height] > 0) {
                    window.ctx.drawImage(
                        window.Resources.get(this[_sprite]),
                        this[_x] += 5,
                        this[_y] += 5,
                        this[_width] -= 10,
                        this[_height] -= 10
                    );
                }
            } else {
                window.ctx.drawImage(window.Resources.get(this[_sprite]), this[_x], this[_y]);
            }
        }

        handleInput(key) {
            if(!this[_gameOver]) {
                switch(key) {
                case 'left':
                    if(this[_col] > 0) {
                        this[_col]--;
                        this[_x] -= window.constants.COL_PIXELS;
                    }
                    break;
                case 'up':
                    if(this[_row] > 0) {
                        this[_row]--;
                        this[_y] -= window.constants.ROW_PIXELS;
                    }
                    break;
                case 'right':
                    if(this[_col] < (window.constants.numCols - 1)) {
                        this[_col]++;
                        this[_x] += window.constants.COL_PIXELS;
                    }
                    break;
                case 'down':
                    if(this[_row] < (window.constants.numRows - 1)) {
                        this[_row]++;
                        this[_y] += window.constants.ROW_PIXELS;
                    }
                    break;
                default:
                    break;
                }

                if(this.getRow() === 0) {
                    this.gameOver('win');
                    setTimeout(window.reset, 1000);
                }
            }
        }

        gameOver(status) {
            this[_gameOver] = true;
            this[_status] = status;
        }

        isGameOver() {
            return this[_gameOver];
        }

        getRow() {
            return this[_row];
        }

        getWidth() {
            return this[_width];
        }

        getX() {
            return this[_x];
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
