import Layer from "@abstract/Layer";

export interface GameFeatures {
  dt: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  name: string;
  on: () => void;
  off: () => void;
}
export class Game {
  isOff: boolean = false;
  animLoop: number;
  draw = () => {};
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  l: Layer; // main layer
  //animation vars
  accumulator: number = 0;
  delta: number = 1e3 / 60;
  step: number = 1 / 60;
  last: number = 0;
  now: number;
  dt: number = 0;

  constructor(canvasId: string, l: Layer) {
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.l = l;
  }

  setup() {
    this.l.start(this.getFeatures());

    this.draw = () => {
      this.animLoop = window.requestAnimationFrame(this.draw);
      this.now = performance.now();
      this.dt = this.now - this.last;
      this.last = this.now;
      if (this.dt > 1e3) {
        return;
      }
      this.accumulator += this.dt;
      while (this.accumulator >= this.delta) {
        this.l.update(this.getFeatures());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.l.render(this.getFeatures());
        this.accumulator -= this.delta;
      }
    };
  }

  getFeatures(): GameFeatures {
    return {
      dt: this.step,
      canvas: this.canvas,
      ctx: this.ctx,
      name: "RUN LITTLE PACKET!!",
      on: () => this.on(),
      off: () => this.off(),
    };
  }

  on(): void {
    if (this.isOff) {
      this.isOff = false;
    }
    this.draw();
  }

  off() {
    this.isOff = true;
    window.cancelAnimationFrame(this.animLoop);
  }
}
