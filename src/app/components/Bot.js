import Move from './Move';
export default class Bot extends Move {
    constructor(bot, gameHeight, floor, gulfs, pipes, blocks) {
        super(bot, gameHeight, floor, gulfs, pipes, blocks);
        this.actionInterval = 1000 / 60;
        this.step = 1;
        let movingTo;
        setTimeout(() => {
            this.moving = setInterval(() => {
                const canGoRight = this.rightStep();
                const canGoLeft = this.leftStep();
                if (!canGoLeft) {
                    movingTo = 'right'
                    this.moveStop();
                    this.moveRigthStart();
                } else if(!canGoRight || !movingTo) {
                    movingTo = 'left';
                    this.moveStop();
                    this.moveLeftStart();
                }
            }, 100);
        }, 1000);
    }

    destroy() {
        this.killed = true;
        clearInterval(this.moving);
        this.moveStop();
    }
}