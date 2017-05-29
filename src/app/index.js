'use strict';
// import store from './redux';
import App from './components/App';

const app = new App({
    element: 'app',
    gravity: 9.8,
    floor: 180,
    gameWidth: 2000,
    gameHeight: 600,
    cameraWidth: 1200,
    mario: {
        top: 100,
        left: 20,
        width: 30,
        height: 30
    },
    gulfs: [
        {
            left: 70,
            width: 70
        },
        {
            left: 770,
            width: 40
        }
    ],
    pipes: [
        {
            left: 270,
            height: 50,
            width: 100
        },
        {
            left: 500,
            height: 50,
            width: 50
        },
        {
            left: 700,
            height: 50,
            width: 50
        },
        {
            left: 1100,
            height: 50,
            width: 50
        }
    ],
    blocks: [
        {
            top: 330,
            left: 150,
            type: 'static',
        },
        {
            top: 300,
            left: 230,
            type: 'default'
        },
        {
            top: 270,
            left: 230,
            type: 'default'
        },
        {
            top: 300,
            left: 260,
            type: 'money',
            count: 10
        },
        {
            top: 300,
            left: 320,
            type: 'secret'
        },
        {
            top: 300,
            left: 350,
            type: 'secret'
        },
        {
            top: 300,
            left: 380,
            type: 'secret'
        },
        {
            top: 300,
            left: 410,
            type: 'secret'
        },
        {
            top: 270,
            left: 410,
            type: 'secret'
        },
        {
            top: 300,
            left: 500,
            type: 'secret'
        },
        {
            top: 300,
            left: 530,
            type: 'secret'
        },
        {
            top: 300,
            left: 560,
            type: 'secret'
        },
        {
            top: 300,
            left: 870,
            type: 'secret'
        },
        {
            top: 300,
            left: 840,
            type: 'secret'
        },
        {
            top: 300,
            left: 900,
            type: 'secret'
        },
        {
            top: 300,
            left: 930,
            type: 'secret'
        },
        {
            top: 300,
            left: 960,
            type: 'secret'
        },
        {
            top: 300,
            left: 290,
            type: 'secret'
        },
        {
            top: 220,
            left: 930,
            type: 'secret'
        }
    ],
    bots: [
        ...[13, 4, 7, 8, 9, 10].map(item => {
            return {
                top: 100 + item * item,
                left: 270 + item * item * item,
                width: 20,
                height: 20
            }
        }),
    ],
    moneys: [
        {
            top: 280,
            left: 330
        },
        {
            top: 370,
            left: 150
        },
        {
            top: 370,
            left: 190
        }
    ]
});