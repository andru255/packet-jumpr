import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture, textFixture } from "@toolbox/Fixture";

export default class LayerBrick extends Layer {
  x = 0;
  y = 0;
  fillStyle = "#ffffff";
  strokeStyle = "#ff000000";
  lineWidth = 0;
  width = 0;
  height = 30;
  label = <Layer>{ fillStyle: "#00416d", font: "30px Arial, sans-serif" };
  start(gameFeatures: GameFeatures): void {}
  update(gameFeatures: GameFeatures): void {
    this.label.x = this.x;
    this.label.y = this.y + 30;
    this.label.width = this.width;
    this.label.height = this.height;
  }
  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
    textFixture(this.label, gameFeatures);
  }
}
