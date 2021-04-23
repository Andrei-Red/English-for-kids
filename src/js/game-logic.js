import { myData } from './group.js';
import {
  numOfCard, rightSound, wrongSound, indicatorRightImg,
  indicatorWrongImg, numHelp, winFinalSound, loseFinalSound,
  numColumnRight, numColumnMistake,
} from './constants.js';
import { createFinishPage } from './final-page.js';
import { statistic } from './statistic-page.js';

const gameLogic = {

  clickOnButtonForGame() {
    const buttonGame = document.getElementById('button');
    buttonGame.addEventListener('click', () => {
      const statusGame = buttonGame.textContent === 'Start';
      if (statusGame) {
        this._createButtonForReplay();
        this._clickOnCardDuringGame();
      } else if (!statusGame) {
        // Repeat sound
        // this._playSoundOnDuringGame.call(this._createButtonForReplay.nameCategory, this._createButtonForReplay.randomNum[counter])
      }
    });
  },

  _createButtonForReplay() {
    const buttonGame = document.getElementById('button');
    buttonGame.innerHTML = '<button id="btn1" class="btn btn-warning" style="font-size: 1.8rem;">Repeat</button>';
  },

  _clickOnCardDuringGame() {
    const arrSoundObj = this._getLinkSoundCategory();
    const randomNum = this._getRandomArr();
    const nameCategory = Number(localStorage.getItem('page'));
    let counter = 0;
    let mistake = 0;

    this._playSoundOnDuringGame(nameCategory, randomNum[counter]);

    for (let i = 0; i < numOfCard; i++) {
      const cardFrontSs = document.getElementById(`${i}s1`);
      const gameCard = document.getElementById(i);

      gameCard.addEventListener('click', () => {
        if (gameCard.classList[2] !== 'disable') {
          if (i === randomNum[counter]) {
            this._playSound(rightSound);
            this._addImgInIndicatorBlock(indicatorRightImg);

            gameCard.classList.add('disable');

            counter++;

            // add statistic
            const numCategory = Number(localStorage.getItem('page'));
            statistic.setLocaleStorageStatistic(numCategory, i, numColumnRight);

            if (counter < numOfCard) {
              setTimeout(this._playSoundOnDuringGame, 1200, nameCategory, randomNum[counter]);
            }

            if (counter === numOfCard) {
              if (mistake === 0) {
                createFinishPage.createGameEndPage(mistake);
                this._playSound(winFinalSound);
              } else {
                createFinishPage.createGameEndPage(mistake);
                this._playSound(loseFinalSound);
              }
              counter = 0;
              mistake = 0;
            }
          } else {
            mistake++;
            this._playSound(wrongSound);
            this._addImgInIndicatorBlock(indicatorWrongImg);

            // add statistic
            const numCategory = Number(localStorage.getItem('page'));
            statistic.setLocaleStorageStatistic(numCategory, i, numColumnMistake);
          }
        }
      });
    }
  },

  _addImgInIndicatorBlock(url) {
    const indicator = document.getElementById('indicator');
    const image = document.createElement('img');
    image.src = url;
    image.style.order = numHelp;
    indicator.append(image);
  },

  _playSound(roadSound) {
    const road = roadSound;
    const audio = new Audio();
    audio.src = road;
    audio.autoplay = true;
  },

  _getLinkSoundCategory() {
    const numCategory = Number(localStorage.getItem('page'));
    const arrCategoryName = Object.keys(myData);
    const soundCategoryArr = {};

    for (let i = 0; i < numOfCard; i++) {
      const urlSound = myData[arrCategoryName[numCategory]][i].sound;
      soundCategoryArr[i] = urlSound;
    }

    return soundCategoryArr;
  },

  _changeButtonForGame() {
    const buttonGame = document.getElementById('button');
    buttonGame.innerHTML = '<button id="btn1" class="btn btn-warning" style="font-size: 1.8rem;">Repeat</button>';
  },

  _playSoundOnDuringGame(nameCategory, counter) {
    const arrCategoryName = Object.keys(myData);
    const categoryName = arrCategoryName[nameCategory];

    const road = myData[categoryName][counter].sound;

    const audio = new Audio();
    audio.src = road;
    audio.autoplay = true;
  },

  // https://ru.stackoverflow.com/questions/419706/
  _getRandomArr() {
    let arr; let max_number; let i; let
      unic;
    arr = [];
    max_number = 8;
    while (arr.length < max_number) {
      do {
        unic = true;
        var a = Math.floor(Math.random() * max_number);
        for (i = 0; i < arr.length; i++) {
          if (a == arr[i]) {
            // такое число уже было
            unic = false;
            break;
          }
        }
      } while (!unic); // повторить генерацию числа
      arr.push(a);
    }
    return arr;
  },
};

export function startGame() {
  gameLogic.clickOnButtonForGame();
}
