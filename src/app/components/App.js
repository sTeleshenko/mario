import Mario from './Mario';
import Bot from './Bot';
import Block from './Block';
import StaticBlock from './StaticBlock';
import MoneyBlock from './MoneyBlock';
import Money from './Money';
import Renderer from './Renderer';

export default class App {
    constructor(config) {
        this.config = config;
        this.camera = {
            left: 0,
            width: config.cameraWidth
        };
        this.moneys = config.moneys.map(item => new Money(item.top, item.left));
        this.blocks = config.blocks.map(block => {
            switch(block.type) {
                case 'static':
                    return new StaticBlock(block.top, block.left);
                case 'money':
                    return new MoneyBlock(block.top, block.left, block.count, this.moneys);
                default: return new Block(block.top, block.left);
            }
        });
        this.bots = config.bots.map(bot => {
            return new Bot(bot, config.gameHeight, config.floor, config.gulfs, config.pipes, this.blocks)
        });
        this.mario = new Mario(config, this.bots, this.blocks, this.camera, this.config.gameWidth, this.moneys);
        this.renderer = new Renderer(config, this.mario, this.bots, this.blocks, this.moneys, this.camera);
        this.listenEvents();
    }

    listenEvents() {
        let fireJump;
        document.addEventListener('keydown', (e) => {
            // console.log(e.keyCode)
            switch(e.keyCode) {
                case 39: 
                    this.mario.moveRigthStart();
                    break;
                case 37: 
                    this.mario.moveLeftStart();
                    break;
                case 38:
                    if(!fireJump) {
                        fireJump = setInterval(() => this.mario.startJump(), 1000 / 60);
                    }
            }
        });
        document.addEventListener('keyup', (e) => {
            switch(e.keyCode) {
                case 39: 
                case 37: 
                    this.mario.moveStop();
                    break;
                case 38:
                    if(fireJump) {
                        clearInterval(fireJump);
                        fireJump = 0;
                        this.mario.stopJump();
                    }
            }
        });
    }
}

  