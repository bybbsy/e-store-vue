import _ from "lodash";


class Star {
  x: number;
  y: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
  }

  changeColor(ctx: CanvasRenderingContext2D) {
    const colors = ['red', 'white', 'tomato', 'teal'];
    ctx.fillStyle = colors[_.random(0, colors.length - 1)];
    ctx.fill();
  }

  reDraw(ctx: CanvasRenderingContext2D) {

    const size = _.random(0.2, 0.9)
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }
}

function reDrawStarParticles(starParticles: Array<Star>, ctx: CanvasRenderingContext2D) {
  for(const i in starParticles) {
    starParticles[i].changeColor(ctx);
    starParticles[i].reDraw(ctx);
  }
}

function loopStars(starParticles: Array<Star>, ctx: CanvasRenderingContext2D) {
  reDrawStarParticles(starParticles, ctx);
  // requestAnimationFrame(() => loopStars(starParticles, ctx))

  setTimeout(() => loopStars(starParticles, ctx), 100);
}

function drawStars(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, starsAmount: number, starParticles: Array<Star>) {
  for(let i = 0; i < 200; i++) {
    starParticles.push(new Star(canvas));
  }

  loopStars(starParticles, ctx);
}

class Planet {
  x: number;
  y: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
  }

  reDraw(ctx: CanvasRenderingContext2D) {
    const size = _.random(30, 100)

    const planetImage = new Image();
    const imageLink = 'https://freesvg.org/img/Planet_Mars.png';

    planetImage.src = imageLink;

    planetImage.addEventListener('load', () => {
      ctx.drawImage(planetImage, this.x, this.y, size, size);
    })
  }
}


function drawPlanets(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, planetsAmount: number, planetsParticles: Array<Planet>) {
  for(let i = 0; i < planetsAmount; i++) {
    planetsParticles.push(new Planet(canvas));
  }

  loopPlanets(planetsParticles, ctx);
}

function loopPlanets(planetsParticles: Array<Planet>, ctx: CanvasRenderingContext2D) {
  reDrawPlanetParticles(planetsParticles, ctx);
  // requestAnimationFrame(() => loopStars(starParticles, ctx))
}

function reDrawPlanetParticles(planetsParticles: Array<Planet>, ctx: CanvasRenderingContext2D) {
  for(const i in planetsParticles) {
    planetsParticles[i].reDraw(ctx);
  }
}


function drawText(ctx: CanvasRenderingContext2D) {
  console.log("A")
}
function setSize(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function init(canvas: HTMLCanvasElement) {
  const starsAmount = 200;
  const starParticles: Array<Star> = [];

  const planetsAmount = 5;
  const planetsParticles: Array<Planet> = [];

  const ctx = canvas.getContext('2d');

  if(ctx) {
    ctx.globalCompositeOperation ='source-over';
    setSize(ctx);

    drawStars(canvas, ctx, starsAmount, starParticles);
    drawPlanets(canvas, ctx, planetsAmount, planetsParticles);
  }
}

export { drawStars, init }
