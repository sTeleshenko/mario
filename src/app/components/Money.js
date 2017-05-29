export default class Money {
    constructor(top, left, autofly) {
        this.top = top;
        this.left = left;
        this.width = 10;
        this.height = 10;
        this.flying = false;
        if (autofly) {
            this.fly();
        }
    }

    fly() {
        this.flying = true;
        let flyed = 0;
        let flyRef = setInterval(() => {
            this.top -= 1;
            flyed -= 1;
            if (flyed < -40) {
                clearInterval(flyRef);
                this.deleted = true;
            }
        }, 1000 / 60);
    }
}