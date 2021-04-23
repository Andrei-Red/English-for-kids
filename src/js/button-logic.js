import { createCard } from './create-card.js';
import { numOfListMenu, statisticPage, numOfCard } from './constants.js';
import { startGame } from './game-logic.js';
import { statistic } from './statistic-page.js';

const buttonLogic = {

  burgerButtonOperation() {
    const burger = document.querySelector('.burger-item');
    const nav = document.querySelector('.header-menu');
    const overlay = document.querySelector('.overlay');

    burger.addEventListener('click', () => {
      toggleMenu();
      createStyleLinkForThisPage();
    });

    overlay.addEventListener('click', () => {
      toggleMenu();
    });

    for (let i = 0; i < numOfListMenu; i++) {
      document.getElementById(`${i}b`).addEventListener('click', () => {
        localStorage.setItem('page', i);
        toggleMenu();
        this._definePageAndMakePage(i);
      });
    }

    function toggleMenu() {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      document.querySelector('.overlay').classList.toggle('lock');
      document.querySelector('body').classList.toggle('lock');
    }

    function createStyleLinkForThisPage() {
      clearStyleLinkForThisPage();
      const thisPage = localStorage.getItem('page');

      if (!thisPage) {
        document.getElementById(`${0}b`).classList.add('active-list');
        localStorage.setItem('page', 0);
      } else if (thisPage === 0) {
        document.getElementById(`${thisPage}b`).classList.add('active-list');
      } else if (thisPage === statisticPage) {
        document.getElementById(`${thisPage}b`).classList.add('active-list');
      } else {
        document.getElementById(`${thisPage}b`).classList.add('active-list');
      }

      function clearStyleLinkForThisPage() {
        for (let i = 0; i < numOfListMenu; i++) {
          document.getElementById(`${i}b`).classList.remove('active-list');
        }
      }
    }
  },

  toggleAndCheckButtonForGame() {
    localStorage.setItem('gameState', 'train');

    const switchGame = document.querySelector('.cm-toggle');
    switchGame.addEventListener('click', () => {
      const numPage = Number(localStorage.getItem('page'));

      if (localStorage.getItem('gameState') === 'train') {
        localStorage.setItem('gameState', 'paly');
        this._defineNumPageForDraw(numPage, true);
        startGame();
      } else if (localStorage.getItem('gameState') === 'paly') {
        localStorage.setItem('gameState', 'train');
        this._defineNumPageForDraw(numPage, false);
      }
    });
  },

  StartAppWithPageMenu() {
    const numPage = Number(localStorage.getItem('page'));
    if (numPage === 0) {
      createCard.createCardMenu();
    }
  },

  choseCategoryInMenuPage() {
    const numPage = Number(localStorage.getItem('page'));

    if (numPage === 0) {
      for (let i = 0; i < numOfCard; i++) {
        const card = document.getElementById(i);
        card.addEventListener('click', () => {
          const numPage = i + 1;

          if (Number(localStorage.getItem('page')) === 0) {
            this._definePageAndMakePage(numPage);
          }
        });
      }
    }
  },

  _definePageAndMakePage(numPage) {
    defineStatusGame();

    function defineStatusGame() {
      const statusGameIsTrain = localStorage.getItem('gameState') === 'train';
      if (statusGameIsTrain) {
        forTrainGame();
      } else if (!statusGameIsTrain) {
        forPlayGame();
      }
    }

    function forTrainGame() {
      if (numPage === 0) {
        createCard.createCardMenu();
      } else if (numPage === statisticPage) {
        statistic.checkDateInLocaleStorage();
        statistic.getStatisticList();
      } else {
        createCard.createCardCategory(numPage);
      }
    }

    function forPlayGame() {
      if (numPage === 0) {
        createCard.createCardMenu();
      } else if (numPage === statisticPage) {
        statistic.checkDateInLocaleStorage();
        statistic.getStatisticList();
      } else {
        createCard.createCardCategoryForPaly(numPage);
      }
    }
  },

  _defineNumPageForDraw(numPage, play = false) {
    if (numPage === 0) {
      createCard.createCardMenu();
    } else if (numPage === statisticPage) {
      statistic.checkDateInLocaleStorage();
      statistic.getStatisticList();
    } else if (play) {
      createCard.createCardCategoryForPaly(numPage);
    } else {
      createCard.createCardCategory(numPage);
    }
  },

};

export function startButtonsOperation() {
  buttonLogic.StartAppWithPageMenu();
  buttonLogic.burgerButtonOperation();
  buttonLogic.toggleAndCheckButtonForGame();
  buttonLogic.choseCategoryInMenuPage();
}
