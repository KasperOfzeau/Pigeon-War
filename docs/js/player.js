import { Bullet } from "./bullet.js";
import { CollisionGameObject } from "./collisiongameobject.js";
export class Player extends CollisionGameObject {
    constructor(tagName) {
        super(tagName);
        this.yspeed = 0;
        this._bullets = [];
        this.lives = 3;
        this.shield = false;
        this.skin = "url(./images/pigeon.gif)";
        console.log("Player was created");
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.create();
    }
    get bullets() {
        return this._bullets;
    }
    set bullets(value) {
        this._bullets = value;
    }
    create() {
        this.div.classList.add("player");
        this.div.style.backgroundImage = this.skin;
        this.x = 100;
        this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight));
    }
    update() {
        this.y += this.yspeed;
        if (this.y < 50) {
            this.y = 50;
        }
        if (this.y > window.innerHeight - this.div.clientHeight) {
            this.y = window.innerHeight - this.div.clientHeight;
        }
        super.update();
    }
    setLive() {
        if (this.lives != 0) {
            this.lives -= 1;
        }
        if (this.lives === 1) {
            const oneLifeLeft = new Audio('./sounds/oneLifeLeft.wav');
            oneLifeLeft.play();
        }
    }
    getLives() {
        return this.lives;
    }
    setShield() {
        if (this.shield === false) {
            this.shield = true;
            this.skin = "url(./images/pigeon_with_shield.gif)";
            this.div.style.backgroundImage = this.skin;
        }
        else {
            this.shield = false;
            this.skin = "url(./images/pigeon.gif)";
            this.div.style.backgroundImage = this.skin;
        }
    }
    getShield() {
        return this.shield;
    }
    removeFromBullets(removedbullet) {
        this.bullets = this.bullets.filter(bullet => bullet !== removedbullet);
    }
    onKeyDown(e) {
        switch (e.key.toUpperCase()) {
            case "W":
            case "ARROWUP":
                this.yspeed = -5;
                break;
            case "S":
            case "ARROWDOWN":
                this.yspeed = 5;
                break;
        }
    }
    onKeyUp(e) {
        switch (e.key.toUpperCase()) {
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0;
                break;
            case " ":
                this.bullets.push(new Bullet());
                break;
        }
    }
}
//# sourceMappingURL=player.js.map