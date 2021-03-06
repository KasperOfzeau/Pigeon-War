import { GameObject } from "./gameobject.js";

export class Cloud extends GameObject {

    private scale : number = 0;
    private skin : number;

    constructor(tagName : string) {
        super(tagName);
        console.log("Cloud was created!");

        this.create();
    }

    private create() {
        // Generate random skin 
        this.skin = Math.floor(Math.random() * (2 - 0) + 0);
        let cloudImages = ["url(./images/cloud1.png)",
                           "url(./images/cloud2.png)"];
        this.div.style.backgroundImage = cloudImages[this.skin];

        // Generate a random x and y value within de width and height of the viewport
        this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth));
        this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight));

        // generate random scale size 
        this.scale = Math.random() * (7 - 2) + 2;

        // Set z-index based on sclae
        let zIndex = Math.floor(this.scale).toString();
        this.div.style.zIndex = zIndex;
        if(this.scale > 6.5) {this.div.style.zIndex = "1001";}

        // Set speed based on size
        this.xspeed = this.scale / 2;
    }

    public update() {
        // Move the cloud (x-value) to the left. 
        this.x -= this.xspeed;
        // Check if the cloud is completely outside the screen (left side)
        if(this.x + this.div.clientWidth * 3 < 0) {
            // Place the cloud on the right side outside the screen
            this.x = window.innerWidth + this.div.clientWidth;
            // Generate a random y-value
            this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight));
        }

        // Draw the fish on the right coordinate (x, y)
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
}