const _level = Symbol('level');

export class Dashboard {
    constructor(level) {
        this[_level] = level;
    }

    set level(level) { this[_level] = level; }

    get level() { return this[_level]; }

    update() {
    }

    render(ctx) {
        ctx.font = '24px arial';
        ctx.fillText(`Level ${this.level}`, 20, 30);
    }
}
