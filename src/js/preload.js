import {animateStartScreen} from './startScreen'
import {animateFinalScreen} from './finalScreen'
import {create, game_start, update} from './loop'

function preload () {
  this.load.setBaseURL('assets/')

  // this.load.spritesheet('spritesheet', 'assets/textures/platformerArt.svg', {frameWidth: 256, frameHeight: 256})
  // this.load.image('ground', 'ground.png')
  // this.load.image('cloud', 'cloud.png')
  // this.load.image('coin', 'coin.png')
  // this.load.image('jump', 'jump.png')
  
  
  this.load.spritesheet('boy_run', 'textures/game/sheets/boy_run.png', { frameWidth: 83, frameHeight: 90, endFrame: 30 })
  this.load.spritesheet('boy_jump', 'textures/game/sheets/boy_jump.png', { frameWidth: 83.9, frameHeight: 121, endFrame: 39 })

  this.load.spritesheet('girl_run', 'textures/game/sheets/girl_run.png', { frameWidth: 83, frameHeight: 103, endFrame: 30 })
  this.load.spritesheet('girl_jump', 'textures/game/sheets/girl_jump.png', { frameWidth: 83, frameHeight: 129, endFrame: 39 })

  this.load.spritesheet('bonus', 'textures/game/sheets/bonus.png', { frameWidth: 213, frameHeight: 222.4, endFrame: 34 })
  this.load.spritesheet('boost', 'textures/game/sheets/boost.png', { frameWidth: 600, frameHeight: 343.5, endFrame: 13 })
  this.load.spritesheet('jump_up', 'textures/game/sheets/jump_up.png', { frameWidth: 450, frameHeight: 180.5, endFrame: 11 })
  this.load.spritesheet('jump_down', 'textures/game/sheets/jump_down.png', { frameWidth: 450, frameHeight: 180.5, endFrame: 11 })

  // this.load.image('man', 'textures/game/man.png')
  // this.load.image('man_foto', 'textures/game/man_foto.png')
  // this.load.image('woman', 'textures/game/woman.png')
  // this.load.image('woman_foto', 'textures/game/woman_foto.png')
  // this.load.image('alarm_clock', 'textures/game/alarm_clock.png')
  // this.load.image('ground_1', 'textures/game/ground_1.png')
  // this.load.image('ground_2', 'textures/game/ground_2.png')
  // this.load.image('ground_3', 'textures/game/ground_3.png')
  // this.load.image('ground_long', 'textures/game/ground_long.png')
  this.load.image('heart', 'textures/game/heart.png')
  // this.load.image('light', 'textures/game/light.png')
  this.load.image('power', 'textures/game/power.png')
  this.load.image('school', 'textures/game/school.png')
  this.load.image('background', 'textures/game/background.png')

  this.load.image('tree_1', 'textures/game/decor/tree_1.png')
  this.load.image('tree_2', 'textures/game/decor/tree_2.png')
  this.load.image('bush_1', 'textures/game/decor/bush_1.png')
  // this.load.image('cloud_1', 'textures/game/decor/cloud_1.png')
  // this.load.image('cloud_2', 'textures/game/decor/cloud_2.png')
  // this.load.image('cloud_3', 'textures/game/decor/cloud_3.png')
  // this.load.image('cloud_4', 'textures/game/decor/cloud_4.png')

  this.load.image('tree_plane', 'textures/game/planes/tree_plane.png')
  this.load.image('long_plane', 'textures/game/planes/long_plane.png')

  this.load.image('plane_s_1', 'textures/game/planes/plane_s_1.png')
  this.load.image('plane_s_2', 'textures/game/planes/plane_s_2.png')
  this.load.image('plane_s_3', 'textures/game/planes/plane_s_3.png')
  this.load.image('plane_m_1', 'textures/game/planes/plane_m_1.png')
  this.load.image('plane_m_2', 'textures/game/planes/plane_m_2.png')
  this.load.image('plane_m_3', 'textures/game/planes/plane_m_3.png')
  // this.load.image('plane_b_1', 'textures/game/planes/plane_b_1.png')
  // this.load.image('plane_b_2', 'textures/game/planes/plane_b_2.png')
  this.load.image('plane_b_3', 'textures/game/planes/plane_b_3.png')

  this.load.image('hole', 'textures/game/hole.svg')
  this.load.image('finger', 'textures/game/finger.png')
  this.load.image('b_ph_1', 'textures/game/phrases/b_ph_1.png')
  this.load.image('b_ph_2', 'textures/game/phrases/b_ph_2.png')
  this.load.image('b_ph_3', 'textures/game/phrases/b_ph_3.png')
  this.load.image('b_ph_4', 'textures/game/phrases/b_ph_4.png')
  this.load.image('b_ph_5', 'textures/game/phrases/b_ph_5.png')
  this.load.image('g_ph_1', 'textures/game/phrases/g_ph_1.png')
  this.load.image('g_ph_2', 'textures/game/phrases/g_ph_2.png')
  this.load.image('g_ph_3', 'textures/game/phrases/g_ph_3.png')
  this.load.image('g_ph_4', 'textures/game/phrases/g_ph_4.png')
  this.load.image('g_ph_5', 'textures/game/phrases/g_ph_5.png')


  this.load.audio('90 seconds', 'sound/90 seconds.mp3')
  this.load.audio('bonus collect', 'sound/bonus collect.mp3')
  this.load.audio('choose hero', 'sound/choose hero.mp3')
  this.load.audio('collect energy', 'sound/collect energy.mp3')
  this.load.audio('fall down', 'sound/fall down.mp3')
  this.load.audio('hi, hero', 'sound/hi, hero.mp3')
  this.load.audio('run and jump', 'sound/run and jump.mp3')
  this.load.audio('clock', 'sound/clock.mp3')
  this.load.audio('music', 'sound/music.mp3')
  this.load.audio('winner game', 'sound/winner game.wav')

  // this.load.on('progress', function (value) {
  //   // console.log(value)
  // })
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