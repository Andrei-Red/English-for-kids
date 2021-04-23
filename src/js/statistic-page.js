import { myData } from './group.js';
import {
  statisticPage, numOfCard, fieldStatisticTable, columnStatisticTable,
} from './constants.js';

const statistic = {
  getStatisticList() {
    localStorage.setItem('page', statisticPage);
    const mainContent = document.querySelector('.main-content');
    this._hideContent(mainContent);

    createStatisticTable();
    filingStatisticTable();
    createBottomClearStatistic();

    function createStatisticTable(field = fieldStatisticTable, column = columnStatisticTable) {
      const wrapperContent = document.getElementById('main');
      const mainContentForWr = document.createElement('div');
      mainContentForWr.className = 'main-content-table';
      wrapperContent.appendChild(mainContentForWr);

      const mainContent = document.querySelector('.main-content-table');
      const table = document.createElement('table');
      table.classList = 'table-statistic table-striped table-dark';

      for (let i = 0; i < field; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < column; j++) {
          if (i === 0) {
            const th = document.createElement('th');
            th.setAttribute('scope', 'col');

            tr.appendChild(th);
          } else {
            const td = document.createElement('td');
            tr.appendChild(td);
          }
        }
        table.appendChild(tr);
      }
      mainContent.appendChild(table);
    }

    function createBottomClearStatistic() {
      const buttonClearStatistic = document.createElement('div');
      buttonClearStatistic.classList = 'btn-statistic';
      const mainContentTable = document.querySelector('.main-content-table');

      buttonClearStatistic.innerHTML = '<button id="btn3" class="btn btn-success">Clear</button>\'';
      mainContentTable.appendChild(buttonClearStatistic);

      const getButtonClearStatistic = document.getElementById('btn3');
      getButtonClearStatistic.addEventListener('click', () => {
        localStorage.removeItem('statistic');
        statistic._createDateInLocaleStorage();

        filingStatisticTable();
      });
    }

    function filingStatisticTable(column = columnStatisticTable) {
      const statisticObj = JSON.parse(localStorage.getItem('statistic'));
      const arrTableTh = document.querySelectorAll('th');
      const arrWord = [];
      const arrStatistic = [];

      arrTableTh[0].textContent = 'Words';
      arrTableTh[1].textContent = 'Trained';
      arrTableTh[2].textContent = 'Correct';
      arrTableTh[3].textContent = 'Incorrect';
      arrTableTh[4].textContent = 'Percent';

      for (let i = 1; i <= numOfCard; i++) {
        const keyCategory = Object.keys(statisticObj[i]);

        for (let j = 1; j <= numOfCard; j++) {
          const word = keyCategory[j - 1];
          const arrSt = statisticObj[i][keyCategory[j - 1]];

          arrWord.push(word);
          arrStatistic.push(arrSt);
        }
      }

      const arrTdTable = document.querySelectorAll('td');
      const lengthTdTable = document.querySelectorAll('td').length;

      for (let i = 0; i < lengthTdTable; i++) {
        if (i % column === 0) {
          arrTdTable[i].textContent = arrWord[i / column];
          arrTdTable[i + 1].textContent = arrStatistic[(i / column)][0];
          arrTdTable[i + 2].textContent = arrStatistic[(i / column)][1];
          arrTdTable[i + 3].textContent = arrStatistic[(i / column)][2];

          const percent = (arrStatistic[(i / column)][1]) / (arrStatistic[(i / 5)][1] + arrStatistic[(i / column)][2]) * 100;
          arrTdTable[i + 4].textContent = isNaN(percent) ? 0 : Math.round(percent);
        }
      }
    }
  },

  checkDateInLocaleStorage() {
    const localeStorageData = localStorage.getItem('statistic');
    if (!localeStorageData) {
      this._createDateInLocaleStorage();
    }
  },

  _createDateInLocaleStorage() {
    const statisticObj = {};
    const arrCategoryName = Object.keys(myData);

    // localStorage
    for (let i = 1; i < numOfCard; i++) {
      const arrCategory = {};
      for (let j = 0; j < numOfCard; j++) {
        const nameCategory = arrCategoryName[i];
        arrCategory[myData[nameCategory][j].nameEn] = [0, 0, 0];
      }
      statisticObj[i] = arrCategory;
    }
    localStorage.setItem('statistic', JSON.stringify(statisticObj));
  },

  setLocaleStorageStatistic(numCategory, numWord, numColumn) {
    const statisticObj = JSON.parse(localStorage.getItem('statistic'));
    const keyCategory = Object.keys(statisticObj[numCategory]);
    statisticObj[numCategory][keyCategory[numWord]][numColumn] = statisticObj[numCategory][keyCategory[numWord]][numColumn] + 1;
    localStorage.setItem('statistic', JSON.stringify(statisticObj));
  },

  _hideContent(content) {
    content.classList.toggle('hide');
  },

};

export { statistic };
