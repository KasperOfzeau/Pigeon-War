export class Bullet {
    constructor() {
        this.x = 0;
        this.y = 0;
        console.log('Created Bullet');
        this.create();
    }
    create() {
        var _a;
        this.div = document.createElement("bullet");
        (_a = document.querySelector("game")) === null || _a === void 0 ? void 0 : _a.appendChild(this.div);
        this.x = 100;
        let player = document.querySelector(".player").getBoundingClientRect();
        let playery = player.top;
        this.y = playery + this.div.clientHeight;
    }
    update() {
        this.x += 10;
        if (this.x - this.div.clientWidth > window.innerWidth) {
            this.div.remove();
        }
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    removeBullet() {
        this.div.remove();
    }
    getRectangle() {
        return this.div.getBoundingClientRect();
    }
}
//# sourceMappingURL=bullet.js.map