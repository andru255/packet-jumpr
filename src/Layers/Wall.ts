import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";

class LayerWall extends Layer {
  start(gameFeatures: GameFeatures): void {
    this.width = 50;
    this.height = 50;
    this.fillStyle = "#0f0";
    this.lineWidth = 2;
    this.strokeStyle = "#000";
    this.x = 20;
    this.y = gameFeatures.canvas.height / 2;
  }
  update(gameFeatures: GameFeatures): void {}
  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
  }
}

export default new LayerWall();
