class Player {

  constructor(params) {
    this.sprite = params.sprite
    this.start_speed = 200
    this.min_speed = 80
    this.max_speed = 400
    this.speed = 200
    this.jump_height = 650
  }

  jump() {
    if (this.sprite.body.blocked.down) {
      this.sprite.body.velocity.y = -this.jump_height
    }
  }

}

export {Player}