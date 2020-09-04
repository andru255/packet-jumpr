import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { textFixture, rectangleFixture } from "@toolbox/Fixture";

export default class NavBarScene extends Layer {
  boxUrl = <Layer>{
    x: 10,
    y: 10,
    fillStyle: "#fff",
    height: 60,
    font: "30px Arial, sans-serif",
  };
  url = <Layer>{
    x: 20,
    y: 50,
    fillStyle: "#000",
    width: 300,
    height: 60,
    font: "30px Arial, sans-serif",
  };
  bricks = <Layer>{
    y: 50,
    fillStyle: "#000",
    font: "30px Arial, sans-serif",
  };
  urls = <Layer>{ y: 50, fillStyle: "#00416d", font: "30px Arial, sans-serif" };
  fc = <Layer>{
    y: 50,
    fillStyle: "#fff",
    width: 50,
    height: 60,
    font: "40px Arial, sans-serif",
  };
  v = [0, 0, 0, ""];
  start(gameFeatures: GameFeatures): void {
    const w = gameFeatures.canvas.width;
    this.boxUrl.width = w - 80;
    this.bricks.x = w - 400;
    this.urls.x = w - 210;
    this.fc.x = w - 60;
  }
  update(gameFeatures: GameFeatures): void {
    this.url.text = `https://${this.v[0] || "--"}`;
    this.bricks.text = `Bricks: ${this.v[1] || "--"}`;
    this.urls.text = `URLs: ${this.v[2] || "--"}`;
    this.fc.text = `${this.v[3] || "🙂"}`;
  }
  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this.boxUrl, gameFeatures);
    textFixture(this.fc, gameFeatures);
    textFixture(this.url, gameFeatures);
    textFixture(this.urls, gameFeatures);
    textFixture(this.bricks, gameFeatures);
  }
}
