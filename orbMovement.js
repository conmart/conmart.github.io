let orbSidePx = 127,
  xMin = 0,
  yMin = 0,
  speed = 0,
  timeout = null;

export let xMax = window.innerWidth - orbSidePx;
export let yMax = window.innerHeight - orbSidePx;

const setLimits = (orb) => {
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
};

const setDirection = (orb) => {
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
};

const getVendor = () => {
  const ua = navigator.userAgent.toLowerCase(),
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
};

const setStyle = (orb, properties) => {
  const element = document.getElementById(orb['id']);
  const prefix = getVendor();
  let property,
    css = '';
  for (property in properties) {
    css += property + ': ' + properties[property] + ';';
    css += prefix + property + ': ' + properties[property] + ';';
  }
  element.style.cssText += css;
};

const slider = document.getElementById('orbSpeed');
slider.oninput = () => {
  speed = parseInt(slider.value) / 2;
};

const updateWindowMinMax = () => {
  xMax = window.innerWidth - orbSidePx;
  yMax = window.innerHeight - orbSidePx;
};

window.addEventListener(
  'resize',
  () => {
    clearTimeout(timeout);
    timeout = setTimeout(updateWindowMinMax, 100);
  },
  false
);

export const move = (orb) => {
  const transform = `translate3d(${orb['translateX']}px, ${orb['translateY']}px, 0)`;
  setDirection(orb);
  setStyle(orb, { transform });
};
