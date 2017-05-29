import Block from './Block';
import Money from './Money';

export default class MoneyBlock extends Block {
    constructor(top, left, count, moneys) {
        super(top, left);
        this.count = count || 1;
        this.type = 'money';
        this.moneys = moneys;
    }

    destroy() {
        if(this.count > 0) {
            this.count--;
            this.moneys.push(new Money(this.top - 10, this.left + 10, true));
            if(this.count === 0) this.type = 'emptyMoney';
        }
    }
}