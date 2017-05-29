export default class Gravity{
    constructor(person, gameHeight, floor, gulfs, pipes, blocks) {
        this.gameHeight = gameHeight;
        this.floor = floor;
        this.gulfs = gulfs;
        this.pipes = pipes;
        this.blocks = blocks;
        this.person = person;
        this.q = 9.8 / 60;
        this.speedUp = 0.1;
        this.gravitate();
    }

    gravitate() {
        setInterval(() => {
            if(this.getMaxTop() >= this.person.top + this.person.height) {
                this.person.top = this.person.top + this.speedUp * this.q;
                this.speedUp += 0.3;
            } else {
                this.person.top = this.getMaxTop() - this.person.height;
                if(this.person.top + this.person.height === this.gameHeight) this.destroy();
                this.speedUp = 0.1
            }
        }, 1000 / 60);
    }

    getMaxTop() {
        let downBlocks = this.blocks.filter(block => {
            return this.person.left + this.person.width > block.left && block.left + block.width > this.person.left;
        })
        let minDistance = 10000;
        downBlocks = downBlocks.filter(block => {
            let distance = block.top - (this.person.top + this.person.height);
            if(distance <= minDistance && distance >= -this.speedUp * this.q) {
                minDistance = distance;
                return true;
            }
            return false;
        });
        downBlocks.sort((a, b) => {
            if(a.top > b.top) return 1;
            if(a.top < b.top) return -1;
            return 0;
        });
        const downPipes = this.pipes.filter(pipe => {
            return this.person.left + this.person.width > pipe.left && pipe.left + pipe.width > this.person.left;
        });
        if(downBlocks.length && downPipes.length) {
            if(downBlocks[0].top <= this.gameHeight - (this.floor + downPipes[0].height)) {
                return downBlocks[0].top
            } else {
                return this.gameHeight - (this.floor + downPipes[0].height);
            }
        } else if(downBlocks.length) {
            return downBlocks[0].top;
        } else if(downPipes.length) {
            return this.gameHeight - (this.floor + downPipes[0].height);
        }
        const downGulfs = this.gulfs.filter(gulf => {
            return this.person.left >= gulf.left && gulf.left + gulf.width >= this.person.left + this.person.width;
        });
        if(downGulfs.length) return this.gameHeight;
        return this.gameHeight - this.floor;
    }
    
    destroy() {
        console.log('destroy');
    }
}