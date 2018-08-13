
let sound = {
}


const initSound = (scene) => {
  sound = {
    choose_hero: scene.sound.add('choose hero'),
    hi_hero: scene.sound.add('hi, hero'),
    seconds: scene.sound.add('90 seconds'),
    bonus: scene.sound.add('bonus collect'),
    collect_energy: scene.sound.add('collect energy'),
    clock: scene.sound.add('clock'),
    run_and_jump: scene.sound.add('run and jump'),
    music: scene.sound.add('music'),
    winner_game: scene.sound.add('winner game'),
    fall_down: scene.sound.add('fall down')
  }

  sound.music.loop = true
  sound.music.volume = 0.5

  sound.clock.loop = true
  sound.clock.totalDuration = 0.7
  sound.clock.volume = 0.5
}


export {sound, initSound}
