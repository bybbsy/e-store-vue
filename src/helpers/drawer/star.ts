import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { reDrawObjectsParcticles, mouse } from ".";

class Star implements CanvasBase {
  x: number;
  y: number;
  size: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
    this.size = 1;
  }

  changeColor(ctx: CanvasRenderingContext2D) {
    const colors = ['red', 'white', 'tomato', 'teal'];
    ctx.fillStyle = colors[_.random(0, colors.length - 1)];
    ctx.fill();
  }

  reDraw(ctx: CanvasRenderingContext2D) {

    // const size = _.random(10, 19)
    // let rad = this.size;

    // if((mouse.x! - this.x) < 50) {
    //   rad += 1;
    // }

    console.log(mouse.x)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }


  // starClick() {}
}

function loopStars(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<Star>) {
  reDrawObjectsParcticles(objectSettings.objectParticles, ctxSettings);
  setTimeout(() => loopStars(ctxSettings, objectSettings), 100);
}

export {
  Star,
  loopStars
}
