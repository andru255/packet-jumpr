import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";

export default class LayerBrick extends Layer {
  x = 0;
  y = 0;
  fillStyle = "#ffffff";
  strokeStyle = "#ff000000";
  lineWidth = 0;
  width = 0;
  height = 15;
  start(gameFeatures: GameFeatures): void {}
  update(gameFeatures: GameFeatures): void {}
  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
  }
}
