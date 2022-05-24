import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { mouse } from ".";

interface PlanetSkin {
  color: string,
  start: number
}

type PlanetGradients = PlanetSkin[];

const planetSkins = [
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

class Planet implements CanvasBase {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
  size: number;
  minSize: number;
  maxSize: number;
  rotate: number;
  rotateStep: number;
  rX: number;
  rY: number;
  angle: number;
  angleStep: number;
  gradient: PlanetGradients;

  constructor(canvas: HTMLCanvasElement) {
    this.x = _.random(0, canvas.offsetWidth)
    this.y = _.random(0, canvas.offsetHeight);
    this.centerX = Math.random() * canvas.offsetWidth;
    this.centerY = Math.random() * canvas.offsetHeight;
    this.maxSize = 100;
    this.minSize = 50;
    this.size = _.random(this.minSize, this.maxSize);
    this.rotate = 0;
    this.rotateStep = 0;
    this.rX = 0;
    this.rY = 0;
    this.angle = 0;
    this.angleStep = _.random(0.001, 0.005);


    const randColor = _.random(0, 2);
    this.gradient = planetSkins[randColor];
  }

  reDraw(ctx: CanvasRenderingContext2D) {


    this.movePlanet();

    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

    const gradient = ctx.createLinearGradient(this.x , this.y + this.rY, this.x + this.rX + this.size, this.y + this.rY + this.size );

    this.setGradient(gradient, this.gradient);

    ctx.fillStyle = gradient;

    ctx.stroke();

    ctx.fill();

    ctx.closePath();

  }

  private movePlanet() {
    this.x = this.centerX + Math.cos(this.angle) * this.size;
    this.y = this.centerY + Math.sin(this.angle) * this.size;

    this.angle += this.angleStep;
  }

  private setGradient(gradient: CanvasGradient, colors: PlanetSkin[]) {
    colors.forEach(color => gradient.addColorStop(color.start, color.color));
  }
}

export {
  Planet
}
