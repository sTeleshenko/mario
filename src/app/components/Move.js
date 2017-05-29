import Gravity from './Gravity';

export default class Move extends Gravity {
    constructor(person, gameHeight, floor, gulfs, pipes, sections) {
        super(person, gameHeight, floor, gulfs, pipes, sections);
        this.moveRef;
        this.step = 2;
        this.inCamera = false;
    }
    moveRigthStart(state) {
        if (this.moveRef) return false;
        this.moveRef = setInterval(() => {
            this.person.left += this.rightStep();
        }, this.actionInterval);
    }
    moveStop() {
        if (!this.moveRef) return false;
        clearInterval(this.moveRef);
        this.moveRef = null;
    }
    moveLeftStart(state) {
        if (this.moveRef) return false;
        this.moveRef = setInterval(() => {
            if(this.inCamera && this.person.left - this.camera.left < 20) return false;
            this.person.left += this.leftStep();
        }, this.actionInterval);
    }

    rightStep() {
        const rightWall = [
            ...this.blocks.filter(block => {
                let width = (this.person.left + this.person.width) - block.left;
                return width >= 0 && width < 2 &&
                    (block.top + block.height > this.person.top && this.person.top + this.person.height > block.top);
            }),
            ...this.pipes.filter(pipe => {
                let width = (this.person.left + this.person.width) - pipe.left;
                return width >= 0 && width < 2 &&
                    this.person.top + this.person.height > this.gameHeight - (this.floor + pipe.height);
            }),
            ...this.gulfs.filter(gulf => {
                let width = (this.person.left + this.person.width) - (gulf.left + gulf.width);
                return width >= 0 && width < 2 &&
                    this.person.top + this.person.height > this.gameHeight - this.floor;
            })
        ];
        return rightWall.length ? 0 : this.step;
    }


    leftStep() {
        const leftWall = [
            ...this.blocks.filter(block => {
                let width = this.person.left - (block.left + block.width);
                return width >= 0 && width < 2 &&
                    (block.top + block.height > this.person.top && this.person.top + this.person.height > block.top);
            }),
            ...this.pipes.filter(pipe => {
                let width = this.person.left - (pipe.left + pipe.width);
                return width >= 0 && width < 2 &&
                    this.person.top + this.person.height > this.gameHeight - (this.floor + pipe.height);
            }),
            ...this.gulfs.filter(gulf => {
                let width = this.person.left - gulf.left;
                return width >= 0 && width < 2 &&
                    this.person.top + this.person.height > this.gameHeight - this.floor;
            })
        ];
        return leftWall.length ? 0 : -this.step;
    }
}