import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";

export default class LayerBox extends Layer {
  maxAccY = 25;

  start(gameFeatures: GameFeatures): void {
    this.width = 30;
    this.height = 30;
    this.fillStyle = "#fff";
    this.lineWidth = 2;
    this.strokeStyle = "#000";
    this.x = 20;
    this.y = 50;
    this.bounce = -1;
    this.accY = 0.1;
  }

  update(gameFeatures: GameFeatures): void {
    if (this.accY > this.maxAccY) {
      this.accY = this.maxAccY;
    }
    this.vy += gameFeatures.dt * this.accY;
    this.y += this.vy;
  }

  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
  }
}
