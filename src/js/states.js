
const states = {
  start_menu: 'start_menu',
  player_choosing: 'player_choosing',
  tutorial: 'tutorial',
  game: 'game',
  pause: 'pause',
  finished: 'finished',
  finish_menu: 'finish_menu'
}

var state = {
  current_state: states.start_menu,
  set_state: (st) => {
    state.current_state = st
  }
}


export {state, states}
