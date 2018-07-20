import $ from 'jquery'
// import {
//   Game
// } from 'Phaser'
import {check} from './mod'
import {preload} from './preload'
import {create, update} from './loop'


$(document).ready(()=>{
  var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
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
  };

  var game = new Phaser.Game(config);

})


// const risezeWindow = (event) => {
//   console.log(event)
  
// }
// window.addEventListener("resize", risezeWindow)

