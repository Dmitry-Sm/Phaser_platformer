class Block {

  constructor(params) {
    this.name = params.name || null
    this.type = params.type || 'platform'
    this.width = params.width || 100
    this.height = params.height || 200
    this.scale = params.scale || {x: 0.3, y: 0.3}
  }

}

export {Block}