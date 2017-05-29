import Move from './Move';
export default class Mario extends Move {
    constructor({ mario, gameHeight, floor, gulfs, pipes }, bots, blocks, camera, gameWidth, moneys) {
        super(mario, gameHeight, floor, gulfs, pipes, blocks);
        this.jumping = false;
        this.jumpingPress = false;
        this.jumpStep = -3;
        this.actionInterval = 1000 / 60;
        this.bots = bots;
        this.jumpRef;
        this.camera = camera;
        this.inCamera = true;
        this.gameWidth = gameWidth;
        this.moneys = moneys;
        this.detectBots();
        this.updateCamera();
    }
    startJump() {
        let toEarhDistacnce = this.getMaxTop() - (this.person.top + this.person.height);
        if (toEarhDistacnce > 0.05 || this.jumpRef || !this.canJump()) return false;
        this.jumping = true;
        this.jumpingPress = true;
        let jumped = 0;
        this.jumpRef = setInterval(() => {

            if (!this.canJump()) {
                this.stopJump();
            } else {
                jumped += this.jumpStep;
                this.person.top += this.jumpStep;
            }

            if (!this.jumpingPress || jumped < -100) {
                clearInterval(this.jumpRef);
                this.jumpRef = 0;
                this.jumping = false;
            }
        }, this.actionInterval);
    }

    canJump() {
        let topBlocks = this.blocks.filter(block => {
            return this.person.left + this.person.width > block.left && block.left + block.width > this.person.left;
        })
        topBlocks = topBlocks.filter(block => {
            let distance = this.person.top - (block.top + block.height);
            if (distance < Math.abs(this.jumpStep) - this.speedUp * this.q && distance > this.jumpStep + this.speedUp * this.q) {
                return true;
            }
            return false;
        });
        if (topBlocks.length) {
            topBlocks.forEach(block => block.destroy())
            return false;
        };
        return true;
    }

    stopJump() {
        this.jumpingPress = false;
    }

    detectBots() {
        setInterval(() => {
            const killedBots = this.bots.filter(bot => {
                const distantion = this.person.top + this.person.height - bot.person.top;
                return this.person.left + this.person.width > bot.person.left &&
                    bot.person.left + bot.person.width > this.person.left &&
                    distantion > -3 && distantion < 0 && !this.jumping;
            })
            if (killedBots.length) {
                killedBots.forEach(bot => bot.destroy());
            }
            const contactBots = this.bots.filter(bot => {
                let height = this.person.top - bot.person.top;
                return this.person.left + this.person.width > bot.person.left && bot.person.left + bot.person.width > this.person.left &&
                    this.person.top + this.person.height > bot.person.top && bot.person.top + bot.person.height > this.person.top;
            });
            if (contactBots.length) {
                this.destroy();
            }
            const contactMoneys = this.moneys.filter(item => {
                if(item.flying) return false;
                let height = this.person.top - item.top;
                return this.person.left + this.person.width > item.left && item.left + item.width > this.person.left &&
                    this.person.top + this.person.height > item.top && item.top + item.height > this.person.top;
            });
            contactMoneys.forEach(item => item.fly());
        }, this.actionInterval);
    }

    updateCamera() {
        setInterval(() => {
            if (this.person.left > this.camera.left + 400 && this.camera.left + this.camera.width < this.gameWidth) {
                this.camera.left = this.person.left - 400;
            }
        }, this.actionInterval);
    }

    destroy() {
        location.reload();
    }
}