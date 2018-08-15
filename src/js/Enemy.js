(() => {
    const _getRandomStoneRow = Symbol('getRandomStoneRow');
    const _getRandomStoneY = Symbol('getRandomStoneY');

    const Y_PIX_BUG_SELF_OFFSET = Symbol('Y_PIX_BUG_SELF_OFFSET');
    const X_PIX_BUG_START = Symbol('X_PIX_BUG_START');

    class Enemy {
        constructor(speed) {
            this.sprite = 'images/enemy-bug.png';
            this.x = Enemy[X_PIX_BUG_START];
            this.y = Enemy[_getRandomStoneY]();
            this.speed = speed;
        }

        update(dt) {
            this.x = this.x + (this.speed * dt);
            if(this.x > window.constants.CANVAS_WIDTH) {
                this.x = Enemy[X_PIX_BUG_START];
                this.y = Enemy[_getRandomStoneY]();
            }
        }

        render() {
            window.ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y);
        }

        static [_getRandomStoneRow]() {
            return window.util.getRandomInt(window.constants.NUM_STONE_ROWS) +
                    window.constants.NUM_WATER_ROWS;
        }

        static [_getRandomStoneY]() {
            return (this[_getRandomStoneRow]() * window.constants.ROW_PIXELS) + Enemy[Y_PIX_BUG_SELF_OFFSET];
        }
    }

    // Avoid constants being loaded into closure of every Enemy object
    Enemy[Y_PIX_BUG_SELF_OFFSET] = -20;
    Enemy[X_PIX_BUG_START] = -200;

    window.Enemy = Enemy;
})();
