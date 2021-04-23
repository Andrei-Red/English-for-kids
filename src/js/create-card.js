import {myData} from './group.js'
import {numOfCard, widthCard, buttonFlipImg, numColumnTrain} from './constants.js'
import {statistic} from './statistic-page.js';


const createCard = {

    createCardMenu() {
        localStorage.setItem('page', '0')
        this._checkMainContentClass()

        for (let  i = 0; i < numOfCard; i++) {
            addCardContent(i)
        }
        
        function addCardContent (i) {
            let cardFront = document.getElementById(`${i}`)
    
            cardFront.innerHTML=`<div><img src='${myData.menu[i].img}' width="${widthCard}"></div>`; 
    
            const nameCategory = document.createElement('div');
            nameCategory.className = 'name-category';
            nameCategory.innerHTML = `${myData.menu[i].nameEn}`;
            document.getElementById(i).appendChild(nameCategory);
        }
        this._buttonForTrainGame() 
    }, 

    createCardCategory(numCategory) {
        const addFlipCardOnClickF = this._flipCardOnClick;
        const addBackFlipCardF = this._backFlipCardOnMouseout;
        const addPlaySoundOnClickF = this._playSoundOnClick;
        
        localStorage.setItem('page', numCategory)
        this._checkMainContentClass()

        for (let  i = 0; i < numOfCard; i++) {
            addCardContent (i);
        };
    
        function addCardContent (i) {
            const cardFrontSs = document.getElementById(`${i}`);
            cardFrontSs.innerHTML = `<span id='${i}s1' class="front"></span>
                                     <span id='${i}s2' class="back"></span>`; 
            
            // for mark category                         
            for (let j = 0; j < numOfCard; j++) { cardFrontSs.classList.remove(j) } ;
            cardFrontSs.classList.add(`${numCategory}`);
    
    
            let cardFront = document.getElementById(`${i}s1`);
            let cardBack = document.getElementById(`${i}s2`);
    
            const arrCategoryName = Object.keys(myData);
            let categoryName = arrCategoryName[numCategory] ;
            cardFront.textContent = myData[categoryName][i].nameEn;
    
            const buttonFlip = document.createElement('div');
            buttonFlip.innerHTML = `<img class="icon-arrow" src=${buttonFlipImg}></img>`;
            buttonFlip.id = `${i}icon`;
            cardFront.append(buttonFlip);
            
            cardFront.style.backgroundImage = myData[categoryName][i].img ;
            cardFront.classList.add('styleBg');
            
        
            cardBack.textContent = myData[categoryName][i].nameRu;
            cardBack.style.backgroundImage = myData[categoryName][i].img;
            cardBack.classList.add('styleBg');
    
            addFlipCardOnClickF(i);
            addBackFlipCardF(i);
            addPlaySoundOnClickF(categoryName, i);
        };
        this._buttonForTrainGame()  
    }, 

    createCardCategoryForPaly(numCategory) {
        
        localStorage.setItem('page', `${numCategory}`)
        this._checkMainContentClass()

        for (let  i = 0; i < numOfCard; i++) {
            addCardContent (i)
        }
    
    
        function addCardContent (i) {
            const cardFrontPaly = document.getElementById(`${i}`);
            cardFrontPaly.innerHTML = `<span id='${i}s1' class="front"></span>`;
            
            // for mark category                         
            for (let j = 0; j < numOfCard; j++) { cardFrontPaly.classList.remove(j) };
            cardFrontPaly.classList.add(`${numCategory}`);
    
    
            let cardFront = document.getElementById(`${i}s1`);
         
            const arrCategoryName = Object.keys(myData);
            let categoryName = arrCategoryName[numCategory];
            cardFront.style.backgroundImage = myData[categoryName][i].img ;
            cardFront.className = 'front styleBg styleBgPlay';
        }
        this._buttonForPlayGame();
    },

    _buttonForTrainGame() {
        const buttonFoStartGame = document.querySelector('.main-content-button');
        buttonFoStartGame.classList.remove('active');
    },

    _buttonForPlayGame() {
        const buttonFoStartGame = document.querySelector('.main-content-button');
        buttonFoStartGame.classList.add('active');
        const btn = document.getElementById('button'); 
        btn.innerHTML = '<button class="btn btn-success" id="btn1">Start</button>';
    },

    _flipCardOnClick (i) {
        const buttonFlip = document.getElementById(`${i}icon`);
        const elementFront = document.getElementById(`${i}s1`);
        const elementBack = document.getElementById(`${i}s2`);
        buttonFlip.addEventListener('click', (e) => {
            elementFront.classList.toggle('flip');
            elementBack.classList.toggle('backflip');
    
            // add statistic
            const numCategory = Number(localStorage.getItem('page'))
            statistic.setLocaleStorageStatistic(numCategory, i, numColumnTrain)           
        })
    },

    _backFlipCardOnMouseout (i) {
        const card = document.getElementById(`${i}`);
        const elementFront = document.getElementById(`${i}s1`);
        const elementBack = document.getElementById(`${i}s2`);
    
        card.addEventListener('mouseleave', () => {
            try {
                if (document.getElementById(`${i}s1`).classList[1]) {
                    elementFront.classList.remove('flip');
                    elementBack.classList.remove('backflip');
                }
            } catch {};
        });
    },

    _playSoundOnClick (numCategory, i) {
        const arrCategoryName = Object.keys(myData);

        const cardFront = document.getElementById(`${i}s1`);
        const road = myData[numCategory][i].sound;

        cardFront.addEventListener('click', () => {
            const audio = new Audio();
            audio.src = road;
            audio.autoplay = true;
        });
    }, 

    _checkMainContentClass () {
        const mainContent = document.querySelector('.main-content')
        const isHideClass = [...mainContent.classList].includes('hide')
        const statisticContent = document.querySelector('.main-content-table')
        
        if (isHideClass) {
            mainContent.classList.remove('hide')
            statisticContent.classList.add('hide')
        }
    } 
};

export {createCard};
