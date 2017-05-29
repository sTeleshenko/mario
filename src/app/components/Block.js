export default class Block {
    constructor(top, left) {
        this.top = top;
        this.left = left;
        this.height = 30;
        this.width = 30;
        this.deleted = false;
        this.type = 'default';
    }

    destroy() {
        this.deleted = true;
    }
}