import { orbs } from './orbs.js';
import { createOrb } from './generateOrbs.js';

const directions = ['se', 'sw', 'ne', 'nw'];

window.addEventListener('load', () => {
  let orbIndex = 0;
  orbs.forEach((orb) => {
    const orbId = `orb${orbIndex}`;
    orb['id'] = orbId;
    orb['direction'] = directions[Math.floor(Math.random() * 4)];
    createOrb(orb);
    orbIndex++;
  });

  const popupOverlay = document.getElementById('popups');
  popupOverlay.addEventListener('click', (e) => {
    if (e.target.id == 'popups') {
      const activePopups = Array.from(
        document.getElementsByClassName('showPopup')
      );
      activePopups.forEach((activePopup) => {
        activePopup.classList.remove('showPopup');
      });
    }
  });

  document.getElementById('reverse').addEventListener('click', () => {
    console.log('clikkkk');
    orbs.forEach((orb) => {
      switch (orb['direction']) {
        case 'ne':
          orb['direction'] = 'sw';
          break;
        case 'sw':
          orb['direction'] = 'ne';
          break;
        case 'nw':
          orb['direction'] = 'se';
          break;
        case 'se':
          orb['direction'] = 'nw';
          break;
      }
    });
  });
});
