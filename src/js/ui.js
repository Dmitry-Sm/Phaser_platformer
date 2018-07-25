const initUI = (scene) => {
  let w = window.innerWidth,
      h = window.innerHeight,
      display = scene.add.zone(w/2, h/2, w, h)

  const addElement = (el) => {
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


  let timer = scene.add.text(100, 10, '12 : 24', {
    font: '38px adineue PRO Cyr',
    fill: '#ffffff'
  })
  timer.visible = false

  let power = scene.add.sprite(0, 0, 'power').setScale(0.5)
  power.visible = false
  let power_label = scene.add.text(0, 0, 0, {
    font: '28px adineue PRO Cyr',
    fill: '#ffffff'
  })
  power_label.visible = false

  let ui = {
    hearts: [h1, h2, h3],
    timer,
    power,
    power_label
  }

  Phaser.Display.Align.In.TopLeft(addElement(h1), display)
  Phaser.Display.Align.In.TopLeft(addElement(h2), display)
  Phaser.Display.Align.In.TopLeft(addElement(h3), display)

  Phaser.Display.Align.In.TopCenter(addElement(timer), display)

  Phaser.Display.Align.In.TopRight(addElement(power), display)
  Phaser.Display.Align.In.TopRight(addElement(power_label), display)


  h2.x += 30
  h3.x += 60

  power.x += 38
  power.y -= 18

  power_label.x -= 30
  power_label.y += 10

  return ui
}


const showUI = (ui) => {
  for (let h of ui.hearts) {
    h.visible = true
  }
  ui.timer.visible = true
  ui.power.visible = true
  ui.power_label.visible = true
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
  showUI,
  hideUI
}