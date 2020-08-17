import GameEngine from "./abstract/GameEngine";
import { LayerStack } from "./LayerStack";
import Layer from "@abstract/Layer";

export interface GameFeatures {
  dt: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  name: string;
  layers: { [key: string]: Layer };
  data?: any;
  start: () => void;
  stop: () => void;
  restart: () => void;
}
export class Game extends GameEngine {
  constructor(canvasId) {
    super();
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.layers = new LayerStack();
  }

  getFeatures(): GameFeatures {
    return {
      dt: this.step,
      canvas: this.canvas,
      ctx: this.ctx,
      name: "PONGV2",
      layers: this.layers.getLayers(),
      start: this.start,
      stop: () => this.stop(),
      restart: this.restart,
    };
  }
}
