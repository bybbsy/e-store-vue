import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { reDrawObjectsParcticles, mouse } from ".";

class Star implements CanvasBase {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  minSize: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
    this.size = 1;
    this.maxSize = 5
    this.minSize = 1;
  }

  changeColor(ctx: CanvasRenderingContext2D) {
    const colors = ['red', 'white', 'tomato', 'teal'];
    ctx.fillStyle = colors[_.random(0, colors.length - 1)];
    ctx.fill();
  }

  reDraw(ctx: CanvasRenderingContext2D) {
    if(mouse.x! - this.x < 50 && mouse.x! - this.x > -50
       && mouse.y! - this.y < 50 && mouse.y! - this.y > -50
      ) {
      if(this.size < this.maxSize) {
        this.size += 1;
      }
    } else if (this.size > this.minSize) {
      this.size -= 1;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.strokeStyle = "blue";
    ctx.fillStyle = 'white';
    ctx.stroke();
    ctx.fill();
    // ctx.closePath();
  }


  // starClick() {}
}

function loopStars(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<Star>) {
  requestAnimationFrame(() => loopStars(ctxSettings, objectSettings));

  ctxSettings.ctx.clearRect(0, 0, ctxSettings.canvas.offsetWidth, ctxSettings.canvas.offsetHeight);
  reDrawObjectsParcticles(objectSettings.objectParticles, ctxSettings);
}

export {
  Star,
  loopStars
}
