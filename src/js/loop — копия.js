import {Player} from './player'
import {state, states} from './states'
import {initUI, timer, showUI, hideUI} from './ui'
import { Block } from './block';
import {animateFinalScreen} from './finalScreen'

let player,
    boy, 
    girl,
    jump_up,
    jump_down,
    boost,
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
    finish,
    start_time

let w = window.innerWidth,
    h = window.innerHeight,
    wquat = w/3


 
function create () {

  display = this.add.zone(w/2, h/2, w, h)

  background = this.add.tileSprite(0, 0, w + 1, h, 'background')
  background.scrollFactorX = 0
  background.scrollFactorY = 0
  Phaser.Display.Align.In.BottomCenter (background, display)
  // background.tilePositionY += 300

  picked_bonuses = []
  
  initMap(this)

  // [jump, boost] = initAnims(this)
  let [j_u, j_d, b] = initAnims(this)
  jump_up = j_u
  jump_down = j_d
  boost = b

  boy = initBoy(this)
  girl = initGirl(this)

  initControl(this)
  ui = initUI(this)
  initCamera(this)


  this.cameras.resize(w, h)

  debug_label = this.add.text(10, 100, '', { font: '20px Arial', fill: '#bbb' })
  debug_label.scrollFactorX = 0


  this.physics.add.collider(boy.sprite, platforms)
  this.physics.add.overlap(boy.sprite, finish, finishing, null, this)
  this.physics.add.overlap(boy.sprite, bonuses, get_bonus, null, this)

  this.physics.add.collider(girl.sprite, platforms)
  this.physics.add.overlap(girl.sprite, finish, finishing, null, this)
  this.physics.add.overlap(girl.sprite, bonuses, get_bonus, null, this)

  game_start() // !!!
}



const game_start = (player_type) => {
  // if (player_type == 'man')
    player = boy
  if (player_type == 'girl')
    player = girl

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

  start_time = new Date()
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

  boost.x = boy.sprite.x
  boost.y = boy.sprite.y - 15
  boost.anims.play('boost')
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

    if (!params.alternate)
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

  let l1 = 60,
      l2 = 120,
      l3 = 180,


      h1 = 150,
      h2 = 150 + 80 * 1,
      h3 = 150 + 80 * 2,
      h4 = 150 + 80 * 3

  // addArea(0)
  // addArea(1)
  // addPlatform(1)
  // addPlatform(0)
  // path.length += 0
  // addPlatform(1)
  addPlatform(1)
  addPlatform(1)
  addPlatform(1)
  addPlatform(2)
//   addPlatform(0)
//   addPlatform(0, {y: h1, bonus: true}) // 1
//   path.length += 100


//   // {
//   addPlatform(0),
//   addPlatform(0, {y: h1})
//   path.length += l2

//   addPlatform(1)
//   addPlatform(0, {y: h2, bonus: true})

//   path.length += l2
//   addPlatform(2)
//   addPlatform(0, {y: h3})
//   path.length += l2
//   // }

// // {
//   addPlatform(0, {y: h1})
//   path.length -= l1
//   addPlatform(0)
//   addPlatform(1)
//   addPlatform(2, {bonus: true})
//   addPlatform(1)
//   path.length -= l1
//   addPlatform(0, {y: h3})
//   path.length -= l1
//   addPlatform(0, {y: h1})
//   // }

//   // {
//   path.length += l1
//   addPlatform(2)
//   path.length += l1
//   addPlatform(0, {y: 320, alternate: true})
//   path.length -= l1
//   addPlatform(1)
//   path.length += l1
//   addPlatform(0)
//   addPlatform(0, {y: 320, alternate: true})
//   path.length += l1
//   addPlatform(1)
//   addPlatform(2, {bonus: true})
//   // }
  
// // {
//   path.length += l1

//   addPlatform(0, {y: h3})
//   path.length -= l2
//   addPlatform(0)
//   addPlatform(0)
//   addPlatform(0)
//   addPlatform(1)
//   addPlatform(2, {bonus: true})
//   addPlatform(1)

  // }

  path.length += l2

  addPlatform(1, {bonus: true})
  addPlatform(2)
  finish = addDecoration(4)
  addPlatform(3)


  // for (let i = 3; i < 24; i++) {
  //   let rnd = Math.floor(Math.random()*3)    
  //   addPlatform(rnd)
  //   path.length += 70*Math.floor(Math.random()*3)
  // }
}


const initBoy = (scene) => {  
  let run_config = {
    key: 'boy_run',
    frames: scene.anims.generateFrameNumbers('boy_run', { start: 0, end: 28, first: 0 }),
    frameRate: 30,
    repeat: -1
  }
  scene.anims.create(run_config)

  let jump_start_config = {
    key: 'boy_jump_start',
    frames: scene.anims.generateFrameNumbers('boy_jump', { start: 0, end: 15, first: 0 }),
    frameRate: 30,
    repeat: 0,
    onCompleteEvent: () => {
      console.log('! anim compl')      
    }
  }
  scene.anims.create(jump_start_config);

  let jump_fly_config = {
    key: 'boy_jump_fly',
    frames: scene.anims.generateFrameNumbers('boy_jump', { start: 16, end: 28, first: 16 }),
    frameRate: 35,
    repeat: -1
  }
  scene.anims.create(jump_fly_config)

  let jump_fall_config = {
    key: 'boy_jump_fall',
    frames: scene.anims.generateFrameNumbers('boy_jump', { start: 30, end: 36, first: 0 }),
    frameRate: 30,
    repeat: 0
  }
  scene.anims.create(jump_fall_config)

  let pl = new Player({
    type: 'men',
    sprite: scene.physics.add.sprite(0, 0, 'boy_run', 0)
  })

  pl.sprite.x = pl.start_pos.x
  pl.sprite.y = pl.start_pos.y
  pl.sprite.visible = false
  pl.spawn_place = pl.start_pos
  // pl.sprite.anims.play('boy_run')


  pl.run_anim = 'boy_run'
  pl.jump_start_anim = 'boy_jump_start'
  pl.jump_fly_anim = 'boy_jump_fly'
  pl.jump_fall_anim = 'boy_jump_fall'
  console.log(scene.anims)


  pl.sprite.setBounce(0)
  let plw = pl.sprite.body.width,
      plh = pl.sprite.body.height


  pl.sprite.setSize(30, 60)
  pl.sprite.setOrigin(0.75, 0.6)

  return pl
}


const initGirl = (scene) => {  
  let run_config = {
    key: 'girl_run',
    frames: scene.anims.generateFrameNumbers('girl_run', { start: 0, end: 28, first: 0 }),
    frameRate: 30,
    repeat: -1
  }
  scene.anims.create(run_config)

  let jump_start_config = {
    key: 'girl_jump_start',
    frames: scene.anims.generateFrameNumbers('girl_jump', { start: 0, end: 15, first: 0 }),
    frameRate: 30,
    repeat: 0,
    onCompleteEvent: () => {
      console.log('! anim compl')      
    }
  }
  scene.anims.create(jump_start_config);

  let jump_fly_config = {
    key: 'girl_jump_fly',
    frames: scene.anims.generateFrameNumbers('girl_jump', { start: 17, end: 28 }),
    frameRate: 30,
    repeat: -1
  }
  scene.anims.create(jump_fly_config)

  let jump_fall_config = {
    key: 'girl_jump_fall',
    frames: scene.anims.generateFrameNumbers('girl_jump', { start: 30, end: 36}),
    frameRate: 30,
    repeat: 0
  }
  scene.anims.create(jump_fall_config)

  let pl = new Player({
    type: 'men',
    sprite: scene.physics.add.sprite(0, 0, 'girl_run', 0)
  })

  pl.sprite.x = pl.start_pos.x
  pl.sprite.y = pl.start_pos.y
  pl.sprite.visible = false
  pl.spawn_place = pl.start_pos
  pl.sprite.anims.play('girl_run')

  console.log(scene.anims)


  pl.sprite.setBounce(0)
  let plw = pl.sprite.body.width,
      plh = pl.sprite.body.height


  pl.sprite.setSize(30, 60)
  pl.sprite.setOrigin(0.75, 0.6)

  return pl
}


const initAnims = (scene) => {  
  let jump_up_config = {
    key: 'jump_up',
    frames: scene.anims.generateFrameNumbers('jump_up', { start: 0, end: 10, first: 0 }),
    frameRate: 40
  }
  let jump_down_config = {
    key: 'jump_down',
    frames: scene.anims.generateFrameNumbers('jump_down', { start: 0, end: 10, first: 0 }),
    frameRate: 40
  }
  let boost_config = {
    key: 'boost',
    frames: scene.anims.generateFrameNumbers('boost', { start: 0, end: 11, first: 0 }),
    frameRate: 40
  }
  scene.anims.create(jump_up_config)
  scene.anims.create(jump_down_config)
  scene.anims.create(boost_config)

  let jump_up_anim = scene.add.sprite(500, 500, 'jump_up', 10).setScale(0.3).setOrigin(0.5, 0.5)
  let jump_down_anim = scene.add.sprite(500, 500, 'jump_down', 10).setScale(0.3).setOrigin(0.5, 0.5)
  let boost_anim = scene.add.sprite(500, 500, 'boost', 11).setScale(0.3).setOrigin(1, 0.5)

  return [jump_up_anim, jump_down_anim, boost_anim]
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
      // player.sprite.anims.pause()
      // player.sprite.anims.pause()
      // if (player.sprite.anims.currentAnim.key == 'run')
      //   player.sprite.anims.play('run2')
      // else
      //   player.sprite.anims.play('run')


      // console.log(player.sprite.anims.currentAnim)
      if (player.sprite.body.blocked.down) {
        
        player.jump()
        player.sprite.anims.pause()
        player.sprite.anims.play(player.jump_start_anim)

        jump_up.x = player.sprite.x - 15
        jump_up.y = player.sprite.y + 5
        jump_up.anims.play('jump_up')
      }
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

  // if (state.current_state == states.start_menu) {
  //   player.sprite.anims.pause()
  // }

  if (state.current_state == states.game) {
    let player_anim = player.sprite.anims,
        player_body = player.sprite.body

    let t = timer(ui, start_time)
    if (t <= -10000) { // (t <= 0)
      finish_game()
      console.log('Time is out')
    }
    // debug_label.setText(Math.floor(res/60) + ' : ' + res%60)
    // debug_label.setText(player_anim.currentAnim.key + ' ' + player_anim.getProgress())
    
    background.tilePositionX += player_body.velocity.x/200

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

    if (player_anim.currentAnim.key == player.jump_start_anim && player_anim.getProgress() == 1 ||
        player_anim.currentAnim.key != player.jump_fly_anim && 
        player_anim.currentAnim.key != player.jump_start_anim && !player.sprite.body.blocked.down) {

      player.sprite.anims.play(player.girl_jump_fly_anim)
    }
    if (player_anim.currentAnim.key == player.jump_fly_anim && player.sprite.body.blocked.down) {

      jump_down.x = player.sprite.x - 5
      jump_down.y = player.sprite.y + 5
      jump_down.anims.play(player.jump_down_anim)

      player.sprite.anims.play(player.run_animrun)
    }
    // if (player_anim.currentAnim.key == 'jump_fall' && player_anim.getProgress() == 1) {
    //   player.sprite.anims.play('run')
    // }

    if (player_body.blocked.right) {
      player_anim.setTimeScale(0.75)
    }
    // else {
    //   player_anim.setTimeScale(1 + (player.speed - player.min_speed)/1000)
    // }

    camera.scrollX = player.sprite.x - wquat
    let camera_y = -(h*0.4 - player.sprite.y)
    camera.scrollY += (camera_y - camera.scrollY)/50
    if (camera.scrollY > 0)
      camera.scrollY = 0

    if (controle.up.isDown) {
      if (player.sprite.body.blocked.down) {
        
        player.jump()

        jump.x = player.sprite.x
        jump.y = player.sprite.y + 4
        jump.anims.play('jump')
      }
    }

    if (player.sprite.y > h + 80) {
      dieing()  
    }
  }

  if (state.current_state == states.finished) {

    let player_anim = player.sprite.anims,
        player_body = player.sprite.body

    if (camera.scrollX < finish.x - w*0.7 + finish.width * finish.scaleX/2) {
      camera.scrollX += (finish.x - w*0.7 + finish.width * finish.scaleX/2 - camera.scrollX) / 20
    }    

    if (player.sprite.x > finish.x + finish.width * finish.scaleX/1.8) {
      player.sprite.body.velocity.x = 0  
      player_anim.currentFrame = player_anim.currentAnim.frames[9]
      player_anim.stop()
      finish_game()
    }
    else {
      if (player_anim.currentAnim.key != player.run_anim) {
        player.sprite.anims.play(player.run_anim)
      }

    }
  }
}


export {create, game_start, update}