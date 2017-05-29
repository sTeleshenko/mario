import Block from './Block';

export default class StaticBlock extends Block {
    constructor(top, left) {
        super(top, left);
        this.type = 'static';
    }

    destroy() {}
}