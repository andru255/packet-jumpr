import { LayerStack } from "./LayerStack";
import Layer from "@abstract/Layer";

export interface GameFeatures {
  dt: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  name: string;
}
export class Game {
  isStopped: boolean = false;
  animationLoop: number;
  drawFrame;
  layers: LayerStack;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  //animation vars
  accumulator: number = 0;
  delta: number = 1e3 / 60;
  step: number = 1 / 60;
  last: number = 0;
  now: number;
  dt: number = 0;

  constructor(canvasId) {
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.layers = new LayerStack();
  }

  init() {}

  getFeatures(): GameFeatures {
    return {
      dt: this.step,
      canvas: this.canvas,
      ctx: this.ctx,
      name: "RUN LITTLE PACKET!!",
    };
  }

  start(): void {
    this.isStopped = false;
    this.layers.startOnce(this.getFeatures()).then(() => {
      this.init();
    });

    this.drawFrame = () => {
      this.animationLoop = window.requestAnimationFrame(this.drawFrame);
      this.now = performance.now();
      this.dt = this.now - this.last;
      this.last = this.now;
      if (this.dt > 1e3) {
        return;
      }
      this.accumulator += this.dt;
      while (this.accumulator >= this.delta) {
        this.layers.runLayersWithMethod("update", this.getFeatures());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.layers.runLayersWithMethod("render", this.getFeatures());
        this.accumulator -= this.delta;
      }
    };

    if (!this.isStopped) {
      this.drawFrame();
    }
  }

  add(name: string, layer: Layer) {
    this.layers.addLayer(name, layer);
  }

  stop() {
    this.isStopped = true;
    window.cancelAnimationFrame(this.animationLoop);
  }
}
