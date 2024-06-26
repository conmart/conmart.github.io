let boxWidth = 118,
  boxHeight = 118,
  boxTop = 8,
  boxLeft = 8,
  xMin = -boxLeft,
  yMin = -boxTop,
  xMax = window.innerWidth - boxLeft - boxWidth,
  yMax = window.innerHeight - boxTop - boxHeight,
  directions = ['se', 'sw', 'ne', 'nw'],
  speed = 0,
  timeout = null;

const orbs = [
  {
    img: 'assets/nhII.png',
    hoverBlurb: 'Software Engineer',
    popupHtml: '<div>Test1</div>'
  },
  {
    img: 'assets/rg.jpeg',
    hoverBlurb: 'Software Engineer',
    popupHtml: '<div>Test2</div>'
  },
  {
    img: 'assets/NRDSII.png',
    hoverBlurb: 'Sales and Partnerships',
    popupHtml: '<div>Test3</div>'
  },
  {
    img: 'assets/Headshot1-small.jpg',
    hoverBlurb: 'About me',
    popupHtml: '<div>Test4</div>'
  }
];

const createOrb = (orb) => {
  const div = document.createElement('DIV');
  const buttonId = orb['id'] + 'PopupTrigger';
  div.setAttribute('class', 'orbContainer');
  div.setAttribute('id', orb['id']);
  div.innerHTML = `
    <div class="hoverBlurb">
      <div>${orb['hoverBlurb']}</div>
      <button id="${buttonId}">Learn More</button>
    </div>
    <div class="imgContainer"><img src="${orb['img']}" /></div>
  `;
  document.getElementById('mainContainer').appendChild(div);
  createPopup(orb);
  initialOrbPosition(orb);
  animateOrb(div, orb);
  stopOnHover(div, orb);
};

const createPopup = (orb) => {
  const div = document.createElement('DIV');
  div.setAttribute('class', 'popup');
  div.setAttribute('id', orb['id'] + 'Popup');
  div.innerHTML =
    orb['popupHtml'] + `<button id="${orb['id']}ClosePopup">Close</button>`;
  document.getElementById('popups').appendChild(div);
  popupToggle(orb);
}

const popupToggle = (orb) => {
  const popup = document.getElementById(orb['id'] + 'Popup');
  const popupContainer = document.getElementById('popups');
  document.getElementById(orb['id'] + 'PopupTrigger').addEventListener("click", () => {
    popup.classList.add('showPopup');
    popupContainer.classList.add('showPopup')
  });
  document
    .getElementById(orb['id'] + 'ClosePopup')
    .addEventListener('click', () => {
      popup.classList.remove('showPopup');
      popupContainer.classList.remove('showPopup');
    });
}

const stopOnHover = (div, orb) => {
  let hoverClass = ''
  div.addEventListener('mouseenter', () => {
    hoverClass =
      orb['translateX'] < xMax / 2 ? 'hoverBlurbRight' : 'hoverBlurbLeft';
    window.cancelAnimationFrame(orb['request']);
    div.firstElementChild.classList.add(hoverClass);
  });
  div.addEventListener('mouseleave', () => {
    animateOrb(div, orb);
    div.firstElementChild.classList.remove(hoverClass);
  });
};

const animateOrb = (div, orb) => {
  request = requestAnimationFrame(() => animateOrb(div, orb));
  orb['request'] = request;
  move(orb);
};

const initialOrbPosition = (orb) => {
  const initialX = Math.floor(Math.random() * xMax + 1);
  const initialY = Math.floor(Math.random() * yMax + 1);
  orb['translateX'] = initialX;
  orb['translateY'] = initialY;
};

let orbIndex = 0;
orbs.forEach((orb) => {
  const orbId = `orb${orbIndex}`;
  orb['id'] = orbId;
  orb['direction'] = directions[Math.floor(Math.random() * 4)];
  createOrb(orb);
  orbIndex++;
});

window.addEventListener(
  'resize',
  function () {
    clearTimeout(timeout);
    timeout = setTimeout(update, 100);
  },
  false
);

function update() {
  xMin = -boxLeft;
  yMin = -boxTop;
  xMax = window.innerWidth - boxLeft - boxWidth;
  yMax = window.innerHeight - boxTop - boxHeight;
}

function move(orb) {
  setDirection(orb);
  setStyle(orb, {
    transform:
      'translate3d(' +
      orb['translateX'] +
      'px, ' +
      orb['translateY'] +
      'px, 0)',
  });
}

function setDirection(orb) {
  switch (orb['direction']) {
    case 'ne':
      orb['translateX'] += speed;
      orb['translateY'] -= speed;
      break;
    case 'nw':
      orb['translateX'] -= speed;
      orb['translateY'] -= speed;
      break;
    case 'se':
      orb['translateX'] += speed;
      orb['translateY'] += speed;
      break;
    case 'sw':
      orb['translateX'] -= speed;
      orb['translateY'] += speed;
      break;
  }
  setLimits(orb);
}

function setLimits(orb) {
  let direction = orb['direction'];
  if (orb['translateY'] <= yMin) {
    if (direction == 'nw') {
      direction = 'sw';
    } else if (direction == 'ne') {
      direction = 'se';
    }
  }
  if (orb['translateY'] >= yMax) {
    if (direction == 'se') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'nw';
    }
  }
  if (orb['translateX'] <= xMin) {
    if (direction == 'nw') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'se';
    }
  }
  if (orb['translateX'] >= xMax) {
    if (direction == 'ne') {
      direction = 'nw';
    } else if (direction == 'se') {
      direction = 'sw';
    }
  }
  orb['direction'] = direction;
}

function getVendor() {
  var ua = navigator.userAgent.toLowerCase(),
    match =
      /opera/.exec(ua) ||
      /msie/.exec(ua) ||
      /firefox/.exec(ua) ||
      /(chrome|safari)/.exec(ua) ||
      /trident/.exec(ua),
    vendors = {
      opera: '-o-',
      chrome: '-webkit-',
      safari: '-webkit-',
      firefox: '-moz-',
      trident: '-ms-',
      msie: '-ms-',
    };

  return vendors[match[0]];
}

function setStyle(orb, properties) {
  const element = document.getElementById(orb['id']);
  var prefix = getVendor(),
    property,
    css = '';
  for (property in properties) {
    css += property + ': ' + properties[property] + ';';
    css += prefix + property + ': ' + properties[property] + ';';
  }
  element.style.cssText += css;
}

const slider = document.getElementById('orbSpeed');
slider.oninput = () => {
  speed = parseInt(slider.value) / 2;
};
