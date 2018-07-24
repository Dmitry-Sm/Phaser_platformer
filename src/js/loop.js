import {Player} from './player'
import {state, states} from './states'
import { Block } from './block';

let player,
    platforms,
    bonuses,
    bonus_num,
    camera,
    controle,
    debug_label,
    display,
    background,
    path,
    finish,
    power_label

let w = window.innerWidth,
  h = window.innerHeight,
  wquat = w/4

let k = 0,
  game = true

function create () {

  display = this.add.zone(w/2, h/2, w, h)

  background = this.add.tileSprite(0, 10, w, h, 'background')
  background.scrollFactorX = 0
  background.scrollFactorY = 0.1
  Phaser.Display.Align.In.Center (background, display)
  bonus_num = 0

  console.log(background)
  
  
  initMap(this)
  initPlayer(this)
  initControl(this)
  initUI(this)
  initCamera(this)

  // console.log(' f= ' + finish.x)
  // console.log(' w= ' + finish.width)
  // console.log(' sc= ' + finish.scaleX)
  // console.log(finish)
  

  this.cameras.resize(w, h)

  debug_label = this.add.text(10, 100, '123123', { font: '20px Arial', fill: '#bbb' })
  debug_label.scrollFactorX = 0

  // coins = this.add.group()
  // coins.create(500, 200, 'coin').setScale(0.8, 0.8)
  // let coin = this.add.sprite(250, 50, 'coin')
  // console.log(player.sprite.body)

  this.physics.add.collider(player.sprite, platforms)
  this.physics.add.overlap(player.sprite, finish, finishing, null, this)
  this.physics.add.overlap(player.sprite, bonuses, get_bonus, null, this)
}


const finishing = (player, f_platform) => {
  state.current_state = states.finished
}

const get_bonus = (player, bonus_sprite) => {
  power_label.setText(++bonus_num)
  bonus_sprite.destroy()
}


const initMap = (scene) => {

  let platform_types = [
    {
      name: 'ground_1',
      width: 676,
      height: 193,
      scale: {x: 0.3, y: 0.3}
    },
    {
      name: 'ground_2',
      width: 676,
      height: 433,
      scale: {x: 0.3, y: 0.3}
    },
    {
      name: 'ground_3',
      width: 497,
      height: 753,
      scale: {x: 0.3, y: 0.3}
    },
    {
      name: 'ground_long',
      width: 2048,
      height: 299,
      scale: {x: 0.3, y: 0.3}
    },
    {
      name: 'school',
      width: 148,
      height: 193,
      scale: {x: 0.3, y: 0.3}
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
          bonus: false,
          scale: {x: 0.3, y: 0.3}
        },
        {
          type: 'block',
          block: 1,
          bonus: false,
          scale: {x: 0.3, y: 0.3}
        },
        {
          type: 'block',
          block: 2,
          bonus: false,
          scale: {x: 0.3, y: 0.3}
        },
        {
          type: 'space',
          width: 120,
          scale: {x: 0.3, y: 0.3}
        },
        // {
        //   type: 'block',
        //   block: 0,
        //   bonus: true
        // },
        // {
        //   type: 'block',
        //   block: 2,
        //   bonus: false
        // }
      ]
    },
    {
      type: 'finish',
      bonus_num: 0,
      array: [
        {
          type: 'decoration',
          block: 4
        },
        {
          type: 'block',
          block: 1,
          bonus: false,
          scale: {x: 0.3, y: 0.3}
        }
      ]
    }
  ]

  path = {
    length: 0
  }

  platforms = scene.physics.add.staticGroup()
  bonuses = scene.physics.add.staticGroup()
  let decors = scene.physics.add.staticGroup()

  const addPlatform = (type, params = {}) => {
    let x = path.length,
        y = h,
        width = platform_types[type].width * platform_types[type].scale.x,
        height = platform_types[type].height * platform_types[type].scale.y,
        scaleX = params.scaleX || 0.3,
        scaleY = params.scaleY || 0.3,
        platform_name = platform_types[type].name

    if (params.bonus) {
      addBonus(x + width/2, height)
    }

    path.length += width
    return platforms.create(x, y, platform_name).setOrigin(0, 1).setScale(scaleX, scaleY).refreshBody()
  }

  const addDecoration = (type, params = {}) => {
    let block = platform_types[type],
        x = path.length,
        y = 0 
    return decors.create(x, h + y, block.name).setScale(0.75).setOrigin(0, 1).refreshBody()
  }

  var anim_config = {
    key: 'bonus_light',
    frames: scene.anims.generateFrameNumbers('bonus', { start: 0, end: 33, first: 0 }),
    frameRate: 35,
    repeat: -1
  }
  scene.anims.create(anim_config)

  // sprite: scene.physics.add.sprite(200, 400, 'man_run', 13).setScale(0.3, 0.3)



  const addBonus = (x, y) => {
    // let block = platform_types[type],
    //     x = path.length,
    //     y = 0 
    let b = bonuses.create(x, h - y + 5, 'bonus').setScale(0.3).setOrigin(0.5, 1).refreshBody()
    b.anims.play('bonus_light')
    
    return b
  }

  const addArea = (type) => {
    for (let p of platform_areas[type].array) {
      if (p.type == 'block') {
        addPlatform(p.block, p.params)
        if (p.bonus) {

        }
      }
      if (p.type == 'space') {
        path.length += p.width
      }
      if (p.type == 'decoration') {
        addDecoration(p.block)
      }
    }
  }


  // addArea(0)
  // addArea(1)
  // addPlatform(1)
  // addPlatform(0)
  // path.length += 0
  // addPlatform(1)
  addPlatform(1)
  addPlatform(2)
  addPlatform(1)
  addPlatform(2, {bonus: true})
  addPlatform(0)
  path.length += 80
  addPlatform(1)
  addPlatform(2, {bonus: true})
  path.length += 120
  addPlatform(1)
  addPlatform(2)
  addPlatform(0)
  path.length += 80
  addPlatform(1)
  path.length += 120
  addPlatform(2)
  addPlatform(1, {bonus: true})
  addPlatform(2)
  addPlatform(0, {bonus: true})
  path.length += 80

  addPlatform(1, {bonus: true})
  path.length += 120
  addPlatform(2)
  finish = addDecoration(4)
  addPlatform(1)
  addPlatform(1)
  addPlatform(1)


  // for (let i = 3; i < 24; i++) {
  //   let rnd = Math.floor(Math.random()*3)    
  //   addPlatform(rnd)
  //   path.length += 70*Math.floor(Math.random()*3)
  // }
}


const initPlayer = (scene) => {  
  var anim_config = {
    key: 'run',
    frames: scene.anims.generateFrameNumbers('man_run', { start: 0, end: 13, first: 0 }),
    frameRate: 35,
    repeat: -1
  }
  scene.anims.create(anim_config);


  player = new Player({
    type: 'men',
    sprite: scene.physics.add.sprite(200, 200, 'man_run', 13).setScale(0.3, 0.3)
  })

  player.sprite.anims.play('run')

  console.log(player.sprite.anims)

  player.sprite.setBounce(0)
  let plw = player.sprite.body.width,
      plh = player.sprite.body.height

  // console.log(plh)

  player.sprite.setSize(140, 790)
  player.sprite.setOrigin(1.04, 0)
}


const initCamera = (scene) => {
  camera = scene.cameras.main
  // camera.zoom = 0.3;

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

    let power = scene.add.sprite(0, 0, 'power').setScale(0.55)
    power_label = scene.add.text(0, 0, bonus_num, { font: '28px adineue PRO Cyr', fill: '#ffffff' })


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
    if (state.current_state == states.game) {
      player.jump()
    }
  }, this)  
}





///////////////////////////////////////////////////
function update () {
  debug_label.setText(w)


  if (state.current_state == states.game) {
    let player_anim = player.sprite.anims,
        player_body = player.sprite.body

    // debug_label.setText(player_anim.currentFrame.index)
    // debug_label.setText(player.sprite.body.velocity.x)
    
    // background.tilePositionX += player_body.velocity.x/200
    
    // player.sprite.body.velocity.x += (200 - player.sprite.body.velocity.x)/20
    player_body.velocity.x = player.speed

    if (player_body.blocked.down) {
      player_anim.resume()

    }
    else {
      // player_anim.stop('run')
      player_anim.pause()
    }

    if (player_body.blocked.right) {
      player_anim.currentFrame = player_anim.currentAnim.frames[8]
      player_anim.pause()
    }

    camera.scrollX = player.sprite.x - wquat

    if (controle.up.isDown) {
      player.jump()
    }
    if (player.sprite.x > finish.x + finish.width/2) {
      console.log('++');
    }

    if (player.sprite.y > h) {
      state.current_state = states.finished

      debug_label.setText(state.current_state)
      console.log(state.current_state)
      
      player.sprite.destroy()
    }
  }

  if (state.current_state == states.finished) {

    let player_anim = player.sprite.anims,
        player_body = player.sprite.body

    if (player.sprite.x > finish.x + finish.width * finish.scaleX/1.8) {
      player.sprite.body.velocity.x = 0  
      player_anim.currentFrame = player_anim.currentAnim.frames[9]
    }

    // player_body.velocity.x = player.speed/2

  }
}


export {create, update}