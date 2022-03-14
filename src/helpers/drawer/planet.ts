import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { mouse, reDrawObjectsParcticles } from ".";


class Planet implements CanvasBase {
  x: number;
  y: number;
  size: number;
  minSize: number;
  maxSize: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
    this.size = 70;
    this.maxSize = 100;
    this.minSize = 50;
  }

  reDraw(ctx: CanvasRenderingContext2D) {
    const size = _.random(30, 100)

    if(mouse.x! - this.x < 50 && mouse.x! - this.x > -50
      && mouse.y! - this.y < 50 && mouse.y! - this.y > -50
     ) {
     if(this.size < this.maxSize) {
       this.size += 1;
     }
   } else if (this.size > this.minSize) {
     this.size -= 1;
   }

    const planetImage = new Image();
    const imageLink = 'https://freesvg.org/img/Planet_Mars.png';

    planetImage.src = imageLink;

    planetImage.addEventListener('load', () => {
      ctx.drawImage(planetImage, this.x, this.y, this.size, this.size);
    })
  }

  // planetClick() {

  //   console.log("Planet click")
  // }
}

function loopPlanets(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<Planet>) {
  requestAnimationFrame(() => loopPlanets(ctxSettings, objectSettings))
  // ctxSettings.ctx.clearRect(0, 0, ctxSettings.canvas.offsetWidth, ctxSettings.canvas.offsetHeight);
  reDrawObjectsParcticles(objectSettings.objectParticles, ctxSettings);
}

export {
  Planet,
  loopPlanets
}

