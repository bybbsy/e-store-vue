import { CanvasBase, CanvasSettings, ObjectSettings } from "@/types/drawer";
import _ from "lodash";
import { reDrawObjectsParcticles } from ".";


class Planet implements CanvasBase {
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

function loopPlanets(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<Planet>) {
  reDrawObjectsParcticles(objectSettings.objectParticles, ctxSettings);
}

export {
  Planet,
  loopPlanets
}

