import {animateStartScreen} from './startScreen'
import {animateFinalScreen} from './finalScreen'
import {create, game_start, update} from './loop'

function preload () {
  this.load.setBaseURL('assets/textures/')

  // this.load.spritesheet('spritesheet', 'assets/textures/platformerArt.svg', {frameWidth: 256, frameHeight: 256})
  // this.load.image('ground', 'ground.png')
  // this.load.image('cloud', 'cloud.png')
  // this.load.image('coin', 'coin.png')
  // this.load.image('jump', 'jump.png')
  
  
  this.load.spritesheet('boy_run', 'game/sheets/boy_run.png', { frameWidth: 83, frameHeight: 90, endFrame: 30 })
  this.load.spritesheet('boy_jump', 'game/sheets/boy_jump.png', { frameWidth: 83.9, frameHeight: 121, endFrame: 39 })

  this.load.spritesheet('girl_run', 'game/sheets/girl_run.png', { frameWidth: 83, frameHeight: 103, endFrame: 30 })
  this.load.spritesheet('girl_jump', 'game/sheets/girl_jump.png', { frameWidth: 83, frameHeight: 129, endFrame: 39 })

  this.load.spritesheet('bonus', 'game/sheets/bonus.png', { frameWidth: 213, frameHeight: 222.4, endFrame: 34 })
  this.load.spritesheet('boost', 'game/sheets/boost.png', { frameWidth: 600, frameHeight: 343.5, endFrame: 13 })
  this.load.spritesheet('jump_up', 'game/sheets/jump_up.png', { frameWidth: 450, frameHeight: 180.5, endFrame: 11 })
  this.load.spritesheet('jump_down', 'game/sheets/jump_down.png', { frameWidth: 450, frameHeight: 180.5, endFrame: 11 })

  // this.load.image('man', 'game/man.png')
  // this.load.image('man_foto', 'game/man_foto.png')
  // this.load.image('woman', 'game/woman.png')
  // this.load.image('woman_foto', 'game/woman_foto.png')
  // this.load.image('alarm_clock', 'game/alarm_clock.png')
  // this.load.image('ground_1', 'game/ground_1.png')
  // this.load.image('ground_2', 'game/ground_2.png')
  // this.load.image('ground_3', 'game/ground_3.png')
  // this.load.image('ground_long', 'game/ground_long.png')
  this.load.image('heart', 'game/heart.png')
  // this.load.image('light', 'game/light.png')
  this.load.image('power', 'game/power.png')
  this.load.image('school', 'game/school.png')
  this.load.image('background', 'game/background.png')

  this.load.image('tree_1', 'game/decor/tree_1.png')
  this.load.image('tree_2', 'game/decor/tree_2.png')
  this.load.image('bush_1', 'game/decor/bush_1.png')
  // this.load.image('cloud_1', 'game/decor/cloud_1.png')
  // this.load.image('cloud_2', 'game/decor/cloud_2.png')
  // this.load.image('cloud_3', 'game/decor/cloud_3.png')
  // this.load.image('cloud_4', 'game/decor/cloud_4.png')

  this.load.image('tree_plane', 'game/planes/tree_plane.png')
  this.load.image('long_plane', 'game/planes/long_plane.png')

  this.load.image('plane_s_1', 'game/planes/plane_s_1.png')
  this.load.image('plane_s_2', 'game/planes/plane_s_2.png')
  this.load.image('plane_s_3', 'game/planes/plane_s_3.png')
  this.load.image('plane_m_1', 'game/planes/plane_m_1.png')
  this.load.image('plane_m_2', 'game/planes/plane_m_2.png')
  this.load.image('plane_m_3', 'game/planes/plane_m_3.png')
  // this.load.image('plane_b_1', 'game/planes/plane_b_1.png')
  // this.load.image('plane_b_2', 'game/planes/plane_b_2.png')
  this.load.image('plane_b_3', 'game/planes/plane_b_3.png')

  this.load.image('hole', 'game/hole.svg')
  this.load.image('finger', 'game/finger.png')
  this.load.image('b_ph_1', 'game/phrases/b_ph_1.png')
  this.load.image('b_ph_2', 'game/phrases/b_ph_2.png')
  this.load.image('b_ph_3', 'game/phrases/b_ph_3.png')
  this.load.image('b_ph_4', 'game/phrases/b_ph_4.png')
  this.load.image('b_ph_5', 'game/phrases/b_ph_5.png')
  this.load.image('g_ph_1', 'game/phrases/g_ph_1.png')
  this.load.image('g_ph_2', 'game/phrases/g_ph_2.png')
  this.load.image('g_ph_3', 'game/phrases/g_ph_3.png')
  this.load.image('g_ph_4', 'game/phrases/g_ph_4.png')
  this.load.image('g_ph_5', 'game/phrases/g_ph_5.png')


  this.load.on('progress', function (value) {
    // console.log(value)
  })
  this.load.on('complete', function () {
    console.log('load complete')
    animateStartScreen("startAnim")
    // animateFinalScreen("startAnim")

    // setTimeout(() => {
    //   game_start('girl')
    // }, 500)
  })

  // console.log(this.load)
  // this.load.image('sky', 'assets/skies/space3.png')
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  // this.load.spritesheet('spritesheet', 'assets/sprites/fruitnveg32wh37.png', {frameWidth: 32, frameHeight: 32})
}

export {preload}