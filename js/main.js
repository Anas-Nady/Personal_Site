let body = document.querySelector("body");
let btnHeader = document.querySelector(".btn-header");
let header = document.querySelector("header");
let ofline = document.querySelector(".ofline");
let btnScroll = document.querySelector(".scroll-top i");

// Hide header In Screen Phone and add Button is Show header
btnHeader.addEventListener("click", (e) => {
  header.classList.toggle("toggle-header");
  btnHeader.classList.toggle("fa-spin");

  // stop Propagation To Click btnHeader
  e.stopPropagation();
});

// Stop Propagation To Click Header
header.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Click Anywhere Outside header toggle
document.addEventListener("click", (e) => {
  if (e.target !== btnHeader || e.target !== header) {
    header.classList.remove("toggle-header");
  }
});

// Start Check internet
window.onload = function () {
  if (window.navigator.onLine) {
    onlinePage();
  } else {
    oflinePage();
  }
};

window.addEventListener("online", function () {
  onlinePage();
});

window.addEventListener("offline", function () {
  oflinePage();
});

function onlinePage() {
  ofline.style.opacity = "0";
}

function oflinePage() {
  ofline.style.opacity = "1";
}

// end Check internet

// Start Scroll top
window.onscroll = function () {
  if (window.pageYOffset >= 800) {
    btnScroll.style.opacity = 1;
  } else {
    btnScroll.style.opacity = 0;
  }
};

btnScroll.onclick = function () {
  window.scrollTo({
    top: 0,
    left: 0,
  });
};
// end Scroll top
// Start canva page home

let resizeReset = function () {
  w = canvasBody.width = window.innerWidth;
  h = canvasBody.height = window.innerHeight;
};
const opts = {
  particleColor: "rgb(200,200,200)",
  lineColor: "rgb(200,200,200)",
  particleAmount: 30,
  defaultSpeed: 1,
  variantSpeed: 1,
  defaultRadius: 2,
  variantRadius: 2,
  linkRadius: 100, // change value in media phone
};

window.addEventListener("resize", function () {
  deBouncer();
});

let deBouncer = function () {
  clearTimeout(tid);
  tid = setTimeout(function () {
    resizeReset();
  }, delay);
};

let checkDistance = function (x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function (point1, hubs) {
  for (let i = 0; i < hubs.length; i++) {
    let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
    let opacity = 1 - distance / opts.linkRadius;
    if (opacity > 0) {
      drawArea.lineWidth = 0.5;
      drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      drawArea.beginPath();
      drawArea.moveTo(point1.x, point1.y);
      drawArea.lineTo(hubs[i].x, hubs[i].y);
      drawArea.closePath();
      drawArea.stroke();
    }
  }
};

Particle = function (xPos, yPos) {
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
  this.directionAngle = Math.floor(Math.random() * 360);
  this.color = opts.particleColor;
  this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
  this.vector = {
    x: Math.cos(this.directionAngle) * this.speed,
    y: Math.sin(this.directionAngle) * this.speed,
  };
  this.update = function () {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  };
  this.border = function () {
    if (this.x >= w || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= h || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  };
  this.draw = function () {
    drawArea.beginPath();
    drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    drawArea.closePath();
    drawArea.fillStyle = this.color;
    drawArea.fill();
  };
};

function setup() {
  particles = [];
  resizeReset();
  for (let i = 0; i < opts.particleAmount; i++) {
    particles.push(new Particle());
  }
  window.requestAnimationFrame(loop);
}

function loop() {
  window.requestAnimationFrame(loop);
  drawArea.clearRect(0, 0, w, h);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  for (let i = 0; i < particles.length; i++) {
    linkPoints(particles[i], particles);
  }
}

const canvasBody = document.getElementById("canvas"),
  drawArea = canvasBody.getContext("2d");
let delay = 200,
  tid,
  rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();

// End canva page home

let submit = document.querySelector(".send");

submit.onclick = function () {
  window.alert("???????????? ?????????? ???????? ???? ???????????? ");
};
