import {Player} from './player'
import {sound, initSound} from './sound'
import {state, states} from './states'
import {initUI, timer, showUI, hideUI, showTutorial, hideTutorial} from './ui'
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
    start_time,
    tutorial_frame,
    showed_tutorial = false

let prev_state = ''

let w = window.innerWidth,
    h = window.innerHeight,
    wquat = w/3

// scaleMode for player !! ScaleModes.NEAREST
 
function create () {

  display = this.add.zone(w/2, h/2, w, h)
  background = this.add.tileSprite(0, 0, w, 1137, 'background').setScale()
  // background.height = h
  // background.displayHeight = h
  background.setOrigin(0.5, 0.4)
  // background.tileScale = new Phaser.Point(1, 1)
  // background.setPosition(0, 300, 300, 300)

  // background.setY(1000).update()
  background.scrollFactorX = 0
  background.scrollFactorY = 0
  Phaser.Display.Align.In.Center (background, display)
  // background.tilePositionY += 100 // плохо
  // console.log(h);

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

  initSound(this)

  sound.clock.play()
  // game_start('girl') // !!!
}

const tutorial_timer = () => {
  let tutimer = 3000
    
  if (tutorial_frame == 0) {
    sound.hi_hero.play()
    tutimer = 6000
  }
  if (tutorial_frame == 1) {
    sound.collect_energy.play()
    tutimer = 4000
  }
  if (tutorial_frame == 2) {
    sound.seconds.play()
  }
  setTimeout(() => {
    showTutorial(ui, player.type, ++tutorial_frame)
    // console.log(tutorial_frame)
    if (tutorial_frame < 4) {
      tutorial_timer()
    }
  }, tutimer)
}


const game_tutorial = (player_type) => {
  if (player_type == 'boy')
    player = boy
  if (player_type == 'girl')
    player = girl

  showUI(ui)
  bonus_num = 0
  ui.power_label.setText(bonus_num)
  player.sprite.visible = true
  player.sprite.body.velocity.x = 0
  player.start_pos.y = h - 433*0.3 - player.sprite.height
  player.spawn_place = player.start_pos
  player.sprite.x = player.start_pos.x
  player.sprite.y = player.start_pos.y
  camera.scrollX = player.sprite.x - wquat

  if (!showed_tutorial) {
    player.sprite.anims.pause()
    showed_tutorial = true
    tutorial_frame = 0
    showTutorial(ui, player.type, tutorial_frame)
    tutorial_timer()
    state.current_state = states.tutorial
  }
  else {
    game_start(player.type)
  }
  start_time = new Date()
  timer(ui, start_time)

}


const game_start = (player_type) => {
  if (player_type == 'boy')
    player = boy
  if (player_type == 'girl')
    player = girl

  
  player.life = 3
  player.sprite.visible = true
  player.speed = player.start_speed

  for (let b of picked_bonuses) {
    b.y -= 10000
    b.refreshBody()
  }
  picked_bonuses = []

  start_time = new Date()
  state.current_state = states.game
  // player.sprite.anims.play(player.run_anim)

}


const finishing = (player, f_platform) => {
  if (state.current_state == states.game) {
    state.current_state = states.finished
  }

}


const get_bonus = (p, bonus_sprite) => {
  sound.bonus.play()

  ui.power_label.setText(++bonus_num)
  // console.log(bonus_sprite)
  
  bonus_sprite.y += 10000
  bonus_sprite.refreshBody()
  picked_bonuses.push(bonus_sprite)
  // player.sprite.visible = true

  player.speed += 40
  player.spawn_place = {
    x: player.sprite.x,
    y: player.sprite.y
  }  

  boost.x = player.sprite.x
  boost.y = player.sprite.y - 15
  boost.anims.play('boost')
}


const initMap = (scene) => {

  let platform_types = {
    ground_1:
    {
      scale: {x: 0.3, y: 0.3}
    },
    ground_2: {
      scale: {x: 0.3, y: 0.3}
    },
    ground_3: {
      scale: {x: 0.3, y: 0.3}
    },
    ground_long: {
      scale: {x: 0.3, y: 0.3}
    },
    school: {
      scale: {x: 0.7, y: 0.7}
    },

    tree_plane: {
      scale: {x: 0.3, y: 0.3}
    },
    tree_1: {
      scale: {x: 0.3, y: 0.3}
    },
    tree_2: {
      scale: {x: 0.3, y: 0.3}
    },
    bush_1: {
      scale: {x: 0.3, y: 0.3}
    },
    cloud_1: {
      scale: {x: 0.3, y: 0.3}
    },
    cloud_2: {
      scale: {x: 0.3, y: 0.3}
    },
    cloud_3: {
      scale: {x: 0.3, y: 0.3}
    },
    cloud_4: {
      scale: {x: 0.3, y: 0.3}
    },
    
    long_plane: {
      height: 433,
      scale: {x: 0.3, y: 0.3}
    },
    
    plane_s_1: {
      height: 193,
      scale: {x: 0.3, y: 0.3}
    },
    plane_s_2: {
      height: 193,
      scale: {x: 0.3, y: 0.3}
    },
    plane_s_3: {
      height: 193,
      scale: {x: 0.3, y: 0.3}
    },
    plane_m_1: {
      height: 433,
      scale: {x: 0.3, y: 0.3}
    },
    plane_m_2: {
      height: 433,
      scale: {x: 0.3, y: 0.3}
    },
    plane_m_3: {
      height: 433,
      scale: {x: 0.3, y: 0.3}
    },
    // plane_b_1: {
    //   scale: {x: 0.3, y: 0.3}
    // },
    // plane_b_2: {
    //   scale: {x: 0.3, y: 0.3}
    // },
    plane_b_3: {
      height: 753,
      scale: {x: 0.3, y: 0.3}
    },
  }

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
    let x = params.x || 0,
        highness = params.y || 0,
        y = h - highness,
        scaleX = params.scaleX || platform_types[type].scale.x,
        scaleY = params.scaleY || platform_types[type].scale.y
        // platform_name = platform_types[type].name

    let p = platforms.create(path.length + x, 0, type).setOrigin(0, 1).setScale(scaleX, scaleY)

    let width = p.width * platform_types[type].scale.x,
        height = p.height * platform_types[type].scale.y
    
    // console.log(p.height)
    
    
    if (params.bonus) {
      addBonus(path.length + x + width/2, height + highness)
    }


    if (!params.alternate)
      path.length += width - 1
    p.y = y
    p.refreshBody()
    return p
  }

  const addDecoration = (type, params = {}) => {
    let x = params.x || 0,
        y = params.y || 0,
        scaleX = params.scaleX || platform_types[type].scale.x,
        scaleY = params.scaleY || platform_types[type].scale.y
    return decors.create(path.length + x, h - y, type).setScale(scaleX, scaleY).setOrigin(0, 1).refreshBody()
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

  // const addArea = (type) => {
  //   for (let p of platform_areas[type].array) {
  //     if (p.type == 'block') {
  //       addPlatform(p.block, p.params)
  //       if (p.bonus) {

  //       }
  //     }
  //     if (p.type == 'space') {
  //       path.length += p.width
  //     }
  //     if (p.type == 'decoration') {
  //       addDecoration(p.block)
  //     }
  //   }
  // }

  let l1 = 60,
      l2 = 120,
      l3 = 180,


      h1 = 150,
      h2 = 150 + 80 * 1,
      h3 = 150 + 80 * 2,
      h4 = 150 + 80 * 3


  // addDecoration('bush_1', {y: platform_types['plane_m_3'].height * platform_types['plane_m_3'].scale.y - 10})
  // addDecoration('tree_1', {y: platform_types['plane_m_1'].height * platform_types['plane_m_1'].scale.y})
  // addDecoration('tree_2', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y})
  // addPlatform('tree_plane', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y + 75, x: 105, alternate: true, bonus: true})

  addPlatform('long_plane')
  addPlatform('plane_s_1')
  addDecoration('tree_1', {y: platform_types['plane_m_1'].height * platform_types['plane_m_1'].scale.y})
  addPlatform('plane_m_1')
  addPlatform('plane_m_2', {bonus: true})
  path.length += l2  

  // path.length += 100

  addPlatform('plane_b_3')
  addDecoration('tree_2', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y})
  addPlatform('tree_plane', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y + 75, x: 105, alternate: true, bonus: true})
  addPlatform('plane_b_3')
  addPlatform('plane_s_2', {y: h3 + 50, x: 120, alternate: true})
  addPlatform('plane_m_3')
  addDecoration('bush_1', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y - 10})
  addPlatform('plane_b_3', {bonus: true})
  addPlatform('plane_s_2', {y: h3 + 50, x: -50, bonus: true, alternate: true})
  addPlatform('plane_m_3')
  addPlatform('plane_s_2', {y: h4, x: -30, bonus: true, alternate: true})
  path.length += l2  
  addPlatform('plane_m_1')
  addPlatform('plane_m_1')
  addDecoration('tree_1', {y: platform_types['plane_m_1'].height * platform_types['plane_m_1'].scale.y - 10})
  addPlatform('plane_m_1')
  addPlatform('plane_b_3')
  addDecoration('bush_1', {y: platform_types['plane_s_2'].height * platform_types['plane_s_2'].scale.y - 10})
  addPlatform('plane_s_2')
  addPlatform('plane_s_2', {bonus: true})
  path.length += l3
  

  addPlatform('plane_s_2')
  addPlatform('plane_m_1')
  addDecoration('tree_2', {y: platform_types['plane_m_3'].height * platform_types['plane_m_3'].scale.y})
  addPlatform('tree_plane', {y: platform_types['plane_m_3'].height * platform_types['plane_m_3'].scale.y + 75, x: 105, alternate: true, bonus: true})
  
  addPlatform('plane_m_3')
  addPlatform('plane_m_1', {y: -0.1})
  addPlatform('plane_s_2', {y: h3 + 30, x: -50, alternate: true})
  path.length += l2
  addDecoration('bush_1', {y: platform_types['plane_m_2'].height * platform_types['plane_m_2'].scale.y - 10})
  addPlatform('plane_m_2')
  
  addPlatform('plane_b_3')
  addDecoration('tree_1', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y})
  addDecoration('bush_1', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y - 10})
  addPlatform('plane_b_3')
  addPlatform('plane_m_1')
  addPlatform('plane_m_2', {y: -0.1, bonus: true})
  path.length += l2
  addPlatform('plane_s_2', {alternate: true, alternate: true})
  addPlatform('plane_s_3', {y: h2, x: 0})
  // path.length += l1
  
  addDecoration('bush_1', {y: platform_types['plane_s_3'].height * platform_types['plane_s_3'].scale.y - 10})
  addPlatform('plane_s_1')
  addPlatform('plane_s_3', {y: h3, x: 20, bonus: true, alternate: true})
  addPlatform('plane_m_3', {bonus: true})
  path.length += l2
  addDecoration('tree_2', {y: platform_types['plane_m_2'].height * platform_types['plane_m_2'].scale.y})
  addPlatform('tree_plane', {y: platform_types['plane_m_2'].height * platform_types['plane_m_2'].scale.y + 75, x: 105, alternate: true, bonus: true})
  
  addPlatform('plane_m_2')
  addDecoration('bush_1', {y: platform_types['plane_m_3'].height * platform_types['plane_m_3'].scale.y - 10})
  addPlatform('plane_m_3')
  addPlatform('plane_b_3')
  addDecoration('tree_2', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y})
  addPlatform('tree_plane', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y + 75, x: 105, alternate: true, bonus: true})
  addPlatform('plane_b_3')


  path.length += l2
  addDecoration('bush_1', {y: platform_types['plane_m_3'].height * platform_types['plane_m_3'].scale.y - 10})
  addPlatform('plane_m_3')

  path.length += l2  
  addPlatform('plane_s_3', {y: h1})
  path.length += l3  
  addPlatform('plane_s_2', {y: h2, x: -20, bonus: true})
  path.length += l2
  addPlatform('plane_s_3', {y: h3, x: 50, alternate: true})
  addPlatform('plane_s_3')

  addPlatform('plane_m_3')
  addPlatform('plane_s_3', {y: h4, x: -50, bonus: true, alternate: true})
  addDecoration('bush_1', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y - 10})
  addPlatform('plane_b_3')
  addPlatform('plane_m_3')
  addPlatform('plane_b_3')
  addDecoration('tree_2', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y})
  addPlatform('tree_plane', {y: platform_types['plane_b_3'].height * platform_types['plane_b_3'].scale.y + 75, x: 105, alternate: true, bonus: true})
  addPlatform('plane_b_3')
  
  path.length += l2  
  addPlatform('plane_s_1', {y: h3, x: 100, alternate: true})
  addPlatform('plane_s_3')
  addPlatform('plane_s_1', {y: h4, x: 100, bonus: true, alternate: true})
  addDecoration('bush_1', {y: platform_types['plane_m_2'].height * platform_types['plane_m_2'].scale.y - 10})

  addPlatform('plane_m_2')
  addPlatform('plane_s_1', {y: h3, x: 100, alternate: true})
  addDecoration('tree_1', {y: platform_types['plane_s_3'].height * platform_types['plane_s_3'].scale.y})
  addPlatform('plane_s_3')
  // addPlatform('plane_b_3')
  // addPlatform('plane_b_3')

  path.length += l2

  addDecoration('bush_1', {y: platform_types['plane_m_2'].height * platform_types['plane_m_2'].scale.y - 10, x: 200})
  addPlatform('plane_m_2', {bonus: true})
  addPlatform('plane_b_3')
  finish = addDecoration('school')
  addPlatform('long_plane')


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
    frameRate: 40,
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

  pl.type = 'boy'

  pl.sprite.x = pl.start_pos.x
  pl.sprite.y = pl.start_pos.y
  pl.sprite.visible = false
  pl.spawn_place = pl.start_pos
  // pl.sprite.body.velocity.y += 10000


  pl.run_anim = 'boy_run'
  pl.jump_start_anim = 'boy_jump_start'
  pl.jump_fly_anim = 'boy_jump_fly'
  pl.jump_fall_anim = 'boy_jump_fall'

  pl.sprite.anims.play(pl.run_anim)

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
    frames: scene.anims.generateFrameNumbers('girl_jump', { start: 2, end: 15, first: 0 }),
    frameRate: 40,
    repeat: 0,
    onCompleteEvent: () => {
      console.log('! anim compl')      
    }
  }
  scene.anims.create(jump_start_config);

  let jump_fly_config = {
    key: 'girl_jump_fly',
    frames: scene.anims.generateFrameNumbers('girl_jump', { start: 17, end: 28 }),
    frameRate: 35,
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

  pl.type = 'girl'

  pl.sprite.x = pl.start_pos.x
  pl.sprite.y = pl.start_pos.y
  pl.sprite.visible = false
  pl.spawn_place = pl.start_pos

  pl.run_anim = 'girl_run'
  pl.jump_start_anim = 'girl_jump_start'
  pl.jump_fly_anim = 'girl_jump_fly'
  pl.jump_fall_anim = 'girl_jump_fall'

  pl.sprite.anims.play('girl_run')

  console.log(pl.sprite)
  // pl.sprite.scaleMode = Phaser.ScaleModes.NEAREST

  pl.sprite.setBounce(0)
  let plw = pl.sprite.body.width,
      plh = pl.sprite.body.height


  pl.sprite.setSize(30, 60)
  pl.sprite.setOrigin(0.75, 0.65)

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
  // camera.zoom = 2
  // camera.scrollX += 1500

  // camera.startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
  // camera.startFollow(player.sprite, true, 0.2, 0, 0, 0)
}


const initControl = (scene) => {
  controle = scene.input.keyboard.createCursorKeys()
  scene.input.on('pointerdown', function (pointer) {
    if (state.current_state == states.tutorial) {
      if (tutorial_frame == 4) {
        hideTutorial(ui)
        game_start(player.type)
        return
      }
    }
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
  sound.fall_down.play()
  
  ui.hearts[--player.life].visible = false
  if (player.life > 0) {

    player.sprite.x = player.spawn_place.x
    player.sprite.y = player.spawn_place.y
    player.speed = 10
    setTimeout(function(){
      player.speed = player.start_speed
    }, 1000)
  }
  else {
    finish_game()
  }
}


const finish_game = () => {
  state.current_state = states.start_menu
  animateFinalScreen("setScore", bonus_num*10 + player.life * 40) //  + (90 - timer(ui, start_time) * 2)
  // >12 stars + >=2 life == 120 + 80 == 200
  animateFinalScreen("startAnim")
  hideUI(ui)
  player.sprite.x = 0
  player.sprite.visible = false
  // player.sprite.destroy()
}


///////////////////////////////////////////////////
function update () {
  // background.tilePositionY += 1
  // background.tilePositionX += 3
  // camera.scrollX = 5500
  // if (state.current_state == states.start_menu) {
  //   player.sprite.anims.pause()
  // }
  // debug_label.setText(state.current_state)

  if (state.current_state == states.game) {
    let player_anim = player.sprite.anims,
        player_body = player.sprite.body

    let t = timer(ui, start_time)
    if (t <= 0) { // (t <= 0)
      finish_game()
      console.log('Time is out')
    }
    // debug_label.setText(player_anim.paused)
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
      player.sprite.anims.play(player.jump_fly_anim)
    }
    if ((player_anim.currentAnim.key == player.jump_fly_anim ) && player.sprite.body.blocked.down) {

      jump_down.x = player.sprite.x - 5
      jump_down.y = player.sprite.y + 5
      jump_down.anims.play('jump_down')

      player.sprite.anims.play(player.run_anim)
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

    // if (controle.up.isDown) {
    //   if (player.sprite.body.blocked.down) {
        
    //     player.jump()

    //     jump.x = player.sprite.x
    //     jump.y = player.sprite.y + 4
    //     jump.anims.play('jump')
    //   }
    // }

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

  if (state.current_state == states.pause) {
    if (player && player.sprite) {
      player.sprite.body.velocity.x = 0
    }
  }
}



const risezeWindow = (event) => {
  if ( state.current_state != states.pause && event.target.innerWidth > innerHeight) {
    prev_state = state.current_state
    state.current_state = states.pause
  }
  else {
      state.current_state = prev_state
  }
}
window.addEventListener("resize", risezeWindow)



export {create, game_tutorial, game_start, update}