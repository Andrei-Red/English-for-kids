import { winFinalImg, loseFinalImg } from './constants.js';

const createFinishPage = {
  createGameEndPage(mistake) {
    let loseText;
    const mainContent = document.querySelector('.main-content');
    this._clearMain(mainContent);

    if (mistake === 0) {
      mainContent.innerHTML = `<div class = "end-game">
                                        <img src=${winFinalImg}>
                                        <h2>You are the best!</h2>
                                        <h1>Good job!</h1>
                                    </div>`;
    } else {
      if (mistake === 1) {
        loseText = `${mistake} mistake`;
      } else {
        loseText = `${mistake} mistakes`;
      }
      mainContent.innerHTML = `<div class = "end-game">
                                        <h1>Oh no!</h1>
                                        <img src=${loseFinalImg}>
                                        <h2>You have ${loseText}</h2>
                                    </div>`;
    }

    setTimeout(resrartApp, 5000);

    function resrartApp() {
      location.reload();
    }
  },

  _clearMain(content) {
    content.innerHTML = '';
  },
};

export { createFinishPage };
