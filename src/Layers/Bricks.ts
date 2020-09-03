import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { Random } from "@toolbox/Math";
import LayerBrick from "./Brick";
export default class LayerBricks extends Layer {
  public passed = 0;
  public lpassed = 0;
  public totalp = 0;
  public won: boolean = false;
  private bricks: LayerBrick[] = [];
  private numBricks = 4;
  public ls: string[];

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
    if (this.totalp == this.gtLsLength()) {
      this.won = true;
      return;
    }

    this.bricks.forEach((brick, index) => {
      brick.vx = gameFeatures.dt * this.vx;
      brick.x += brick.vx;
      if (brick.x + brick.width <= 0) {
        this.bricks.splice(index, 1);
        var next = this.passed + (this.lpassed == 0 ? this.numBricks : 0);
        if (this.ls[this.lpassed].length == next) {
          if (this.gtLsLength() - (this.totalp + this.numBricks) > 1) {
            next = 0;
            this.passed = 0;
            this.lpassed++;
          }
        }
        if (this.ls[this.lpassed][next] !== undefined) {
          this.appendBrick(
            gameFeatures,
            this.bricks[this.bricks.length - 1],
            this.ls[this.lpassed][next]
          );
        }
        this.passed++;
        this.totalp++;
        console.log("lpassed", this.lpassed);
        console.log("next", next);
      }
      brick.update(gameFeatures);
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
      var brick = this.getNewBrick(
        gameFeatures,
        undefined,
        this.ls[this.lpassed][i]
      );
      brick.x = 20;
      if (this.bricks.length > 0) {
        let lastBrick = this.bricks[i - 1];
        brick = this.getNewBrick(
          gameFeatures,
          lastBrick,
          this.ls[this.lpassed][i]
        );
      }
      this.bricks.push(brick);
    }
  }

  private appendBrick(gameFeatures: GameFeatures, lastBrick: Layer, t: string) {
    this.bricks.push(this.getNewBrick(gameFeatures, lastBrick, t));
  }

  private getNewBrick(
    gameFeatures: GameFeatures,
    lastBrick?: Layer,
    t?: string
  ): LayerBrick {
    let brick = new LayerBrick();
    brick.width = Random.fromArray([40, 60]);
    brick.y = (gameFeatures.canvas.height * 3) / 4 + Random.int(-100, 100);
    if (lastBrick) {
      brick.x = lastBrick.x + lastBrick.width + Random.int(200, 280);
    }
    brick.label.text = t;
    brick.start(gameFeatures);
    return brick;
  }

  public gtLsLength(): number {
    return this.ls.reduce((x, l) => x + l.length, 0);
  }
}
