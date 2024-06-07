const icons = [
  {
    img: 'assets/nh.webp',
  },
  {
    img: 'assets/rg.jpeg',
  },
];

console.log('hit me')
let iconCount = 1;
icons.forEach((icon) => {
  const iconId = `icon${iconCount}`;
  const div = document.createElement('DIV');
  div.setAttribute('class', `iconContainer`);
  div.setAttribute('id', iconId);
  document.getElementById('mainContainer').appendChild(div);
  const html = 
    `<div class="iconContainer" id="icon${iconCount}">
      <img src="${icon.img}" />
    </div>`;
  iconCount ++;
  document.getElementById(iconId).innerHTML = html;
});

let ww = window.innerWidth,
  wh = window.innerHeight,
  translateX = Math.floor(Math.random() * ww + 1),
  translateY = Math.floor(Math.random() * wh + 1),
  // boxWidth = box.offsetWidth,
  // boxHeight = box.offsetHeight,
  // boxTop = box.offsetTop,
  // boxLeft = box.offsetLeft,
  // xMin = -boxLeft,
  // yMin = -boxTop,
  // xMax = window.innerWidth - boxLeft - boxWidth,
  // yMax = window.innerHeight - boxTop - boxHeight,
  // request = null,
  directions = ['se', 'sw', 'ne', 'nw'],
  speed = 2,
  timeout = null;

// init();

// window.addEventListener(
//   'resize',
//   function () {
//     clearTimeout(timeout);
//     timeout = setTimeout(update, 100);
//   },
//   false
// );

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

// // reset constraints
// function update() {
//   xMin = -boxLeft;
//   yMin = -boxTop;
//   xMax = window.innerWidth - boxLeft - boxWidth;
//   yMax = window.innerHeight - boxTop - boxHeight;
// }

// function move() {
//   setDirection();
//   setStyle(box, {
//     transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0)',
//   });
// }

// function setDirection(direction) {
//   switch (direction) {
//     case 'ne':
//       translateX += speed;
//       translateY -= speed;
//       break;
//     case 'nw':
//       translateX -= speed;
//       translateY -= speed;
//       break;
//     case 'se':
//       translateX += speed;
//       translateY += speed;
//       break;
//     case 'sw':
//       translateX -= speed;
//       translateY += speed;
//       break;
//   }
//   setLimits();
// }

// function setLimits() {
//   if (translateY <= yMin) {
//     if (direction == 'nw') {
//       direction = 'sw';
//     } else if (direction == 'ne') {
//       direction = 'se';
//     }
//   }
//   if (translateY >= yMax) {
//     if (direction == 'se') {
//       direction = 'ne';
//     } else if (direction == 'sw') {
//       direction = 'nw';
//     }
//   }
//   if (translateX <= xMin) {
//     if (direction == 'nw') {
//       direction = 'ne';
//     } else if (direction == 'sw') {
//       direction = 'se';
//     }
//   }
//   if (translateX >= xMax) {
//     if (direction == 'ne') {
//       direction = 'nw';
//     } else if (direction == 'se') {
//       direction = 'sw';
//     }
//   }
// }

// function getVendor() {
//   var ua = navigator.userAgent.toLowerCase(),
//     match =
//       /opera/.exec(ua) ||
//       /msie/.exec(ua) ||
//       /firefox/.exec(ua) ||
//       /(chrome|safari)/.exec(ua) ||
//       /trident/.exec(ua),
//     vendors = {
//       opera: '-o-',
//       chrome: '-webkit-',
//       safari: '-webkit-',
//       firefox: '-moz-',
//       trident: '-ms-',
//       msie: '-ms-',
//     };

//   return vendors[match[0]];
// }

// function setStyle(element, properties) {
//   var prefix = getVendor(),
//     property,
//     css = '';
//   for (property in properties) {
//     css += property + ': ' + properties[property] + ';';
//     css += prefix + property + ': ' + properties[property] + ';';
//   }
//   element.style.cssText += css;
// }
