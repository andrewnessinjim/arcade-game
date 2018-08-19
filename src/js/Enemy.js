import * as Util from './util';
import Constants from './constants';
import Resources from './resources';


const _getRandomStoneRow = Symbol('getRandomStoneRow');
const _getRandomStoneY = Symbol('getRandomStoneY');

const Y_PIX_BUG_SELF_OFFSET = Symbol('Y_PIX_BUG_SELF_OFFSET');
const X_PIX_BUG_START = Symbol('X_PIX_BUG_START');

export default class Enemy {
    constructor(speed, player, reset) {
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

    update(dt) {
        if(!this.player.isGameOver()) { // Stop moving when game is over. This gives visual feedback that the game is over
            this.x = this.x + (this.speed * dt);
            if(this.x > Constants.CANVAS_WIDTH) { // Start over if the enemy has moved past the canvas
                this.x = Enemy[X_PIX_BUG_START];
                this.row = Enemy[_getRandomStoneRow]();
                this.y = Enemy[_getRandomStoneY](this.row);
            }
        }
    }

    render(ctx) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    checkCollision() {
        if(!this.player.isGameOver()) { // Don't check collision if game is already over
        // Use the row number directly for checking the collision, because the bug moves in single row only
        // COLLISION_OFFSET is used to avoid collision when the actual PNG's border collides. It gives a slight overlapping effect
            if(this.row === this.player.getRow() &&
                this.x - Constants.COLLISION_OFFSET <= this.player.getX() + this.player.getWidth() &&
                this.x + Constants.COLLISION_OFFSET + this.width >= this.player.getX()) {

                // Notify player when collision occurs
                this.player.gameOver('lose');

                // Reset the game after a second. This gives a second of feedback to the user that the game is over
                setTimeout(this.reset.bind(undefined, 'lose'), 1000);
            }
        }
    }

    static [_getRandomStoneRow]() {
        return Util.getRandomInt(Constants.NUM_STONE_ROWS) +
                    Constants.NUM_WATER_ROWS;
    }

    static [_getRandomStoneY](row) {
        return (row * Constants.ROW_PIXELS) + Enemy[Y_PIX_BUG_SELF_OFFSET];
    }
}

// Avoid constants being loaded into closure of every Enemy object by declaring it on the class itself
Enemy[Y_PIX_BUG_SELF_OFFSET] = -20;
Enemy[X_PIX_BUG_START] = -200;
