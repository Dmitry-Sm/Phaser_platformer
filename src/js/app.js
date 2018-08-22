import $ from 'jquery'
// import {
//   Game
// } from 'Phaser'
import {check} from './mod'
import {preload} from './preload'
import {create, game_start, update} from './loop'
import {animateFinalScreen} from './finalScreen'
import {animateStartScreen} from './startScreen'


$(document).ready(()=>{
    var config = {
    type: Phaser.AUTO,
    width: window.screen.width,
    height: window.screen.height,
    autoResize: true,
    antialias: true,
    // pixelArt: true,
    // zoom: 5,
    resolution: 1,
    roundPixels: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    }

    var game = new Phaser.Game(config)

    animateFinalScreen("init");
    animateStartScreen("init");
})

