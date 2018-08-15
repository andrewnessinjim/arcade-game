(() => {
    const _getRandomStoneRow = Symbol('getRandomStoneRow');
    const _getRandomStoneY = Symbol('getRandomStoneY');

    const Y_PIX_BUG_SELF_OFFSET = Symbol('Y_PIX_BUG_SELF_OFFSET');
    const X_PIX_BUG_START = Symbol('X_PIX_BUG_START');

    class Enemy {
        constructor(speed) {
            this.sprite = 'images/enemy-bug.png';
            this.row = Enemy[_getRandomStoneRow]();
            this.x = Enemy[X_PIX_BUG_START];
            this.y = Enemy[_getRandomStoneY](this.row);
            this.speed = speed;
            this.width = 101;
        }

        update(dt) {
            if(!window.player.isGameOver()) {
                this.x = this.x + (this.speed * dt);
                if(this.x > window.constants.CANVAS_WIDTH) {
                    this.x = Enemy[X_PIX_BUG_START];
                    this.y = Enemy[_getRandomStoneY](this.row);
                }
            }
        }

        render() {
            window.ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y);
        }

        checkCollision(player) {
            if(!player.isGameOver()) { // Don't check collision if game is already over
                if(this.row === player.getRow() &&
                this.x - window.constants.COLLISION_OFFSET <= player.getX() + player.getWidth() &&
                this.x + window.constants.COLLISION_OFFSET + this.width >= player.getX()) {
                    player.gameOver('lose');
                    setTimeout(window.reset, 1000);
                }
            }
        }

        static [_getRandomStoneRow]() {
            return window.util.getRandomInt(window.constants.NUM_STONE_ROWS) +
                    window.constants.NUM_WATER_ROWS;
        }

        static [_getRandomStoneY](row) {
            return (row * window.constants.ROW_PIXELS) + Enemy[Y_PIX_BUG_SELF_OFFSET];
        }
    }

    // Avoid constants being loaded into closure of every Enemy object
    Enemy[Y_PIX_BUG_SELF_OFFSET] = -20;
    Enemy[X_PIX_BUG_START] = -200;

    window.Enemy = Enemy;
})();
