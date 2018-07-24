
function preload () {
  this.load.setBaseURL('assets/textures/')

  // this.load.spritesheet('spritesheet', 'assets/textures/platformerArt.svg', {frameWidth: 256, frameHeight: 256})
  // this.load.image('ground', 'ground.png')
  // this.load.image('cloud', 'cloud.png')
  // this.load.image('coin', 'coin.png')
  // this.load.image('jump', 'jump.png')
  
  
  this.load.spritesheet('man_run', 'game/man_run.png', { frameWidth: 276, frameHeight: 298, endFrame: 13 })
  this.load.spritesheet('bonus', 'game/bonus.png', { frameWidth: 213, frameHeight: 222, endFrame: 34 })

  this.load.image('man', 'game/man.png')
  this.load.image('man_foto', 'game/man_foto.png')
  this.load.image('woman', 'game/woman.png')
  this.load.image('woman_foto', 'game/woman_foto.png')
  this.load.image('alarm_clock', 'game/alarm_clock.png')
  this.load.image('cloud', 'game/cloud.png')
  this.load.image('ground_1', 'game/ground_1.png')
  this.load.image('ground_2', 'game/ground_2.png')
  this.load.image('ground_3', 'game/ground_3.png')
  this.load.image('ground_long', 'game/ground_long.png')
  this.load.image('heart', 'game/heart.png')
  this.load.image('light', 'game/light.png')
  this.load.image('power', 'game/power.png')
  this.load.image('school', 'game/school.png')
  this.load.image('tree', 'game/tree.png')
  this.load.image('background', 'game/background.png')


  // console.log(this.load)
  // this.load.image('sky', 'assets/skies/space3.png')
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  // this.load.spritesheet('spritesheet', 'assets/sprites/fruitnveg32wh37.png', {frameWidth: 32, frameHeight: 32})
  

}

export {preload}