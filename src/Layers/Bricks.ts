import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { Random } from "@toolbox/Math";
import LayerBrick from "./Brick";
import { rectangleFixture } from "@toolbox/Fixture";

export default class LayerBricks extends Layer {
  private bricks: LayerBrick[] = [];
  private numBricks = 4;

  start(gameFeatures: GameFeatures): void {
    this.width = gameFeatures.canvas.width;
    this.height = gameFeatures.canvas.height / 2 + 10;
    this.x = 20;
    this.y = gameFeatures.canvas.height - this.height;
    this.lineWidth = 1;
    this.generateBricks(gameFeatures);
  }
  update(gameFeatures: GameFeatures): void {
    this.x += this.vx;
    this.bricks.forEach((brick, index) => {
      brick.vx = gameFeatures.dt * this.vx;
      brick.x += brick.vx;
      if (brick.x + brick.width <= 0) {
        this.bricks.splice(index, 1);
        this.appendBrick(gameFeatures, this.bricks[this.bricks.length - 1]);
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

  private generateBricks(gameFeatures) {
    for (let i = 0; i < this.numBricks; i++) {
      var brick = this.getNewBrick(gameFeatures);
      brick.x = 20;
      if (this.bricks.length > 0) {
        let lastBrick = this.bricks[i - 1];
        brick = this.getNewBrick(gameFeatures, lastBrick);
      }
      this.bricks.push(brick);
    }
  }

  private appendBrick(gameFeatures: GameFeatures, lastBrick: Layer) {
    this.bricks.push(this.getNewBrick(gameFeatures, lastBrick));
  }

  private getNewBrick(
    gameFeatures: GameFeatures,
    lastBrick?: Layer
  ): LayerBrick {
    let brick = new LayerBrick();
    brick.width = Random.fromArray([40, 60]);
    brick.y = (gameFeatures.canvas.height * 3) / 4 + Random.int(-100, 100);
    if (lastBrick) {
      brick.x = lastBrick.x + lastBrick.width + Random.int(200, 280);
    }
    return brick;
  }
}
