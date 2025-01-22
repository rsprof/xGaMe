class Player {
    constructor(game) {
        this.game = game;
        this.x = 20;
        this.y = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 200;    
        this.width;
        this.height;    
        this.speedY;
        this.flapSpeed;
        this.collisionX;
        this.collisionY;
        this.collisionRadius;
        this.collided;
        this.energy = 30;
        this.maxEnergy = this.energy * 2;
        this.minEnergy = 15;
        this.charging;
        this.barSize;
    }

    draw() {
        this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        this.game.ctx.stroke();
    }

    update() {
        this.handleEnergy();

        this.y += this.speedY;

        if(!this.isTouchingBottom() && !this.charging)    { // Gravity (Alterado)
            this.speedY += this.game.gravity; // Gravity (Alterado)
        } // Gravity
        else    { // Gravity
            this.speedY = 0; // Gravity (Alterado)
        } // Gravity

        this.collisionY = this.y + this.height * 0.5;
    }

    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speedY = -8 * this.game.ratio;
        this.flapSpeed = 6 * this.game.ratio;
        this.collisionX = this.x + this.width * 0.5;
        this.collisionRadius = this.width * 0.5;
        this.collided = false;
        this.barSize = Math.floor(5 * this.game.ratio);
    }

    isTouchingBottom()  {
        return this.y >= this.game.height - this.height;
    }

    isTouchingTop() {
        return this.y <= 0;
    }

    flap()  {
        this.stopCharge();

        if(!this.isTouchingTop())    {
            this.speedY = -this.flapSpeed;
        }
    }

    handleEnergy()  {
        if(this.game.eventUpdate)   {
            if(this.energy < this.maxEnergy)    {
                this.energy += 1;
            }

            if(this.charging)    {
                this.energy -= 6;

                if(this.energy <= 0)    {
                    this.energy = 0;
                    this.stopCharge();
                }
            }
        }
    }

    startCharge()   {
        this.charging = true;
        this.game.speed = this.game.maxSpeed;
    }

    stopCharge()    {
        this.charging = false;
        this.game.speed = this.game.minSpeed;
    }
}