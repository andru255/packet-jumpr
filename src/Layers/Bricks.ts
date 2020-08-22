import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { Random } from "@toolbox/Math";
import LayerBrick from "./Brick";

export default class LayerBricks extends Layer {
  private bricks: LayerBrick[] = [];
  private numBricks = 7;

  start(gameFeatures: GameFeatures): void {
    this.width = gameFeatures.canvas.width;
    this.height = gameFeatures.canvas.height / 2;
    this.x = 20;
    this.y = gameFeatures.canvas.height - this.height;
    this.generateBricks();
  }
  update(gameFeatures: GameFeatures): void {
    this.x += this.vx;

    this.bricks.forEach((brick, index) => {
      brick.vx = this.vx;
      brick.x += brick.vx;
      if (brick.x + brick.width <= 0) {
        this.bricks.splice(index, 1);
        this.appendBrick(this.bricks[this.bricks.length - 1]);
      }
    });
  }
  render(gameFeatures: GameFeatures): void {
    this.bricks.forEach((brick) => {
      brick.render(gameFeatures);
    });
  }

  collidesWithBrick(box?: Layer) {
    return this.bricks.find((brick) => brick.collideWith(box) === true);
  }

  private generateBricks() {
    for (let i = 0; i < this.numBricks; i++) {
      let brick = new LayerBrick();
      if (i == 0) {
        brick.x = 20;
      }
      brick.y = Random.fromArray([this.y, this.height]);
      brick.width = Random.fromArray([40, 60]);
      if (this.bricks.length > 0) {
        let lastBrick = this.bricks[i - 1];
        if (brick.y == lastBrick.y) {
          brick.y = Random.fromArray([brick.y, this.height]);
        }
        brick.x = lastBrick.x + lastBrick.width + Random.fromArray([250, 350]);
      }
      this.bricks.push(brick);
    }
  }

  private appendBrick(lastBrick: Layer) {
    let brick = new LayerBrick();
    brick.width = Random.fromArray([40, 60]);
    brick.y = Random.fromArray([lastBrick.y, this.height]);
    if (brick.y == lastBrick.y) {
      brick.y = Random.fromArray([lastBrick.y, this.height]);
    }
    brick.x = lastBrick.x + lastBrick.width + Random.fromArray([250, 350]);
    this.bricks.push(brick);
  }
}
