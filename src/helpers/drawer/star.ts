import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { mouse } from ".";

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
  rotation: number
  starBg: string;
  starStroke: string;
  starBgs: string[];
  starStrokes: string[];

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
    this.size = 10;
    this.innerSize = this.size / 2;
    this.maxSize = this.size;
    this.minSize = 1;
    this.canvas = canvas;
    this.spikes = 12;
    this.spikeStep = Math.PI / this.spikes;
    this.rotation = Math.PI / 2 * 3
    this.starBgs = ['#a6171c', '#30cfd0', '#330867', '#eea2a2', '#bbc1bf', '#7ac5d8'];
    this.starBg = this.starBgs[_.random(0, this.starBgs.length - 1)];
    this.starStrokes = ['#fbc2eb', '#fee140', '#30cfd0'];
    this.starStroke = this.starStrokes[_.random(0, this.starStrokes.length - 1)]
  }

  changeColor(ctx: CanvasRenderingContext2D) {
    const colors = ['red', 'white', 'tomato', 'teal'];
    ctx.fillStyle = colors[_.random(0, colors.length - 1)];
    ctx.fill();
  }

  reDraw(ctx: CanvasRenderingContext2D) {
    // this.clear(ctx);
    ctx.save();

    this.changeSize();

    let cX = 0, cY = 0;

    ctx.beginPath();

    for(let i = 0; i < this.spikes; i++) {
      cX = this.x + Math.cos(this.rotation) * this.size;
      cY = this.y + Math.sin(this.rotation) * this.size;

      ctx.lineTo(cX, cY);

      this.rotation += this.spikeStep;

      cX = this.x + Math.cos(this.rotation) * this.innerSize;
      cY = this.y + Math.sin(this.rotation) * this.innerSize;

      ctx.lineTo(cX, cY);
      this.rotation += this.spikeStep;
    }

    ctx.lineTo(cX, cY - this.size);


    // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.starStroke;
    ctx.fillStyle =this.starBg;
    ctx.lineWidth = 0.25;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  private changeSize() {
    if(mouse.x! - this.x < 50 && mouse.x! - this.x > -50
      && mouse.y! - this.y < 50 && mouse.y! - this.y > -50
     )
     {
     if(this.size < this.maxSize) {
       this.size += 1;
       this.innerSize = this.size / 2;
     }
   } else if (this.size > this.minSize) {
     this.size -= 1;
     this.innerSize = this.size / 2;
   }
  }


  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
  }
}

function loopStars(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<Star>) {
  // requestAnimationFrame(() => loopStars(ctxSettings, objectSettings));
  // ctxSettings.ctx.clearRect(0, 0, ctxSettings.canvas.offsetWidth, ctxSettings.canvas.offsetHeight);
  // reDrawObjectsParcticles(objectSettings.objectParticles, ctxSettings);

}

export {
  Star,
  loopStars
}
