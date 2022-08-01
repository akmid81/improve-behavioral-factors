import { getElem, createElem } from './js/z.js';

showMessage();
setTimeout(bonusForUser, 2000);

function bonusForUser() {
   
   getElem('.div-bonus').style.opacity = 1;
   
   let timer;

   let options = {
      //root: null,
      //rootMargin: '0px',
      threshold: 0
   }

   let observer = new IntersectionObserver(startTimer, options);
   observer.observe(getElem('#bottom-element'));

   function startTimer(entry) {
      if (entry && !entry[0].isIntersecting) return;

      observer.unobserve(getElem('#bottom-element'));

      timer = getElem('#bonus-timer');
      let time = +timer.innerText;
      if (time <= 0) {
         showBonusButton();
         return;
      };
      setTimeout(startTimer, 1000);
      timer.innerText = time - 1;
   }

   function showBonusButton() {
      let button = createElem('button', 'show-bonus-button');
      button.innerText = 'Получить бонус';
      button.on('click', showBonus)
      getElem('.bonus-text').innerHTML = '';
      getElem('.bonus-text').append(button);
      getElem('#bonus-timer').innerText = '🎁';
   }

   function showBonus() {
      getElem('.bonus-text').innerText = `ВАШ КОД НА СКИДКУ - 10%
      XXXX-XXXX-XXXX`;
   }
}

function showMessage() {
   let divBonus = createElem('div', 'div-bonus');
   divBonus.innerHTML = `<div class="bonus-title">
            <div>БОНУС</div>
            <div class='bonus-close'>X</div>
         </div>
         <div class="bonus-body">
            <div class="bonus-text">Перейдите вниз страницы и дождитесь окончания отсчета таймера</div>
            <div id="bonus-timer">6</div>
         </div>`

   getElem('body').append(divBonus);

   getElem('.bonus-close').on('click', closeMessage);

   //целевой элемент для отслеживания прокрутки
   getElem('body').append(createElem('div','','bottom-element'));

   function closeMessage(e) {
      e.target.closest('.div-bonus').del()
   }
}

