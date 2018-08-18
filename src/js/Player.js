import * as Util from './util';
import Constants from './constants';
import Resources from './resources';


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

const INITIAL_COL = 0;
const INITIAL_ROW = 5;

export default class Player {
    constructor(reset) {
        this[_sprite] = 'images/char-boy.png';
        this[_row] = INITIAL_ROW;
        this[_col] = INITIAL_COL;
        this[_x] = Player[_getRandomGrassX](this[_col]);
        this[_y] = Player[_getRandomGrassY](this[_row]);
        this[_width] = 101;
        this[_height] = 171;
        this[_gameOver] = false;
        this[_status] = '';
        this.reset = reset;
    }

    update() {
        if(this.getRow() === 0 && this[_status] !== 'win') {
            this.gameOver('win');
            setTimeout(this.reset.bind(undefined, 'win'), 1000);
        }
    }

    render(ctx) {
        if(this.isGameOver() && this[_status] === 'lose') {
            if(this[_width] > 0 && this[_height] > 0) {
                ctx.drawImage(
                    Resources.get(this[_sprite]),
                    this[_x] += 5,
                    this[_y] += 5,
                    this[_width] -= 10,
                    this[_height] -= 10
                );
            }
        } else {
            ctx.drawImage(Resources.get(this[_sprite]), this[_x], this[_y]);
        }
    }

    handleInput(key) {
        if(!this[_gameOver]) {
            switch(key) {
            case 'left':
                if(this[_col] > 0) {
                    this[_col]--;
                    this[_x] -= Constants.COL_PIXELS;
                }
                break;
            case 'up':
                if(this[_row] > 0) {
                    this[_row]--;
                    this[_y] -= Constants.ROW_PIXELS;
                }
                break;
            case 'right':
                if(this[_col] < (Constants.TOTAL_COLS - 1)) {
                    this[_col]++;
                    this[_x] += Constants.COL_PIXELS;
                }
                break;
            case 'down':
                if(this[_row] < (Constants.TOTAL_ROWS - 1)) {
                    this[_row]++;
                    this[_y] += Constants.ROW_PIXELS;
                }
                break;
            default:
                break;
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
        return Constants.NUM_WATER_ROWS +
                    Constants.NUM_STONE_ROWS +
                    Util.getRandomInt(Constants.NUM_GRASS_ROWS);
    }

    static [_getRandomGrassY](row) {
        return (row * Constants.ROW_PIXELS) +
                    Player[Y_PIX_PLAYER_SELF_OFFSET];
    }

    static [_getRandomGrassColumn]() {
        return Util.getRandomInt(Constants.TOTAL_COLS);
    }

    static [_getRandomGrassX](col) {
        return col * Constants.COL_PIXELS;
    }
}

Player[Y_PIX_PLAYER_SELF_OFFSET] = -25;
