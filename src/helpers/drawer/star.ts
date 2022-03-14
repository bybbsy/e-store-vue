import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { reDrawObjectsParcticles } from ".";

class Star implements CanvasBase {
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

function loopStars(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<Star>) {
  reDrawObjectsParcticles(objectSettings.objectParticles, ctxSettings);
  // setTimeout(() => loopStars(ctxSettings, objectSettings), 5000);
}

export {
  Star,
  loopStars
}
