import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface planetSkin {
  color: string,
  start: number
}

type PlanetGradients = planetSkin[];

class Planet implements CanvasBase {
  x: number;
  y: number;
  size: number;
  minSize: number;
  maxSize: number;
  rotate: number;
  rotateStep: number;
  rX: number;
  rY: number;
  phi: number;
  phiStep: number;
  skins: Array<PlanetGradients>;
  gradient: PlanetGradients;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
    this.maxSize = 100;
    this.minSize = 50;
    this.size = randomInRange(this.minSize, this.maxSize);
    this.rotate = 0;
    this.rotateStep = 0;
    this.rX = 0;
    this.rY = 0;
    this.phi = 0;
    this.phiStep = randomInRange(0.005, 0.01);
    this.skins = [
      [
        {
          color: '#a6171c',
          start: 0
        },
        {
          color: 'yellow',
          start: 0.5
        }
      ],
      [
        {
          color: '#30cfd0',
          start: 0
        },
        {
          color: '#330867',
          start: 1
        }
      ],
      [
        {
          color: '#eea2a2',
          start: 0
        },
        {
          color: '#bbc1bf',
          start: 0.19
        },
        {
          color: '#57c6e1',
          start: 0.42
        },
        {
          color: '#57c6e1',
          start: 0.79
        },
        {
          color: '#7ac5d8',
          start: 1
        },
      ]
    ]

    const randColor = _.random(0, 2);
    this.gradient = this.skins[randColor];
  }

  reDraw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    ctx.translate(this.rX - this.size* 0.5, this.rY + this.size*0.5);

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

    const gradient = ctx.createLinearGradient(this.x , this.y + this.rY, this.x + this.rX + this.size, this.y + this.rY + this.size );

    this.setGradient(gradient, this.gradient);

    ctx.fillStyle = gradient;
    ctx.stroke();
    ctx.fill();

    ctx.closePath();

    this.movePlanet();

  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
  }

  private movePlanet() {
    this.rX = this.size / 2 * Math.cos(this.phi) + 0.5 * 0.5;
    this.rY = this.size / 2 * Math.sin(this.phi) + 0.5 * 0.5;


    // this.rotate += this.rotateStep;
    this.phi += this.phiStep;
  }

  private setGradient(gradient: CanvasGradient, colors: planetSkin[]) {
    colors.forEach(color => gradient.addColorStop(color.start, color.color));
  }
}

function loopPlanets(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<Planet>) {
  // requestAnimationFrame(() => loopPlanets(ctxSettings, objectSettings))
  // ctxSettings.ctx.clearRect(0, 0, ctxSettings.canvas.offsetWidth, ctxSettings.canvas.offsetHeight);

  // reDrawObjectsParcticles(objectSettings.objectParticles, ctxSettings);
}

export {
  Planet,
  loopPlanets
}

