const initUI = (scene) => {
  let w = window.innerWidth,
      h = window.innerHeight,
      display = scene.add.zone(w/2, h/2, w, h)

  const setScrollFactor = (el) => {
    el.scrollFactorX = el.scrollFactorY = 0
    // ui.add(el)
    return el
  }


  let h1 = scene.add.sprite(0, 0, 'heart').setScale(0.42)
  let h2 = scene.add.sprite(0, 0, 'heart').setScale(0.42)
  let h3 = scene.add.sprite(0, 0, 'heart').setScale(0.42)
  // hearts.add(h1)
  h1.visible = false
  h2.visible = false
  h3.visible = false


  let timer = scene.add.text(100, 10, '1:30', {
    font: '38px adineuePROCyr',
    fill: '#ffffff'
  })
  timer.visible = false

  let power = scene.add.sprite(0, 0, 'power').setScale(0.5)
  power.visible = false
  let power_label = scene.add.text(0, 0, 0, {
    font: '28px adineuePROCyr',
    fill: '#ffffff'
  })
  power_label.visible = false


  Phaser.Display.Align.In.TopLeft(h1.setScrollFactor(0), display)
  Phaser.Display.Align.In.TopLeft(h2.setScrollFactor(0), display)
  Phaser.Display.Align.In.TopLeft(h3.setScrollFactor(0), display)

  Phaser.Display.Align.In.TopCenter(timer.setScrollFactor(0), display)

  Phaser.Display.Align.In.TopRight(power.setScrollFactor(0), display)
  Phaser.Display.Align.In.TopRight(power_label.setScrollFactor(0), display)


  h2.x += 30
  h3.x += 60

  power.x += 38
  power.y -= 18

  power_label.x -= 30
  power_label.y += 10

  let phrases = {
    boy: [],
    girl: []
  }
  let hole = scene.add.sprite(0, 0, 'hole').setOrigin(0.5, 0.5).setScrollFactor(0)


  let finger1 = scene.add.sprite(w, h - 5, 'finger1').setScale(0.25).setOrigin(1.2, 1)
  let finger2 = scene.add.sprite(w, h - 5, 'finger2').setScale(0.25).setOrigin(1.2, 1)

  let finger = {visible: false}
  // console.log('!-- ',  finger1.texture.key)

  finger1.visible = false
  finger2.visible = false
  var finger_anim = setInterval(() => {
    if (!finger.visible) {
      finger1.visible = false
      finger2.visible = false
      return
    }

    if (finger1.visible) {
      finger1.visible = false
      finger2.visible = true
    }
    else {
      finger1.visible = true
      finger2.visible = false
    }
  }, 500)


  let phrase_scale = 0.45
  phrases.boy.push (scene.add.sprite(120,  h - 433 * 0.3 - 50, 'b_ph_1').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.boy.push (scene.add.sprite(110,  h - 433 * 0.3 - 50, 'b_ph_2').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.boy.push (scene.add.sprite(110,  h - 433 * 0.3 - 50, 'b_ph_3').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.boy.push (scene.add.sprite(110,  h - 433 * 0.3 - 50, 'b_ph_4').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.boy.push (scene.add.sprite(90,   h - 433 * 0.3 - 50, 'b_ph_5').setScale(phrase_scale).setOrigin(-0.5, 1))

  phrases.girl.push (scene.add.sprite(120,  h - 433 * 0.3 - 50, 'g_ph_1').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.girl.push (scene.add.sprite(110,  h - 433 * 0.3 - 50, 'g_ph_2').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.girl.push (scene.add.sprite(110,  h - 433 * 0.3 - 50, 'g_ph_3').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.girl.push (scene.add.sprite(110,  h - 433 * 0.3 - 50, 'g_ph_4').setScale(phrase_scale).setOrigin(-0.5, 1))
  phrases.girl.push (scene.add.sprite(90,   h - 433 * 0.3 - 50, 'g_ph_5').setScale(phrase_scale).setOrigin(-0.5, 1))


  let hole_params = []
  hole_params.push({x: w/3 - 15, y: h - 433 * 0.3 - 50, scale: 1.2})
  hole_params.push({x: w - 52,   y: 20,      scale: 1})
  hole_params.push({x: w/2 + 8,      y: 20,      scale: 1})
  hole_params.push({x: 57,       y: 20,      scale: 1})
  hole_params.push({x: -200,     y: h/2,    scale: 1.5})

  hole.setScale(1.2)
  hole.y = 30
  hole.x = w - 52
  hole.x = w/2
  hole.x = 57

  // setScrollFactor(hole)


  let ui = {
    hearts: [h1, h2, h3],
    timer,
    power,
    power_label,
    phrases,
    hole,
    hole_params,
    finger
  }

  hideTutorial(ui)
  return ui
}


const timer = (ui, start_time) => {
  let cur_time = new Date()

  let time = Math.floor(90 + (start_time - cur_time)/1000)

  if (time%60 < 10)
    ui.timer.setText(Math.floor(time/60) + ' : 0' + time%60)
  else
    ui.timer.setText(Math.floor(time/60) + ' : ' + time%60)

  return time
}


const showUI = (ui) => {
  for (let h of ui.hearts) {
    h.visible = true
  }
  ui.timer.visible = true
  ui.power.visible = true
  ui.power_label.visible = true
}


const showTutorial = (ui, player_type, number) => {
  hideTutorial(ui)
  ui.phrases[player_type][number].visible = true
  ui.hole.visible = true
  ui.hole.x = ui.hole_params[number].x
  ui.hole.y = ui.hole_params[number].y
  ui.hole.setScale(ui.hole_params[number].scale)
  if (number == 4) {
    ui.finger.visible = true
  }
  else {
    ui.finger.visible = false
  }
}

const hideTutorial = (ui) => {
  for (let ph of ui.phrases.boy) {
    ph.visible = false
  }
  for (let ph of ui.phrases.girl) {
    ph.visible = false
  }
  ui.hole.visible = false
  ui.finger.visible = false
}


const hideUI = (ui) => {
  for (let h of ui.hearts) {
    h.visible = false
  }
  ui.timer.visible = false
  ui.power.visible = false
  ui.power_label.visible = false
}



export {
  initUI,
  timer,
  showUI,
  hideUI,
  showTutorial,
  hideTutorial
}