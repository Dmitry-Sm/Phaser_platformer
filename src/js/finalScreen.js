import {sound} from './sound'
import {animateStartScreen} from './startScreen'
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';


var event = document.createEvent('Event');

// Назначить имя событию
event.initEvent('restartGame', true, true);

function positionElem(_name, _x, _y) {
  _name.style["transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-o-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-ms-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-moz-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-webkit-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
}

function scaleElem(_name, _scale) {
  _name.style["transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-o-transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-ms-transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-moz-transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-webkit-transform"] = "scale(" + _scale + "," + _scale + ")";
}

var isAnimFinalScreen = [false, false];

function bindElem(elem) {
  return document.getElementById(elem);
}

var finalScreen = bindElem('finalScreen');
var blackPl = bindElem('blackPl');

var star1 = bindElem('star1');
var star2 = bindElem('star2');
var star3 = bindElem('star3');
var starsImages = [bindElem('starIm1'), bindElem('starIm2'), bindElem('starIm3')];

var txt1 = bindElem('txt1');
var txt2 = bindElem('txt2');

var blueCircle = bindElem('blueCircle');

var line = bindElem('line1');

var txtScore = bindElem('txtScore');
var score = bindElem('score');

var kubokScale = bindElem('kubokScale');
var kubokIm = bindElem('kubokIm');
var lushiCont = bindElem('lushiCont');

var btnSelfy = bindElem('btnSelfy');
var btnReplay = bindElem('btnReplay');
var isScore = 0;
var game_result = 'win or lose'

function animateFinalScreen(isStatus, score, game_res) {
  if (isStatus == "init") {
    // finalScreen.style.display="none";
    btnSelfy.addEventListener('touchstart', function (e) {
      if (canClick) {
        e.currentTarget.style['background-color'] = "rgba(250, 222, 81, 0.9)";
      }
    });
    btnSelfy.addEventListener('touchend', function (e) {
      if (canClick) {
        e.currentTarget.style['background-color'] = "rgba(250, 222, 81, 0.45)";
        /*canClick = false;
        frames = 0;
        isAnimFinalScreen[1] = true;*/
        window.open('shazam://openzap?zid=6Rim1c\&campaign=abc','_blank');

        if (game_result == 'win')
          yaCounter49926508.reachGoal('win_button_selfi')  
        if (game_result == 'lose')
          yaCounter49926508.reachGoal('lost_button_selfi')

      }
    });
  btnReplay.addEventListener('touchstart', function (e) {
      if (canClick) {
        e.currentTarget.style['background-color'] = "rgba(255, 255, 255, 0.9)";
        e.currentTarget.style.color = "#1540B8";
      }
    });
  btnReplay.addEventListener('touchend', function (e) {
      if (canClick) {
        e.currentTarget.style['background-color'] = "rgba(255, 255, 255, 0.45)";
        e.currentTarget.style.color = "white";
        canClick = false;
        frames = 0;
        isAnimFinalScreen[1] = true;
        sound.music.play()

        if (game_result == 'win')
          yaCounter49926508.reachGoal('win_play_again')  
        if (game_result == 'lose')
          yaCounter49926508.reachGoal('lost_play_again')
      }
    });
    //ubokIm.style["background-position"] = "-2px -2px";
  }
  if (isStatus == "startAnim") {
    game_result = game_res
    finalScreen.style.display="block";
    isAnimFinalScreen[0] = true;
    startPositionElem();
  }
  if (isStatus == "setScore") {
    isScore = score;
  }
}

function animKubok(obj) {
  var pos = obj.style["background-position"].split("px");
  let nowX = + pos[0];
  let nowY = + pos[1].trim();
  nowX -= 290;
  if (nowX <= -2005) {
    // if (nowX <= -7902) {
    nowX = -2
    nowY -= 513
    if (nowY < -2000)
      nowY = -2
  }
  // console.log(nowY);
  
  obj.style["background-position"] = nowX + "px " + nowY + "px";
}

var fps = 30;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var frames = 0;
var first = then;
var textsDown = ["НО СТАРАЙСЯ ЛУЧШЕ!", "ХОРОШО ПОЛУЧИЛОСЬ!", "ОТЛИЧНЫЙ РЕЗУЛЬТАТ!"];
var canClick = false;

function logicEndGame() {
  requestAnimationFrame(logicEndGame);
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - delta % interval;
    var time_el = (then - first) / 1000;
    if (isAnimFinalScreen[0]) {
      frames++;
      // animKubok(document.getElementById('kubokIm'));
      if (!isAnimFinalScreen[1]) {
        if (frames == 2) {
          blackPl.setAttribute('class', 'black-cont ease-in1');
          blackPl.style.opacity = 0.7;
        }
        if (frames == 3) {
          star1.setAttribute('class', 'star-left ease-in1');
          scaleElem(star1, 1);
        }
        if (frames == 5) {
          star2.setAttribute('class', 'star-middle ease-in1');
          scaleElem(star2, 1);
        }
        if (frames == 8) {
          star3.setAttribute('class', 'star-right ease-in1');
          scaleElem(star3, 1);
        }
        if (frames == 7) {
          txt1.setAttribute('class', 'txt-top ease-in2');
          positionElem(txt1, 0, 0);
        }
        if (frames == 10) {
          txt2.setAttribute('class', 'txt-down ease-in2');
          positionElem(txt2, 0, 0);
        }
        if (frames == 19) {
          blueCircle.setAttribute('class', 'blue-circle ease-inOut1');
          blueCircle.style.opacity = 1;
        }
        if (frames == 19) {
          line.setAttribute('class', 'line ease-inOut1');
          line.style.width = "76%";
        }
        if (frames == 24) {
          txtScore.setAttribute('class', 'txt-score ease-in2');
          positionElem(txtScore, 0, 0);
        }
        if (frames == 32) {
          score.setAttribute('class', 'score ease-in1');
          scaleElem(score, 1);
        }
        if (frames == 24) {
          kubokScale.setAttribute('class', 'kubok-sc ease-in1');
          scaleElem(kubokScale, 1);
        }
        if (frames == 28) {
          lushiCont.setAttribute('class', 'luchi ease-in2');
          lushiCont.style.opacity = 1;
        }
        if (frames == 28) {
          btnSelfy.setAttribute('class', 'btn-cont btn-selfy ease-in2');
          positionElem(btnSelfy, 0, 0);

        }
        if (frames == 32) {
          btnReplay.setAttribute('class', 'btn-cont btn-replay ease-in2');
          positionElem(btnReplay, 0, 0);
          canClick = true;
        }

      } else {
        if (frames == 3) {
          star1.setAttribute('class', 'star-left ease-out1');
          scaleElem(star1, 0);
        }
        if (frames == 5) {
          star2.setAttribute('class', 'star-middle ease-out1');
          scaleElem(star2, 0);
        }
        if (frames == 8) {
          star3.setAttribute('class', 'star-right ease-out1');
          scaleElem(star3, 0);
        }
        if (frames == 7) {
          txt1.setAttribute('class', 'txt-top ease-out2');
          positionElem(txt1, 200, 0);
        }
        if (frames == 12) {
          txt2.setAttribute('class', 'txt-down ease-out2');
          positionElem(txt2, 200, 0);
        }
        if (frames == 19) {
          blueCircle.setAttribute('class', 'blue-circle ease-inOut1');
          blueCircle.style.opacity = 0;
        }
        if (frames == 19) {
          line.style.left = "auto";
          line.style.right = "12%";
          line.style.width = "0%";
        }
        if (frames == 18) {
          txtScore.setAttribute('class', 'txt-score ease-out2');
          positionElem(txtScore, 200, 0);
        }
        if (frames == 23) {
          score.setAttribute('class', 'score ease-out1');
          scaleElem(score, 0);
        }
        if (frames == 18) {
          lushiCont.setAttribute('class', 'luchi ease-out1');
          lushiCont.style.opacity = 0;
        }
        if (frames == 28) {
          kubokScale.setAttribute('class', 'kubok-sc ease-out1');
          scaleElem(kubokScale, 0);
        }
        if (frames == 26) {
          btnReplay.setAttribute('class', 'btn-cont btn-replay ease-out1');
          positionElem(btnReplay, 0, 800);
        }
        if (frames == 28) {
          btnSelfy.setAttribute('class', 'btn-cont btn-selfy  ease-out1');
          positionElem(btnSelfy, 0, 800);
        }
        if (frames == 30) {
          blackPl.setAttribute('class', 'black-cont ease-out1');
          blackPl.style.opacity = 1;
        }
        if (frames == 60) {
          isAnimFinalScreen = [false, false];
          startPositionElem();
          finalScreen.style.display="none";
          // document.dispatchEvent(event);
          animateStartScreen("choosePlayer");
        }
      }
    }
  }
}
function startPositionElem() {
  frames = 0;
  blackPl.setAttribute('class', 'black-cont');
  blackPl.style.opacity = 0;

  star1.setAttribute('class', 'star-left');
  scaleElem(star1, 0);
  star2.setAttribute('class', 'star-middle');
  scaleElem(star2, 0);
  star3.setAttribute('class', 'star-right');
  scaleElem(star3, 0);

  txt1.setAttribute('class', 'txt-top');
  positionElem(txt1, -200, 0);
  txt2.setAttribute('class', 'txt-down');
  positionElem(txt2, -200, 0);

  blueCircle.setAttribute('class', 'blue-circle');
  blueCircle.style.opacity = 0;

  line.setAttribute('class', 'line');
  line.style.left = "12%";
  line.style.right = "auto";
  line.style.width = "0%";

  txtScore.setAttribute('class', 'txt-score');
  positionElem(txtScore, -200, 0);
  score.setAttribute('class', 'score');
  score.innerText = isScore;
  scaleElem(score, 0);

  kubokScale.setAttribute('class', 'kubok-sc');
  scaleElem(kubokScale, 0);
  lushiCont.setAttribute('class', 'luchi');
  lushiCont.style.opacity = 0;

  btnSelfy.setAttribute('class', 'btn-cont btn-selfy');
  positionElem(btnSelfy, 0, 800);
  btnReplay.setAttribute('class', 'btn-cont btn-replay');
  positionElem(btnReplay, 0, 800);
  txt2.innerText = textsDown[0];
  if (isScore >= 100) {
    starsImages[1].setAttribute('class', 'star-middle-im star-good');
    txt2.innerText = textsDown[1];
  } else {
    starsImages[1].setAttribute('class', 'star-middle-im star-bad');
  }
  if (isScore >= 200) {
    starsImages[2].setAttribute('class', 'star-right-im star-good');
    txt2.innerText = textsDown[2];
  } else {
    starsImages[2].setAttribute('class', 'star-right-im star-bad');
  }
}
startPositionElem();
logicEndGame();
export {
  animateFinalScreen,
  logicEndGame
}