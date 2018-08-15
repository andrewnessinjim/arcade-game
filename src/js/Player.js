(() => {
    class Player {
        constructor() {
            this.sprite = 'images/char-boy.png';
            this.x = window.util.getRandomGrassColumnPixels();
            this.y = window.util.getRandomGrassRowPixels();
        }

        update() {
        }

        render() {
            window.ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y);
        }

        handleInput() {
        }
    }

    window.Player = Player;
})();
