import {Player} from './player'
import {state, states} from './states'
import {initUI, showUI, hideUI} from './ui'
import { Block } from './block';
import {animateFinalScreen} from './finalScreen'

let player,
    platforms,
    bonuses,
    picked_bonuses,
    bonus_num,
    camera,
    controle,
    debug_label,
    display,
    ui,
    background,
    path,
    finish

let w = window.innerWidth,
    h = window.innerHeight,
    wquat = w/3


 
function create () {

  display = this.add.zone(w/2, h/2, w, h)

  background = this.add.tileSprite(0, 0, w + 1, h, 'background')
  background.scrollFactorX = 0
  background.scrollFactorY = 0

// 
  Phaser.Display.Align.In.BottomCenter (background, display)
  background.tilePositionY += 300

  // console.log(background)
  picked_bonuses = []
  
  initMap(this)
  player = initPlayer(this)
  initControl(this)
  ui = initUI(this)
  initCamera(this)

  this.cameras.resize(w, h)

  debug_label = this.add.text(10, 100, '', { font: '20px Arial', fill: '#bbb' })
  debug_label.scrollFactorX = 0

  this.physics.add.collider(player.sprite, platforms)
  this.physics.add.overlap(player.sprite, finish, finishing, null, this)
  this.physics.add.overlap(player.sprite, bonuses, get_bonus, null, this)

  game_start() // !!!
}



const game_start = (player_type) => {
  state.current_state = states.game
  
  showUI(ui)
  bonus_num = 0
  ui.power_label.setText(bonus_num)

  player.life = 3
  player.sprite.visible = true
  player.spawn_place = player.start_pos
  player.sprite.x = player.start_pos.x
  player.sprite.y = player.start_pos.y
  player.speed = player.start_speed

  for (let b of picked_bonuses) {
    b.y -= 10000
    b.refreshBody()
  }
  picked_bonuses = []
}


const finishing = (player, f_platform) => {
  if (state.current_state == states.game)
    state.current_state = states.finished
}


const get_bonus = (p, bonus_sprite) => {
  ui.power_label.setText(++bonus_num)
  // console.log(bonus_sprite)
  
  bonus_sprite.y += 10000
  bonus_sprite.refreshBody()
  picked_bonuses.push(bonus_sprite)
  // player.sprite.visible = true

  player.speed += 60
  player.spawn_place = {
    x: player.sprite.x,
    y: player.sprite.y
  }  
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
        highness = params.y || 0,
        y = h - highness,
        width = platform_types[type].width * platform_types[type].scale.x,
        height = platform_types[type].height * platform_types[type].scale.y,
        scaleX = params.scaleX || 0.3,
        scaleY = params.scaleY || 0.3,
        platform_name = platform_types[type].name

    if (params.bonus) {
      addBonus(x + width/2, height + highness)
    }

    path.length += width - 1
    let p = platforms.create(x, 0, platform_name).setOrigin(0, 1).setScale(0.3, 0.3)
    // p.height = height/4
    p.y = y
    // if (highness != 0) {
    //   console.log(p)
    // }
    p.refreshBody()
    return p
  }

  const addDecoration = (type, params = {}) => {
    let block = platform_types[type],
        x = path.length,
        y = 0 
    return decors.create(x, h + y, block.name).setScale(0.7).setOrigin(0, 1).refreshBody()
  }

  var anim_config = {
    key: 'bonus_light',
    frames: scene.anims.generateFrameNumbers('bonus', { start: 0, end: 33, first: 0 }),
    frameRate: 35,
    repeat: -1
  }
  scene.anims.create(anim_config)

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
  addPlatform(1)
  addPlatform(2)
  addPlatform(0)
  addPlatform(0, {y: 130, bonus: true})
  path.length += 100
  addPlatform(1)
  path.length += 100
  // addPlatform(0, {y: 250})
  addPlatform(2, {bonus: true})
  path.length += 100
  addPlatform(0)
  addPlatform(1)
  path.length += 100
  addPlatform(0, {y: 150})
  path.length += 100
  addPlatform(2, {bonus: true})
  addPlatform(1)
  path.length += 100
  addPlatform(0, {y: 150})
  path.length += 100
  addPlatform(2)
  addPlatform(0, {bonus: true})
  path.length += 80
  addPlatform(1)
  path.length += 120
  addPlatform(2)
  path.length += 120
  addPlatform(0, {y: 150})
  path.length += 120
  addPlatform(1, {bonus: true})
  addPlatform(2)
  addPlatform(0)
  path.length += 100
  // addPlatform(0, {y: 250})
  addPlatform(2, {bonus: true})
  path.length += 100
  addPlatform(0)
  addPlatform(1)
  path.length += 100
  addPlatform(0, {y: 150})
  path.length += 100
  addPlatform(2, {bonus: true})
  addPlatform(1)
  path.length += 100
  addPlatform(0, {y: 150})
  path.length += 100
  addPlatform(2)
  addPlatform(0, {bonus: true})
  path.length += 80
  addPlatform(1)
  path.length += 120
  addPlatform(2)
  path.length += 120
  addPlatform(0, {y: 150})
  path.length += 120
  addPlatform(1, {bonus: true})
  addPlatform(2)
  addPlatform(0)
  path.length += 80

  addPlatform(1, {bonus: true})
  path.length += 80
  addPlatform(2)
  finish = addDecoration(4)
  addPlatform(3)


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

  let pl = new Player({
    type: 'men',
    sprite: scene.physics.add.sprite(0, 0, 'man_run', 13).setScale(0.3, 0.3)
  })

  pl.sprite.x = pl.start_pos.x
  pl.sprite.y = pl.start_pos.y
  pl.sprite.visible = false
  pl.spawn_place = pl.start_pos
  pl.sprite.anims.play('run')

  // console.log(player.sprite)

  pl.sprite.setBounce(0)
  let plw = pl.sprite.body.width,
      plh = pl.sprite.body.height


  pl.sprite.setSize(140, 240)
  pl.sprite.setOrigin(1.0, 0.9)

  return pl
}


const initCamera = (scene) => {
  camera = scene.cameras.main
  // camera.zoom = 0.1
  // camera.scrollX += 1500

  // camera.startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
  // camera.startFollow(player.sprite, true, 0.2, 0, 0, 0)
}


const initControl = (scene) => {
  controle = scene.input.keyboard.createCursorKeys()
  scene.input.on('pointerdown', function (pointer) {
    if (state.current_state == states.game) {
      player.jump()
    }
  }, this)  
}


const dieing = () => {
  console.log (player.life)
  ui.hearts[--player.life].visible = false
  if (player.life > 0) {

    player.sprite.x = player.spawn_place.x
    player.sprite.y = player.spawn_place.y
    player.speed = 10
    setTimeout(function(){
      player.speed = player.start_speed
    },200)
  }
  else {
    finish_game()
  }
}


const finish_game = () => {
  state.current_state = states.start_menu
  animateFinalScreen("setScore", bonus_num*40)
  animateFinalScreen("startAnim")
  hideUI(ui)

  // player.sprite.destroy()
}



///////////////////////////////////////////////////
function update () {
  // debug_label.setText(h - player.sprite.y)

  if (state.current_state == states.start_menu) {
    player.sprite.anims.pause()
  }

  if (state.current_state == states.game) {
    let player_anim = player.sprite.anims,
        player_body = player.sprite.body

    // debug_label.setText(player_anim.currentFrame.index)
    // debug_label.setText(player.sprite.body.velocity.x)
    
    background.tilePositionX += player_body.velocity.x/200
    
    // player.sprite.body.velocity.x += (200 - player.sprite.body.velocity.x)/20

    player_body.velocity.x = player.speed
    if (player.speed > player.min_speed)
      player.speed *= 0.9996

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
    let camera_y = -(h*0.9 - player.sprite.y)/4
    camera.scrollY += (camera_y - camera.scrollY)/2
    if (camera.scrollY > 0)
      camera.scrollY = 0

    if (controle.up.isDown) {
      player.jump()
    }

    if (player.sprite.y > h + 80) {
      // state.current_state = states.finished
      dieing()

      // debug_label.setText(state.current_state)
      // console.log(state.current_state)
      
    }
  }

  if (state.current_state == states.finished) {

    let player_anim = player.sprite.anims,
        player_body = player.sprite.body

    if (camera.scrollX < finish.x - w*0.7 + finish.width * finish.scaleX/2) {
      camera.scrollX += (finish.x - w*0.7 + finish.width * finish.scaleX/2 - camera.scrollX) / 20
    }    

    if (player_body.blocked.down) {
      player_anim.resume()
    }
    else {
      player_anim.pause()
    }

    if (player.sprite.x > finish.x + finish.width * finish.scaleX/1.8) {
      player.sprite.body.velocity.x = 0  
      player_anim.currentFrame = player_anim.currentAnim.frames[9]
      player_anim.pause()
      
      finish_game()
    }
  }
}


export {create, game_start, update}