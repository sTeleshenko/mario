import canvas from 'fabric';
const { StaticCanvas, Circle, Rect, util } = canvas.fabric;

export default class Renderer {
    constructor(config, mario, bots, blocks, moneys, camera) {
        this.mario = mario;
        this.bots = bots;
        this.blocks = blocks;
        this.moneys = moneys;
        this.camera = camera;
        this.pipes = config.pipes;
        this.canvas = new StaticCanvas(config.element);
        //create floor
        this.gulfs = [
            {
                left: 0,
                width: 0
            },
            ...config.gulfs.sort((a, b) => {
                if (a.left > b.left) return 1;
                if (a.left < b.left) return -1;
                return 0;
            })
        ];
        this.gulfsRefs = this.gulfs.map((gulf, i) => {
            const ref = new Rect({
                left: gulf.left + gulf.width - this.camera.left,
                top: config.gameHeight - config.floor,
                fill: 'green',
                width: (this.gulfs[i + 1] ? this.gulfs[i + 1].left - (gulf.left + gulf.width) : config.gameWidth - (gulf.left + gulf.width)),
                height: config.floor
            })
            this.canvas.add(ref);
            return ref;
        })

        //add pipes

        this.pipesRefs = this.pipes.map(pipe => {
            const pipeRect = new Rect({
                left: pipe.left - this.camera.left,
                top: config.gameHeight - config.floor - pipe.height,
                fill: 'orange',
                width: pipe.width,
                height: pipe.height
            });
            this.canvas.add(pipeRect);
            return pipeRect;
        })

        //creating sections
        this.blockColors = {
            default: '#ffa000',
            static: '#e65100',
            secret: '#ff9800',
            money: 'blue',
            emptyMoney: '#e65100'
        }

        this.blocksRefs = this.blocks.map(block => {
            let blockRef = new Rect({
                left: block.left - this.camera.left,
                top: block.top,
                width: block.width,
                height: block.height,
                fill: this.blockColors[block.type],
                stroke: 'black',
                strokeWidth: 1
            });
            this.canvas.add(blockRef);
            return blockRef;
        });


        //creating bots
        this.botsRect = [];
        this.bots.forEach(bot => {
            const botRect = new Rect({
                left: bot.person.left - this.camera.left,
                top: bot.person.top,
                fill: 'black',
                width: bot.person.width,
                height: bot.person.height
            });
            this.botsRect.push(botRect);
            this.canvas.add(botRect);
        });

        this.moneysRef = this.moneys.map(item => this.createMoney(item));

        //create mario
        this.marioRect = new Rect({
            width: this.mario.person.width,
            height: this.mario.person.height,
            fill: 'red',
            left: this.mario.person.left - this.camera.left,
            top: this.mario.person.top
        });
        this.canvas.add(this.marioRect);
        this.render()
    }

    render() {
        const frame = () => {
            this.marioRect.set({
                left: this.mario.person.left - this.camera.left,
                top: this.mario.person.top
            });
            for (let index = 0; index < this.bots.length; index++) {
                let bot = this.bots[index];
                if (bot.killed) {
                    this.canvas.remove(this.botsRect[index]);
                    this.botsRect.splice(index, 1);
                    this.bots.splice(index, 1);
                    index--;
                } else {
                    this.botsRect[index].set({
                        left: bot.person.left - this.camera.left,
                        top: bot.person.top
                    })
                };
            }

            for (let i = 0; i < this.blocks.length; i++) {
                if (this.blocks[i].deleted) {
                    this.canvas.remove(this.blocksRefs[i]);
                    this.blocksRefs.splice(i, 1);
                    this.blocks.splice(i, 1);
                    i--;
                } else {
                    this.blocksRefs[i].set({
                        left: this.blocks[i].left - this.camera.left,
                        fill: this.blockColors[this.blocks[i].type]
                    });
                }
            }

            this.gulfs.forEach((item, index) => {
                this.gulfsRefs[index].set({
                    left: item.left + item.width - this.camera.left
                });
            });
            this.pipes.forEach((item, index) => {
                this.pipesRefs[index].set({
                    left: item.left - this.camera.left
                });
            });
            for (let i = 0; i < this.moneys.length; i++) {
                if (!this.moneysRef[i]) {
                    this.moneysRef.push(this.createMoney(this.moneys[i]));
                } else if (!this.moneys[i].deleted) {
                    this.moneysRef[i].set({
                        top: this.moneys[i].top,
                        left: this.moneys[i].left - this.camera.left
                    });
                } else {
                    this.canvas.remove(this.moneysRef[i]);
                    this.moneysRef.splice(i, 1);
                    this.moneys.splice(i, 1);
                    i--;
                }
            }
            this.canvas.renderAll();
            util.requestAnimFrame(frame);
        }
        frame()
    }

    createMoney({top, left, width, height}) {
        let moneyRef = new Rect({
            width,
            height,
            top: top,
            left: left - this.camera.left,
            fill: 'yellow'
        });
        this.canvas.add(moneyRef);
        return moneyRef;
    }
}