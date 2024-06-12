let ww = window.innerWidth,
  wh = window.innerHeight,
  boxWidth = 118,
  boxHeight = 118,
  boxTop = 8,
  boxLeft = 8,
  xMin = -boxLeft,
  yMin = -boxTop,
  xMax = window.innerWidth - boxLeft - boxWidth,
  yMax = window.innerHeight - boxTop - boxHeight,
  directions = ['se', 'sw', 'ne', 'nw'],
  speed = 2,
  timeout = null;

const icons = [
  {
    img: 'assets/nh.webp',
  },
  {
    img: 'assets/rg.jpeg',
  },
];

const createIcon = (icon) => {
  const div = document.createElement('DIV');
  div.setAttribute('class', `iconContainer`);
  div.setAttribute('id', icon['id']);
  div.innerHTML = `<img src="${icon['img']}" />`;
  document.getElementById('mainContainer').appendChild(div);
  initialIconPosition(icon);
  animateIcon(div, icon);
};

const animateIcon = (div, icon) => {
  request = requestAnimationFrame(() => animateIcon(div, icon));
  icon['request'] = request;
  move(icon)
}

const initialIconPosition = (icon) => {
  const initialX = Math.floor(Math.random() * ww + 1);
  const initialY = Math.floor(Math.random() * wh + 1);
  icon['translateX'] = initialX;
  icon['translateY'] = initialY;
};

let iconIndex = 0;
icons.forEach((icon) => {
  const iconId = `icon${iconIndex}`;
  icon['id'] = iconId;
  icon['direction'] = directions[Math.floor(Math.random() * 4)];
  createIcon(icon);
  iconIndex++;
});

console.log(icons);

// let ww = window.innerWidth,
//   wh = window.innerHeight,
//   translateX = Math.floor(Math.random() * ww + 1),
//   translateY = Math.floor(Math.random() * wh + 1),
//   // boxWidth = box.offsetWidth,
//   // boxHeight = box.offsetHeight,
//   // boxTop = box.offsetTop,
//   // boxLeft = box.offsetLeft,
//   // xMin = -boxLeft,
//   // yMin = -boxTop,
//   // xMax = window.innerWidth - boxLeft - boxWidth,
//   // yMax = window.innerHeight - boxTop - boxHeight,
//   // request = null,
//   directions = ['se', 'sw', 'ne', 'nw'],
//   speed = 2,
//   timeout = null;

// init();

window.addEventListener(
  'resize',
  function () {
    clearTimeout(timeout);
    timeout = setTimeout(update, 100);
  },
  false
);

// box.addEventListener('mouseenter', () => {
//   window.cancelAnimationFrame(request);
// });

// box.addEventListener('mouseleave', () => {
//   init();
// });

// function init() {
//   request = requestAnimationFrame(init);
//   move();
// }

// reset constraints
function update() {
  xMin = -boxLeft;
  yMin = -boxTop;
  xMax = window.innerWidth - boxLeft - boxWidth;
  yMax = window.innerHeight - boxTop - boxHeight;
}

function move(icon) {
  console.log('hit move', icon)
  setDirection(icon);
  setStyle(icon, {
    transform:
      'translate3d(' +
      icon['translateX'] +
      'px, ' +
      icon['translateY'] +
      'px, 0)',
  });
}

function setDirection(icon) {
  switch (icon['direction']) {
    case 'ne':
      icon['translateX'] += speed;
      icon['translateY'] -= speed;
      break;
    case 'nw':
      icon['translateX'] -= speed;
      icon['translateY'] -= speed;
      break;
    case 'se':
      icon['translateX'] += speed;
      icon['translateY'] += speed;
      break;
    case 'sw':
      icon['translateX'] -= speed;
      icon['translateY'] += speed;
      break;
  }
  setLimits(icon);
}

function setLimits(icon) {
  let direction = icon['direction'];
  if (icon['translateY'] <= yMin) {
    if (direction == 'nw') {
      direction = 'sw';
    } else if (direction == 'ne') {
      direction = 'se';
    }
  }
  if (icon['translateY'] >= yMax) {
    if (direction == 'se') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'nw';
    }
  }
  if (icon['translateX'] <= xMin) {
    if (direction == 'nw') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'se';
    }
  }
  if (icon['translateX'] >= xMax) {
    if (direction == 'ne') {
      direction = 'nw';
    } else if (direction == 'se') {
      direction = 'sw';
    }
  }
  icon['direction'] = direction;
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

function setStyle(icon, properties) {
  const element = document.getElementById(icon['id']);
  var prefix = getVendor(),
    property,
    css = '';
  for (property in properties) {
    css += property + ': ' + properties[property] + ';';
    css += prefix + property + ': ' + properties[property] + ';';
  }
  element.style.cssText += css;
}
