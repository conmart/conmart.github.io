import { xMax, yMax, move } from './orbMovement.js';

const initialOrbPosition = (orb) => {
  const initialX = Math.floor(Math.random() * xMax + 1);
  const initialY = Math.floor(Math.random() * yMax + 1);
  orb['translateX'] = initialX;
  orb['translateY'] = initialY;
};

const animateOrb = (div, orb) => {
  const request = requestAnimationFrame(() => animateOrb(div, orb));
  orb['request'] = request;
  move(orb);
};

const stopOnHover = (div, orb) => {
  let hoverClass = '';
  div.addEventListener('mouseenter', () => {
    div.classList.add('front')
    hoverClass =
      orb['translateX'] < xMax / 2 ? 'hoverBlurbRight' : 'hoverBlurbLeft';
    window.cancelAnimationFrame(orb['request']);
    div.firstElementChild.classList.add(hoverClass);
  });
  div.addEventListener('mouseleave', () => {
    div.classList.remove('front');
    animateOrb(div, orb);
    div.firstElementChild.classList.remove(hoverClass);
  });
};

const showPopupEventListener = (div, popup, popupContainer) => {
  div.addEventListener('click', () => {
    popup.classList.add('showPopup');
    popupContainer.classList.add('showPopup');
  });
};

const popupToggle = (orb) => {
  const popup = document.getElementById(orb['id'] + 'Popup');
  const popupContainer = document.getElementById('popups');
  const buttonTrigger = document.getElementById(orb['id'] + 'PopupTrigger');
  const imageTrigger = document.getElementById(orb['id']).lastElementChild;
  showPopupEventListener(buttonTrigger, popup, popupContainer);
  showPopupEventListener(imageTrigger, popup, popupContainer);
  document
    .getElementById(orb['id'] + 'ClosePopup')
    .addEventListener('click', () => {
      popup.classList.remove('showPopup');
      popupContainer.classList.remove('showPopup');
    });
};

const createPopup = (orb) => {
  const div = document.createElement('DIV');
  div.setAttribute('class', 'popup');
  div.setAttribute('id', orb['id'] + 'Popup');
  div.innerHTML =
    orb['popupHtml'] + `<button id="${orb['id']}ClosePopup">Close</button>`;
  document.getElementById('popups').appendChild(div);
  popupToggle(orb);
};

export const createOrb = (orb) => {
  const div = document.createElement('DIV');
  const buttonId = orb['id'] + 'PopupTrigger';
  div.setAttribute('class', 'orbContainer');
  div.setAttribute('id', orb['id']);
  div.innerHTML = `
    <div class="hoverBlurb">
      ${orb['hoverBlurb']}
      <div><button class="learnMore" id="${buttonId}">Learn More</button></div>
    </div>
    <div class="imgContainer"><img src="${orb['img']}" /></div>
  `;
  document.getElementById('mainContainer').appendChild(div);
  createPopup(orb);
  initialOrbPosition(orb);
  animateOrb(div, orb);
  stopOnHover(div, orb);
};
