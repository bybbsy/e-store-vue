import { CanvasBase, ObjectSettings, CanvasSettings } from "@/types/drawer";
import { loopPlanets, Planet } from "./planet";
import { loopStars, Star } from "./star";

interface mouseCoords {
  x: undefined | number,
  y: undefined | number
}

const mouse: mouseCoords = {
  x: undefined,
  y: undefined
}

function reDrawObjectsParcticles<T extends CanvasBase>(objectParticles: Array<T>, canvasSettings: CanvasSettings) {
  for(const i in objectParticles) {
    objectParticles[i].reDraw(canvasSettings.ctx);
  }
}

function drawObjects<T>(ctxSettings: CanvasSettings, objectSettings: ObjectSettings<T>) {
  for(let i = 0; i < objectSettings.objectAmount; i++) {

    const objInstance = new objectSettings.objectClass(ctxSettings.canvas);

    objectSettings.objectParticles.push(objInstance)
  }

  objectSettings.loopObjects(ctxSettings, objectSettings);
}

function setSize(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}


function init(canvas: HTMLCanvasElement) {
  const starsAmount = 500;
  const starParticles: Array<Star> = [];

  const planetsAmount = 5;
  const planetsParticles: Array<Planet> = [];

  const ctx = canvas.getContext('2d')!;

  const ctxSettings: CanvasSettings = { canvas, ctx}


  const starsSettings: ObjectSettings<Star> = {
    objectAmount: starsAmount,
    objectParticles: starParticles,
    objectClass: Star,
    loopObjects: () => loopStars(ctxSettings, starsSettings)
  }

  const planetsSettings: ObjectSettings<Planet> = {
    objectAmount: planetsAmount,
    objectParticles: planetsParticles,
    objectClass: Planet,
    loopObjects: () => loopPlanets(ctxSettings, planetsSettings)
  }

  if(ctx) {
    ctx.globalCompositeOperation ='source-over';
    setSize(ctx);

    drawObjects(ctxSettings, starsSettings);
    drawObjects(ctxSettings, planetsSettings);

    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    })
  }
}

export { init, reDrawObjectsParcticles, mouse }
