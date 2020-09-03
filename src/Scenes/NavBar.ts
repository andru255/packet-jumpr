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
  start(gameFeatures: GameFeatures): void {
    this.boxUrl.width = gameFeatures.canvas.width - 70;
    this.bricks.x = gameFeatures.canvas.width - 400;
    this.urls.x = gameFeatures.canvas.width - 190;
  }
  update(gameFeatures: GameFeatures): void {}
  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this.boxUrl, gameFeatures);
    textFixture(this.url, gameFeatures);
    textFixture(this.urls, gameFeatures);
    textFixture(this.bricks, gameFeatures);
  }
}
