(() => {
    class Enemy {
        constructor(speed) {
            this.sprite = 'images/enemy-bug.png';
            this.x = window.constants.X_BUG_START;
            this.y = window.util.getRandomStoneRowPixels();
            this.speed = speed;
        }

        update(dt) {
            this.x = this.x + (this.speed * dt);
            if(this.x > window.constants.CANVAS_WIDTH) {
                this.x = window.constants.X_BUG_START;
                this.y = window.util.getRandomStoneRowPixels();
            }
        }

        render() {
            window.ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y);
        }
    }

    window.Enemy = Enemy;
})();
