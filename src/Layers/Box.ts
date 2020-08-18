import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";

class LayerBox extends Layer {
  gravity = 100;
  friction = 0.1;

  start(gameFeatures: GameFeatures): void {
    this.width = 50;
    this.height = 50;
    this.fillStyle = "#fff";
    this.lineWidth = 2;
    this.strokeStyle = "#000";
    this.x = 20;
    this.y = 20;
  }

  update(gameFeatures: GameFeatures): void {
    let wall = <Layer>gameFeatures.layers["wall"];
    this.vy += gameFeatures.dt * this.gravity;
    this.y = this.vy;
  }

  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
  }
}

export default new LayerBox();
