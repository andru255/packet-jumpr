import Layer from "@abstract/Layer";
import { LayerStack } from "../LayerStack";

enum LoopStatus {
  Stopped,
  Started,
}
export default abstract class GameEngine {
  loopStatus: LoopStatus = LoopStatus.Stopped;
  animationLoop: number;
  drawFrame;
  layers: LayerStack;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  data: any;

  //animation vars
  accumulator: number = 0;
  delta: number = 1e3 / 60;
  step: number = 1 / 60;
  last: number = 0;
  now: number;
  dt: number = 0;

  abstract getFeatures(): {};

  init(): void {}

  start(): void {
    this.loopStatus = LoopStatus.Started;

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

    if (this.loopStatus == LoopStatus.Started) {
      this.drawFrame();
    }
  }

  add(name: string, layer: Layer) {
    this.layers.addLayer(name, layer);
  }

  remove(name: string) {
    // todo
    // this.layers.addLayer(name, layer);
  }

  stop() {
    this.loopStatus = LoopStatus.Stopped;
    window.cancelAnimationFrame(this.animationLoop);
  }

  restart() {
    this.stop();
    this.layers.stop();
    this.start();
  }
}
