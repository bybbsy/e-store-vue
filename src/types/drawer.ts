interface CanvasBase {
  x: number,
  y: number,

  reDraw: (ctx: CanvasRenderingContext2D) => void,
}

interface CanvasColorChangeable extends CanvasBase {
  changeColor: (ctx: CanvasRenderingContext2D) => void
}

interface CanvasSettings {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
}

type Constr<T> = new (canvas: HTMLCanvasElement) => T

type ObjectSettings<T> = {
  objectAmount: number,
  objectParticles: Array<T>,
  // Allows to create class instance according to type
  objectClass: Constr<T>,
  loopObjects: (canvasSettings: CanvasSettings, objectSettings: ObjectSettings<T>) => void,
}

export {
  CanvasBase,
  CanvasColorChangeable,
  CanvasSettings,
  ObjectSettings
}
