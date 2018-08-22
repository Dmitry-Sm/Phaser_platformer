
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
  // sound.clock.totalDuration = 0.7
  sound.clock.volume = 0.5
  
  // setTimeout(() => {
  //   for (let s in sound) {
  //     console.log(sound[s].volume)
  //   }
  // }, 0)

}

const mute = () => {
  sound.clock.mute = true
  // for (let s in sound) {
  //   // console.log(sound[s].volume);
  //   sound[s].mute = true
  // }
}

const unmute = () => {
  sound.clock.mute = false
  // for (let s in sound) {
  //   sound[s].mute = false
  //   // console.log(sound[s].volume);
  // }
}


export {sound, initSound, mute, unmute}
