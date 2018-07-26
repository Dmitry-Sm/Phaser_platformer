class Player {

  constructor(params) {
    this.sprite = params.sprite
    this.start_speed = 200
    this.min_speed = 80
    this.max_speed = 400
    this.speed = 200
    this.jump_height = 650
    this.life = 3
    this.spawn_place = {x: 0, y: 100}
    this.start_pos = {
      x: 200,
      y: 200
    }
  }


  initPlayer (scene) {
    let anim_config = {
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

  jump() {
    if (this.sprite.body.blocked.down) {
      this.sprite.body.velocity.y = -this.jump_height
    }
  }

}

export {Player}