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
    sprite: this.physics.add.sprite(200, 400, 'man_run', 13).setScale(0.3, 0.3)
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
      width: 202,
      height: 193,
      scale: 0.3
    },
    {
      name: 'ground_2',
      width: 202,
      height: 193,
      scale: 0.3
    },
    {
      name: 'ground_3',
      width: 148,
      height: 193,
      scale: 0.3
    }
  ]

  let platform_areas = [
    {
      type: 'easy plat 1',
      bonus_num: 1,
      array: [
        {
          type: 'block',
          block: 1,
          bonus: false
        },
        {
          type: 'block',
          block: 1,
          bonus: false
        },
        {
          type: 'block',
          block: 2,
          bonus: false
        },
        {
          type: 'space',
          width: 120
        },
        {
          type: 'block',
          block: 0,
          bonus: true
        },
        {
          type: 'block',
          block: 2,
          bonus: false
        }
      ]
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

  const addBonus = (x, y) => {
    // platforms.create(x, y, 'power').setOrigin(0, 1).setScale(0.3, 0.2).refreshBody()
  }

  const addArea = (type) => {
    for (let p of platform_areas[type].array) {
      if (p.type == 'block') {
        addPlatform(p.block)
        if (p.bonus) {

        }
      }
      if (p.type == 'space') {
        path.length += p.width
      }
    }
  }
  addArea(0)
  // addPlatform(1)
  // addPlatform(0)
  // path.length += 0
  // addPlatform(1)
  // addPlatform(2)
  // addPlatform(1)



  // for (let i = 3; i < 24; i++) {
  //   let rnd = Math.floor(Math.random()*3)    
  //   addPlatform(rnd)
  //   path.length += 70*Math.floor(Math.random()*3)
  // }

  console.log(player)


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
  // camera.startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
  // camera.startFollow(player.sprite, true, 0.2, 0, 0, 0)
}


const initUI = (scene) => {

    // let graphics = scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } })
    // var rect = new Phaser.Geom.Rectangle(300, 100)
    // var round = new Phaser.Geom.Circle(340, 120, 40);
    // rect.width = rect.height = 100
    // graphics.fillRectShape(rect)

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
  let player_anim = player.sprite.anims,
      player_body = player.sprite.body

      // console.log(player_anim.currentAnim.paused)
      // console.log(player_anim.currentAnim.paused)

  debug_label.setText(player_anim.currentAnim.paused)
  // debug_label.setText(player.sprite.body.velocity.x)
  
  background.tilePositionX += player_body.velocity.x/200
  
  // player.sprite.body.velocity.x += (200 - player.sprite.body.velocity.x)/20
  player_body.velocity.x = player.speed

  if (player_body.blocked.down) {
    if (!player_anim.isPlaying)
    // player_anim.play('run')
    player.sprite.anims.currentAnim.paused = false

  }
  else {
    // player_anim.stop('run')
    player.sprite.anims.currentAnim.paused = true


  }
  if (player_body.blocked.right) {
    player.sprite.anims.currentAnim.paused = true
    player_anim.currentFrame = player_anim.currentAnim.frames[8]
  }
  

  camera.scrollX = player.sprite.x - wquat

  if (controle.up.isDown && player_body.blocked.down)
  {
    player_body.velocity.y = -650
  }

  if (player.sprite.y > h) {
    game = false
    player.sprite.destroy()
  }

}

export {create, update}