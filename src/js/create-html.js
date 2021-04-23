import { myData } from './group.js';
import {
  numOfListMenu,
  numOfCard,
  authorName,
  authorLink,
  nameApplication,
  numOfFooterBlock,
  linkSchool,
  nameShool,
  imgLogoSchool,
  linkGIT,
} from './constants.js';

const createHTML = {

  createAdditionalElem() {
    const createOverlay = () => {
      this._createElementHTML('div', 'overlay', 'body');
    };

    const createLocaleStorageStartPage = () => {
      localStorage.setItem('page', 0);
    };

    createLocaleStorageStartPage();
    createOverlay();
  },

  createHeaderHtml() {
    const createHeader = () => {
      this._createElementHTML('header', 'wrapper', 'body');
    };

    const createBurgerMenu = () => {
      this._createElementHTML('div', 'burger', 'header');
      this._createElementHTML('div', 'burger-wrapper', '.burger');
      this._createElementHTML('div', 'burger-item', '.burger-wrapper');
      this._createElementHTML('span', null, '.burger-item');
      this._createElementHTML('nav', 'header-menu', '.burger-wrapper');
      this._createElementHTML('ul', 'header-list', '.header-menu');

      for (let i = 0; i < numOfListMenu; i++) {
        this._createElementHTML('li', 'header-link', '.header-list', `${i}b`);
      }
    };

    const createBurgerMenuList = () => {
      const arrNameCategory = Object.keys(myData);
      for (let i = 0; i < numOfListMenu; i++) {
        if (i === numOfListMenu - 1) {
          document.getElementById(`${i}b`).textContent = 'statistic';
        } else {
          document.getElementById(`${i}b`).textContent = arrNameCategory[i];
        }
      }
    };

    const createLogo = () => {
      this._createElementHTML('div', 'logo', 'header');
      const logo = this._getHTMLElementByQuerySelector('.logo');
      logo.textContent = nameApplication;
    };

    const createPlayButton = () => {
      this._createElementHTML('div', 'play', 'header');
      const playButton = this._getHTMLElementByQuerySelector('.play');
      playButton.innerHTML = '<input type = "checkbox" name = "checkbox" class = "cm-toggle">';
    };

    createHeader();
    createBurgerMenu();
    createBurgerMenuList();
    createLogo();
    createPlayButton();
  },

  createMainHtml() {
    const createMain = () => {
      this._createElementHTML('main', 'wrapper', 'body', 'main');
    };

    const createMainContent = () => {
      this._createElementHTML('div', 'main-content', 'main');
    };

    const createMainContentBox = () => {
      for (let i = 0; i < numOfCard; i++) {
        this._createElementHTML('div', 'main-content-box', '.main-content', `${i}`);
        const divMainContentBoxNow = document.getElementById(i);

        const spanFront = document.createElement('span');
        spanFront.className = 'front';
        spanFront.id = `${i}s1`;

        const spanBack = document.createElement('span');
        spanBack.className = 'back';
        spanBack.id = `${i}s2`;

        divMainContentBoxNow.appendChild(spanFront);
        divMainContentBoxNow.appendChild(spanBack);
      }
    };

    const createMainContentPlay = () => {
      this._createElementHTML('div', 'main-content-play', '.main-content');
      this._createElementHTML('div', 'main-content-button', '.main-content-play', 'button');
      this._createElementHTML('button', 'btn', '.main-content-button', 'btn1');
      const btn = this._getHTMLElementByQuerySelector('.btn');
      btn.textContent = 'Start';
      btn.classList.add('btn-success');
      this._createElementHTML('div', 'main-content-indicator', '.main-content-play', 'indicator');
    };

    createMain();
    createMainContent();
    createMainContentBox();
    createMainContentPlay();
  },

  createFooterHtml() {
    const createFooter = () => {
      this._createElementHTML('footer', 'wrapper', 'body');
    };

    const createCardFoo = () => {
      for (let i = 0; i < numOfFooterBlock; i++) {
        this._createElementHTML('div', 'card-foo', 'footer');
      }

      const arrElemFooterBlock = document.querySelectorAll('.card-foo');

      this._createElementHTML('h5', 'card-title', arrElemFooterBlock[0]);
      const linkAccount = this._getHTMLElementByQuerySelector('.card-title');
      linkAccount.innerHTML = `Created <a href="${authorLink}">${authorName}</a>`;
      this._createElementHTML('p', 'card-text', '.card-foo');
      const nameApp = this._getHTMLElementByQuerySelector('.card-text');
      nameApp.textContent = `This is app ${nameApplication}`;

      this._createElementHTML('h5', 'card-text', arrElemFooterBlock[1]);
      const cardText = document.querySelectorAll('.card-text')[1];
      cardText.innerHTML = `Created thanks to <a href="${linkSchool}">${nameShool}</a>`;
      this._createElementHTML('img', 'imgRS', arrElemFooterBlock[1]);
      const imgCard = this._getHTMLElementByQuerySelector('.imgRS');
      imgCard.src = imgLogoSchool;

      this._createElementHTML('p', 'text-left', arrElemFooterBlock[2]);
      const textLeftElem = this._getHTMLElementByQuerySelector('.text-left');
      textLeftElem.innerHTML = `© 2020 English for kids | <a href="${linkGIT}"> AndreiGIT.</a>`;
    };

    createFooter();
    createCardFoo();
  },

  _getHTMLElementByQuerySelector(name) {
    const element = document.querySelector(`${name}`);
    return element;
  },

  _createElementHTML(nameElement, nameClass, parentName, id) {
    if (typeof (parentName) === 'object') {
      parent = parentName;
    } else if (typeof (parentName) === 'string') {
      parent = this._getHTMLElementByQuerySelector(parentName);
    }

    const element = document.createElement(nameElement);

    if (nameClass) {
      element.classList.add(nameClass);
    }
    if (id) {
      element.id = id;
    }
    parent.appendChild(element);
  },

};

export function startCreteHTML() {
  createHTML.createAdditionalElem();
  createHTML.createHeaderHtml();
  createHTML.createMainHtml();
  createHTML.createFooterHtml();
}
