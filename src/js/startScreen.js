import {game_start} from './loop'


function positionElem(_name, _x, _y) {
  _name.style["transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-o-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-ms-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-moz-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
  _name.style["-webkit-transform"] = "translate3d(" + _x + "%, " + _y + "%, 0px)";
}

function rotateElem(_name, _deg) {
  _name.style["transform"] = "rotate(" + _deg + "deg)";
  _name.style["-o-transform"] = "rotate(" + _deg + "deg)";
  _name.style["-ms-transform"] = "rotate(" + _deg + "deg)";
  _name.style["-moz-transform"] = "rotate(" + _deg + "deg)";
  _name.style["-webkit-transform"] = "rotate(" + _deg + "deg)";
}

function scaleElem(_name, _scale) {
  _name.style["transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-o-transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-ms-transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-moz-transform"] = "scale(" + _scale + "," + _scale + ")";
  _name.style["-webkit-transform"] = "scale(" + _scale + "," + _scale + ")";
}

var isAnimStartScreen = [false, false, false];

function bindElem(elem) {
  return document.getElementById(elem);
}

var startScreen = bindElem('startScreen');
var blackPlStart = bindElem('blackPlStart');

var clockSc = bindElem('clockSc');
var clockRot = bindElem('clockRot');
var clock1 = bindElem('clock1');
var clock2 = bindElem('clock2');

var lushiContStart = bindElem('lushiContStart');

var txtFalgCont = bindElem('txtFalgCont');

var mskFlag1 = bindElem('mskFlag1');
var txtFlag1 = bindElem('txtFlag1');
var mskFlag2 = bindElem('mskFlag2');
var txtFlag2 = bindElem('txtFlag2');
var mskFlag3 = bindElem('mskFlag3');
var txtFlag3 = bindElem('txtFlag3');
var mskFlag4 = bindElem('mskFlag4');
var txtFlag4 = bindElem('txtFlag4');
var mskFlag5 = bindElem('mskFlag5');
var txtFlag5 = bindElem('txtFlag5');

var txtStartScreen1 = bindElem('txtStartScreen1');
var txtStartScreen2 = bindElem('txtStartScreen2');
var btnPlay = bindElem('btnPlay');

var txtStartScreen3 = bindElem('txtStartScreen3');
var txtStartScreen4 = bindElem('txtStartScreen4');
var txtStartScreen5 = bindElem('txtStartScreen5');

var ikon1 = bindElem('ikon1');
var player1 = bindElem('player1');
var txt1ikon1 = bindElem('txt1ikon1');
var txt2ikon1 = bindElem('txt2ikon1');

var ikon2 = bindElem('ikon2');
var player2 = bindElem('player2');
var txt1ikon2 = bindElem('txt1ikon2');
var txt2ikon2 = bindElem('txt2ikon2');

var ikons1 = bindElem('ikons1');
var ikons2 = bindElem('ikons2');
var btnPlayer1 = bindElem('btnPlayer1');
var btnPlayer2 = bindElem('btnPlayer2');

var playerIkon1 = bindElem('playerIkon1');
var playerIkon2 = bindElem('playerIkon2');

function animateStartScreen(isStatus) {
  if (isStatus == "init") {
    btnPlay.addEventListener('touchstart', function (e) {
      if (canClick) {
        e.currentTarget.style['background-color'] = "rgba(255, 255, 255, 0.9)";
        e.currentTarget.style.color = "#1540B8";
      }
    });
    btnPlay.addEventListener('touchend', function (e) {
      if (canClick) {
        e.currentTarget.style['background-color'] = "rgba(255, 255, 255, 0.45)";
        e.currentTarget.style.color = "white";
        canClick = false;
        frames = 0;
        isAnimStartScreen[1] = true;
      }
    });
    // кнопка персонажа 1
    btnPlayer1.addEventListener('touchend', function () {
      if (canClick) {
        scaleElem(ikons1, 1.15);
        canClick = false;
        frames = -10;
        isAnimStartScreen[0] = isAnimStartScreen[1] = false;
        isAnimStartScreen[2] = true;
        setTimeout(function(){
          game_start('man')
        },1000);
      }
    });
    // кнопка персонажа 2
    // btnPlayer2.addEventListener('touchend', function () {
    //   if (canClick) {
    //     scaleElem(ikons2, 1.15);
    //     canClick = false;
    //     frames = -10;
    //     isAnimStartScreen[0] = isAnimStartScreen[1] = false;
    //     isAnimStartScreen[2] = true;
    //     setTimeout(function(){
    //       game_start('woman')
    //     },1000);
    //   }
    // });
  }
  if (isStatus == "startAnim") {
    isAnimStartScreen[0] = true;
    startScreen.style.display="block";
    startPosElemStartGame();
  }
  if (isStatus == "choosePlayer") {
    startScreen.style.display="block";
    isAnimStartScreen[0] = isAnimStartScreen[1] = true;
    startPosElemStartGame();
    frames = 19;
  }
}

function animKubok(obj) {
  var nowX = obj.style["background-position"].split("px");
  nowX = +nowX[0];
  nowX -= 290;
  if (nowX <= -7902) nowX = -2;
  obj.style["background-position"] = nowX + "px -2px";
}

var fps = 30;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var frames = 0;
var first = then;
var canClick = false;

function logicStartGame() {
  requestAnimationFrame(logicStartGame);
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - delta % interval;
    var time_el = (then - first) / 1000;
    if (isAnimStartScreen[0]) {
      frames++;
      rotateElem(clockRot, -3 + Math.random() * 6);
      if (frames % 2 == 0) {
        var scaleLine = 1 + Math.random() * 0.1;
        scaleElem(clock1, scaleLine);
        scaleElem(clock2, scaleLine + Math.random() * 0.1);
      }
      if (!isAnimStartScreen[1]) {
        if (frames == 1) {
          blackPlStart.setAttribute('class', 'black-cont ease-in1');
          blackPlStart.style.opacity = 0.7;
        }
        if (frames == 4) {
          mskFlag1.setAttribute('class', 'txt-flag ease-out1');
          txtFlag1.setAttribute('class', 'txt-flag ease-out1');
          positionElem(mskFlag1, 0, 0);
          positionElem(txtFlag1, 0, 0);
        }
        if (frames == 17) {
          mskFlag2.setAttribute('class', 'txt-flag ease-linear1');
          txtFlag2.setAttribute('class', 'txt-flag ease-linear1');
          positionElem(mskFlag2, 0, 0);
          positionElem(txtFlag2, 0, 0);
        }
        if (frames == 21) {
          mskFlag3.setAttribute('class', 'txt-flag ease-linear1');
          txtFlag3.setAttribute('class', 'txt-flag ease-linear1');
          positionElem(mskFlag3, 0, 0);
          positionElem(txtFlag3, 0, 0);
        }
        if (frames == 25) {
          mskFlag4.setAttribute('class', 'txt-flag ease-linear1');
          txtFlag4.setAttribute('class', 'txt-flag ease-linear1');
          positionElem(mskFlag4, 0, 0);
          positionElem(txtFlag4, 0, 0);
        }
        if (frames == 29) {
          mskFlag5.setAttribute('class', 'txt-flag ease-in1');
          txtFlag5.setAttribute('class', 'txt-flag ease-in1');
          positionElem(mskFlag5, 0, 0);
          positionElem(txtFlag5, 0, 0);
        }
        if (frames == 22) {
          clockSc.setAttribute('class', 'clock-rot ease-in1');
          scaleElem(clockSc, 1);
        }
        if (frames == 26) {
          lushiContStart.setAttribute('class', 'luchi luchi2 ease-in1');
          lushiContStart.style.opacity = 1;
        }
        if (frames == 24) {
          txtStartScreen1.setAttribute('class', 'txt-start-screen1 ease-in2');
          positionElem(txtStartScreen1, 0, 0);
        }
        if (frames == 27) {
          txtStartScreen2.setAttribute('class', 'txt-start-screen1 ease-in2');
          positionElem(txtStartScreen2, 0, 0);
        }
        if (frames == 28) {
          canClick = true;
          btnPlay.setAttribute('class', 'btn-cont btn-replay ease-in1');
          positionElem(btnPlay, 0, 0);
        }
      } else {
        if (frames == 4) {
          txtFalgCont.setAttribute('class', 'txtFlag-cont ease-out1');
          positionElem(txtFalgCont, 150, 0);
        }
        if (frames == 7) {
          lushiContStart.setAttribute('class', 'luchi luchi2 ease-out1');
          lushiContStart.style.opacity = 0;
        }
        if (frames == 11) {
          clockSc.setAttribute('class', 'clock-rot ease-out1');
          scaleElem(clockSc, 0);
        }
        if (frames == 9) {
          txtStartScreen1.setAttribute('class', 'txt-start-screen1 ease-out2');
          positionElem(txtStartScreen1, 150, 0);
        }
        if (frames == 13) {
          txtStartScreen2.setAttribute('class', 'txt-start-screen1 ease-out2');
          positionElem(txtStartScreen2, 150, 0);
        }
        if (frames == 18) {
          btnPlay.setAttribute('class', 'btn-cont btn-replay ease-out1');
          positionElem(btnPlay, 150, 0);
        }
        if(frames==20){
          blackPlStart.setAttribute('class', 'black-cont ease-in1');
          blackPlStart.style.opacity = 0.5;
        }
        if (frames == 25) {
          txtStartScreen3.setAttribute('class', 'txt-start-screen1 ease-in1');
          positionElem(txtStartScreen3, 0, 0);
        }
        if (frames == 28) {
          txtStartScreen4.setAttribute('class', 'txt-start-screen1 ease-in1');
          positionElem(txtStartScreen4, 0, 0);
        }
        if (frames == 31) {
          txtStartScreen5.setAttribute('class', 'txt-start-screen1 ease-in1');
          positionElem(txtStartScreen5, 0, 0);
        }
        if (frames == 34) {
          ikon1.setAttribute('class', 'player-ikon-cont ikon1 ease-in1');
          scaleElem(ikon1, 1);
        }
        if (frames == 38) {
          player1.setAttribute('class', 'player-ikon-cont player1 ease-in1');
          scaleElem(player1, 1);
        }
        if (frames == 40) {
          txt1ikon1.setAttribute('class', 'txt-player ease-in1');
          positionElem(txt1ikon1, 0, 0);
          txt1ikon1.style.opacity = 1;
        }
        if (frames == 44) {
          txt2ikon1.setAttribute('class', 'txt-player ease-in1');
          positionElem(txt2ikon1, 0, 0);
          txt2ikon1.style.opacity = 1;
        }
        if (frames == 40) {
          ikon2.setAttribute('class', 'player-ikon-cont ikon2 ease-in1');
          scaleElem(ikon2, 1);
        }
        if (frames == 44) {
          player2.setAttribute('class', 'player-ikon-cont player2 ease-in1');
          scaleElem(player2, 1);
        }
        if (frames == 46) {
          txt1ikon2.setAttribute('class', 'txt-player ease-in1');
          positionElem(txt1ikon2, 0, 0);
          txt1ikon2.style.opacity = 1;
        }
        if (frames == 50) {
          canClick = true;
          txt2ikon2.setAttribute('class', 'txt-player ease-in1');
          positionElem(txt2ikon2, 0, 0);
          txt2ikon2.style.opacity = 1;
        }
      }
    }
    // финальная анимация
    if (isAnimStartScreen[2]) {
      frames++;
      if (frames == 1) {
        blackPlStart.setAttribute('class', 'black-cont ease-out1');
        blackPlStart.style.opacity = 0;
        txtStartScreen3.setAttribute('class', 'txt-start-screen1 ease-out1');
        positionElem(txtStartScreen3, 150, 0);
      }
      if (frames == 3) {
        txtStartScreen4.setAttribute('class', 'txt-start-screen1 ease-out1');
        positionElem(txtStartScreen4, 150, 0);
      }
      if (frames == 5) {
        txtStartScreen5.setAttribute('class', 'txt-start-screen1 ease-out1');
        positionElem(txtStartScreen5, 150, 0);
      }
      if (frames == 4) {
        playerIkon2.setAttribute('class', 'ikon-player ikon-player2 ease-out1');
        positionElem(playerIkon2, 150, 0);
      }
      if (frames == 8) {
        playerIkon1.setAttribute('class', 'ikon-player ikon-player1 ease-out1');
        positionElem(playerIkon1, 200, 0);
      }
      if(frames==30){
        startPosElemStartGame();
        startScreen.style.display="none";
        isAnimStartScreen[2]=false;
      }
    }
  }
}
logicStartGame();

function startPosElemStartGame() {
  frames = 0;
  playerIkon1.style.width = playerIkon2.style.width ="50%";
  playerIkon1.style.height = playerIkon2.style.height = "30%";
  playerIkon1.style.width = playerIkon2.style.width = Math.round(playerIkon1.clientWidth)+"px";
  playerIkon1.style.height = playerIkon2.style.height = Math.round(playerIkon1.clientHeight)+"px";

  blackPlStart.setAttribute('class', 'black-cont');
  blackPlStart.style.opacity = 1;
  for (var i = 1; i <= 5; i++) {
    bindElem('mskFlag' + i).setAttribute('class', 'txt-flag');
    bindElem('txtFlag' + i).setAttribute('class', 'txt-flag');
    if (i % 2 == 1) {
      positionElem(bindElem('mskFlag' + i), -100, 0);
      positionElem(bindElem('txtFlag' + i), 100, 0);
    } else {
      positionElem(bindElem('mskFlag' + i), 100, 0);
      positionElem(bindElem('txtFlag' + i), -100, 0);
    }
  };
  clockRot.setAttribute('class', 'clock-rot');
  rotateElem(clockRot, -3 + Math.random() * 6);
  clockSc.setAttribute('class', 'clock-rot');
  scaleElem(clockSc, 0);
  lushiContStart.setAttribute('class', 'luchi luchi2');
  lushiContStart.style.opacity = 0;

  txtStartScreen1.setAttribute('class', 'txt-start-screen1');
  positionElem(txtStartScreen1, -150, 0);
  txtStartScreen2.setAttribute('class', 'txt-start-screen2');
  positionElem(txtStartScreen2, -150, 0);
  btnPlay.setAttribute('class', 'btn-cont btn-replay');
  positionElem(btnPlay, 0, 300);

  // 

  txtStartScreen3.setAttribute('class', 'txt-start-screen1');
  positionElem(txtStartScreen3, -150, 0);
  txtStartScreen4.setAttribute('class', 'txt-start-screen1');
  positionElem(txtStartScreen4, -150, 0);
  txtStartScreen5.setAttribute('class', 'txt-start-screen1');
  positionElem(txtStartScreen5, -150, 0);

  ikon1.setAttribute('class', 'player-ikon-cont ikon1');
  scaleElem(ikon1, 0);
  player1.setAttribute('class', 'player-ikon-cont player1');
  scaleElem(player1, 0);
  txt1ikon1.setAttribute('class', 'txt-player');
  positionElem(txt1ikon1, 0, 60);
  txt1ikon1.style.opacity = 0;
  txt2ikon1.setAttribute('class', 'txt-player');
  positionElem(txt2ikon1, 0, 60);
  txt2ikon1.style.opacity = 0;

  ikon2.setAttribute('class', 'player-ikon-cont ikon2');
  scaleElem(ikon2, 0);
  player2.setAttribute('class', 'player-ikon-cont player2');
  scaleElem(player2, 0);
  txt1ikon2.setAttribute('class', 'txt-player');
  positionElem(txt1ikon2, 0, 20);
  txt1ikon2.style.opacity = 0;
  txt2ikon2.setAttribute('class', 'txt-player');
  positionElem(txt2ikon2, 0, 20);
  txt2ikon2.style.opacity = 0;

  playerIkon1.setAttribute('class', 'ikon-player ikon-player1');
  positionElem(playerIkon1, 0, 0);

  playerIkon2.setAttribute('class', 'ikon-player ikon-player2');
  positionElem(playerIkon2, 0, 0);
}
startPosElemStartGame();
export {
  animateStartScreen
}