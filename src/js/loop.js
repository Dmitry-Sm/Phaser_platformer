import {Player} from './player'

let player,
  platforms,
  coins,
  camera,
  controle,
  debug_label,
  display,
  background

let w = window.innerWidth,
  h = window.innerHeight,
  wquat = w/4


function create () {

  display = this.add.zone(w/2, h/2, w - 10, h - 10)

  background = this.add.tileSprite(0, 0, w, h, 'background')
  background.scrollFactorX = 0
  background.scrollFactorY = 0.1
  Phaser.Display.Align.In.Center (background, display)
  
  var anim_config = {
    key: 'run',
    frames: this.anims.generateFrameNumbers('man_run', { start: 0, end: 13, first: 0 }),
    frameRate: 35,
    repeat: -1
  }
  this.anims.create(anim_config);


  player = new Player({
    type: 'men',
    sprite: this.physics.add.sprite(200, 400, 'man_run', 14).setScale(0.3, 0.3)
  })

  player.sprite.anims.play('run')

  console.log(player.sprite.anims)

  player.sprite.setBounce(0)
  let plw = player.sprite.body.width,
      plh = player.sprite.body.height

  console.log(plh)

  player.sprite.setSize(140, 790)
  player.sprite.setOrigin(1.04, 0)


  let platform_types = [
    {
      name: 'ground_1',
      width: 202
    },
    {
      name: 'ground_2',
      width: 202
    },
    {
      name: 'ground_3',
      width: 148
    }
  ]

  let path = {
    length: 0
  }

  platforms = this.physics.add.staticGroup()

  const addPlatform = (type) => {
    platforms.create(path.length, h, platform_types[type].name).setOrigin(0, 1).setScale(0.3, 0.2).refreshBody()
    path.length += platform_types[type].width
  }

  addPlatform(1)
  addPlatform(0)
  path.length += 0
  addPlatform(1)
  addPlatform(2)
  addPlatform(1)

  for (let i = 3; i < 24; i++) {
    let rnd = Math.floor(Math.random()*3)
    
    addPlatform(rnd)
    path.length += 70*Math.floor(Math.random()*3)
    // let p = platforms.create(i*243 + Math.floor(Math.random()*0)*100, h, 'ground_' + rnd)
    // p.setScale(0.3, 0.3).setOrigin(0, 1).refreshBody()
  }

console.log(player);


  initControl(this)
  initUI(this)
  initCamera(this)

  this.cameras.resize(w, h)

  debug_label = this.add.text(10, 100, '123123', { font: '20px Arial', fill: '#bbb' })
  debug_label.scrollFactorX = 0

  // coins = this.add.group()
  // coins.create(500, 200, 'coin').setScale(0.8, 0.8)
  // let coin = this.add.sprite(250, 50, 'coin')
  // console.log(player.sprite.body)

  

  this.physics.add.collider(player.sprite, platforms)
  // this.physics.add.collider(coin, platforms)

}




const initCamera = (scene) => {
  camera = scene.cameras.main
  // camera.setBounds(0, 0, 10000, 10000).setZoom(2)
  // camera.startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
  // camera.startFollow(player.sprite, true, 0.2, 0, 0, 0)

  // .setZoom(0.4)
  // camera.y = 130
}


const initUI = (scene) => {

    // let graphics = scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } })
    // var rect = new Phaser.Geom.Rectangle(300, 100)
    // var round = new Phaser.Geom.Circle(340, 120, 40);
    // rect.width = rect.height = 100
    // graphics.fillRectShape(rect)

    // graphics.fillStyle.color = 0xa000a0
    // graphics.fillCircleShape(round)

    //  Center the picture in the game
    // let ui = scene.add.group()

    const addElement = (el) => {
      el.scrollFactorX = el.scrollFactorY = 0
      // ui.add(el)
      return el
    }

    let h1 = scene.add.sprite(0, 0, 'heart').setScale(0.42)
    let h2 = scene.add.sprite(0, 0, 'heart').setScale(0.42)
    let h3= scene.add.sprite(0, 0, 'heart').setScale(0.42)
    // hearts.add(h1)

    let timer = scene.add.text(100, 10, '12 : 24', { font: '38px adineue PRO Cyr', fill: '#ffffff' })

    let power = scene.add.sprite(0, 0, 'power').setScale(0.6)
    let power_label = scene.add.text(0, 0, '12', { font: '28px adineue PRO Cyr', fill: '#ffffff' })


    // Phaser.Display.Align.In.Center   (addElement(scene.add.sprite(0, 0, 'coin')), display)

    Phaser.Display.Align.In.TopLeft (addElement(h1), display)
    Phaser.Display.Align.In.TopLeft (addElement(h2), display)
    Phaser.Display.Align.In.TopLeft (addElement(h3), display)
    
    Phaser.Display.Align.In.TopCenter (addElement(timer), display)
    
    Phaser.Display.Align.In.TopRight (addElement(power), display)
    Phaser.Display.Align.In.TopRight (addElement(power_label), display)


    h2.x += 30
    h3.x += 60

    power.x += 20
    power.y -= 12

    power_label.x -= 45
    power_label.y += 18
}


const initControl = (scene) => {
  controle = scene.input.keyboard.createCursorKeys()
  scene.input.on('pointerdown', function (pointer) {

    // this.add.image(pointer.x, pointer.y, 'logo');
    // console.log(pointer.x);
    if (player.sprite.body.blocked.down) {
      player.sprite.body.velocity.y = -650
    }
  }, this)  
}



let k = 0,
    game = true


///////////////////////////////////////////////////
function update () {
  if (!game) {
    debug_label.setText('Game over')
    return
  }

  debug_label.setText(player.sprite.body.blocked.down)
  // debug_label.setText(player.sprite.body.velocity.x)
  
  background.tilePositionX += player.sprite.body.velocity.x/200
  
  player.sprite.body.velocity.x += (200 - player.sprite.body.velocity.x)/20
  let player_anim = player.sprite.anims
  if (player.sprite.body.blocked.down) {
    if (!player_anim.isPlaying)
    player_anim.play('run')
  }
  else {
    player_anim.stop('run')
  }
  if (player.sprite.body.blocked.right) {
    player_anim.stop('run')
  }

  camera.scrollX = player.sprite.x - wquat

  if (controle.up.isDown && player.sprite.body.blocked.down)
  {
    player.sprite.body.velocity.y = -650
  }

  if (player.sprite.y > h) {
    game = false
    player.sprite.destroy()
  }

}

export {create, update}