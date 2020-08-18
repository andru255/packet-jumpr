import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";

class Box extends Layer {
  start(gameFeatures: GameFeatures): void {
    this.width = 50;
    this.height = 50;
    this.fillStyle = "#fff";
    this.lineWidth = 2;
    this.strokeStyle = "#000";
  }
  update(gameFeatures: GameFeatures): void {}
  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
  }
}

export default new Box();
