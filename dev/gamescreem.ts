import { Bullet } from "./bullet.js";
import { Cloud } from "./cloud.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { Powerup } from "./powerup.js";

let game = document.querySelector("game");

export class GameScreen {

    private clouds: Cloud[] = [];
    private player: Player;
    private spawnCounterEnemies: number = 0;
    private enemies: Enemy[] = [];
    private powerups: Powerup[] = [];
    private introductionDiv: HTMLElement;
    private gameStats: HTMLElement;
    private gameScore: number = 0;

    constructor() {
        console.log("Game was created!");

        // Intro text
        this.introductionDiv = document.createElement("introductionDiv");
        game?.appendChild(this.introductionDiv);

        const text = document.createElement("h1");
        this.introductionDiv.appendChild(text);

        text.innerText = "Volume up! Instructions";

        // Instructions sound
        const introductionSound = new Audio("./sounds/introduction.wav");
        introductionSound.play();
        // When audio is done playing create all elements
        introductionSound.onended = () => {

            // Remove intro text
            this.introductionDiv.remove();

            // Create gameStats menu
            this.gameStats = document.createElement("gamestats");
            game?.appendChild(this.gameStats);

            // Create name title 
            let title = document.createElement("name");
            this.gameStats?.appendChild(title);
            title.innerHTML = "Pigeon War";

            // Create clouds
            for (let i = 0; i < 30; i++) {
                this.clouds.push(new Cloud("cloud"));
            }

            //Create player
            this.player = new Player("player");

            // Create enemies
            for (let i = 0; i < 5; i++) {
                this.enemies.push(new Enemy("enemy"));
            }

            // Create powerup on random time
            setTimeout(() => {
                this.powerups.push(new Powerup("powerup"));
            }, Math.floor(Math.random() * (25000 - 15000) + 15000));

            // Create display lives holder 
            let liveHolder = document.createElement("lives");
            for (let i = 0; i < this.player.getLives(); i++) {
                let life = document.createElement("life");
                life.style.backgroundImage = "url(./images/life.png)";
                liveHolder.appendChild(life);
            }
            this.gameStats?.appendChild(liveHolder);

            // Create display score 
            let scoreHolder = document.createElement("score");
            this.gameStats?.appendChild(scoreHolder);
            let scoreString = `Score: 0`;
            scoreHolder!.innerHTML = scoreString;

            this.gameLoop();
        }
    }

    private gameLoop() {
        if (this.player.getLives() != 0) {
            // update the clouds
            for (let c of this.clouds) {
                c.update();
            }

            // Create new enemy every 15 seconds
            this.spawnCounterEnemies++
            if (this.spawnCounterEnemies > 900) {
                this.spawnCounterEnemies = 0
                this.enemies.push(new Enemy("enemy"));
            }

            // update the enemies
            for (let e of this.enemies) {
                e.update();

                // check collision with player
                let hit = this.checkCollision(e.getRectangle(), this.player.getRectangle());
                if (hit) {
                    e.killEnemy();
                    if (this.player.getShield() === false) {
                        this.player.setLive();
                    }

                    // Display lives 
                    let liveHolder = document.querySelector("lives");
                    liveHolder!.innerHTML = "";
                    for (let i = 0; i < this.player.getLives(); i++) {
                        let life = document.createElement("life");
                        life.style.backgroundImage = "url(./images/life.png)";
                        liveHolder!.appendChild(life);
                    }
                }
            }
            // update bullets
            for (let b of this.player.bullets) {
                b.update();

                // Check collision with enemies
                for (let e of this.enemies) {
                    let hit = this.checkCollision(b.getRectangle(), e.getRectangle());
                    if (hit) {
                        e.killEnemy();
                        b.removeBullet();
                        this.player.removeFromBullets(b);
                        this.gameScore += 50;
                        // Display score 
                        let scoreHolder = document.querySelector("score");
                        let scoreString = `Score: ${this.gameScore}`;
                        scoreHolder!.innerHTML = scoreString;
                    }
                }
            }
            // loop trough powerups
            for (let p of this.powerups) {
                // update powerups
                p.update();

                // check collision with powerups
                let hit = this.checkCollision(p.getRectangle(), this.player.getRectangle());
                if (hit) {
                    this.player.setShield();
                    p.removePowerup();

                    const shieldActivated = new Audio('./sounds/shieldActivated.wav');
                    shieldActivated.play();

                    setTimeout(() => {
                        this.player.setShield();
                        const shieldDown = new Audio('./sounds/shieldDown.wav');
                        shieldDown.play();
                        setTimeout(() => {
                            this.powerups.push(new Powerup("powerup"));
                        }, Math.floor(Math.random() * (100000 - 15000) + 15000));
                    }, 15000);
                }
            }
            // update player 
            this.player.update();

            requestAnimationFrame(() => this.gameLoop());
        } else {
            let gameOverTitle = document.createElement("h1");
            let yourScore = document.createElement("h2");
            game?.appendChild(gameOverTitle);
            game?.appendChild(yourScore);

            gameOverTitle.innerText = "Game Over";
            yourScore.innerText = `Your score: ${this.gameScore}`;
            gameOverTitle.classList.add("gameover");
            yourScore.classList.add("yourscore");

            const gameOver = new Audio('./sounds/gameOver.wav');
            gameOver.play();
        }
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }

    public update() { }
}