import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { mouse } from ".";

const starBackgrounds = ['#a6171c', '#30cfd0', '#330867', '#eea2a2', '#bbc1bf', '#7ac5d8'];
const starStrokeColors = ['#fbc2eb', '#fee140', '#30cfd0'];


class Star implements CanvasBase {
  x: number;
  y: number;
  size: number;
  innerSize: number;
  maxSize: number;
  minSize: number;
  canvas: HTMLCanvasElement;
  spikes: number;
  spikeStep: number;
  angle: number
  starBackground: string;
  starStrokeColor: string;

  constructor(canvas: HTMLCanvasElement) {
    this.x = _.random(0, canvas.offsetWidth);
    this.y = _.random(0, canvas.offsetHeight);
    this.size = 10;
    this.innerSize = this.size / 2;
    this.maxSize = this.size;
    this.minSize = 1;
    this.canvas = canvas;
    this.spikes = 4;
    this.spikeStep = Math.PI / this.spikes;
    this.angle = 0;
    this.starBackground = starBackgrounds[_.random(0, starBackgrounds.length - 1)];
    this.starStrokeColor = starStrokeColors[_.random(0, starStrokeColors.length - 1)]
  }

  reDraw(ctx: CanvasRenderingContext2D) {
    this.changeSize();

    let cX = 0, cY = 0;

    ctx.beginPath();


    for(let i = 0; i < this.spikes; i++) {
      cX = this.x + Math.cos(this.angle) * this.size;
      cY = this.y + Math.sin(this.angle) * this.size;

      ctx.lineTo(cX, cY);

      console.log('1: ', cX, cY);
      this.angle += this.spikeStep;

      cX = this.x + Math.cos(this.angle) * this.innerSize;
      cY = this.y + Math.sin(this.angle) * this.innerSize;

      console.log('1: ', cX, cY);

      ctx.lineTo(cX, cY);

      this.angle += this.spikeStep;

    }
    ctx.lineTo(cX, cY)

    ctx.strokeStyle = this.starStrokeColor;
    ctx.fillStyle = this.starBackground;

    ctx.lineWidth = 0.25;
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

  }

  private changeSize() {
   if(mouse.x! - this.x < 50 && mouse.x! - this.x > -50
    && mouse.y! - this.y < 50 && mouse.y! - this.y > -50
   ) {
    if(this.size < this.maxSize) {
      this.size += 1;
      this.innerSize = this.size / 2;
    }
   }
   else if (this.size > this.minSize) {
    this.size -= 1;
    this.innerSize = this.size / 2;
  }

  }
}

export {
  Star
}
