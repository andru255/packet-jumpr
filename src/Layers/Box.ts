import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";

class LayerBox extends Layer {
  start(gameFeatures: GameFeatures): void {
    this.width = 50;
    this.height = 50;
    this.fillStyle = "#fff";
    this.lineWidth = 2;
    this.strokeStyle = "#000";
    this.x = 20;
    this.y = 20;
    this.accY = 100;
    this.bounce = -1;
  }

  update(gameFeatures: GameFeatures): void {
    this.vy += gameFeatures.dt * this.accY;
    this.y = this.vy;
  }

  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
  }
}

export default new LayerBox();
