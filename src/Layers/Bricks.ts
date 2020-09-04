import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { Random } from "@toolbox/Math";
import LayerBrick from "./Brick";
export default class LayerBricks extends Layer {
  //public passed = 0; // 0
  //public lpassed = 0; // 1
  //public totalp = 0; // 2
  //3,4,5 -> when it pass visually one URL
  public d = [0, 0, 0, 0, 0, 0, 0];
  public won: boolean = false;
  private bricks: LayerBrick[] = [];
  private numBricks = 3;
  public ls: string[];
  public ll: number;

  start(gameFeatures: GameFeatures): void {
    this.width = gameFeatures.canvas.width;
    this.height = gameFeatures.canvas.height / 2 + 10;
    this.x = 20;
    this.y = gameFeatures.canvas.height - this.height;
    this.lineWidth = 1;
    this.ll = this.gtLsLength();
    this.generateBricks(gameFeatures);
  }

  update(gameFeatures: GameFeatures): void {
    this.x += this.vx;
    if (this.d[2] == this.ll) {
      this.won = true;
      return;
    }

    if (this.d[4] == this.ls[this.d[3]].length) {
      if (this.ll - this.d[4] > 1) {
        this.d[5] = 0;
        this.d[3]++;
      }
      this.d[4] = 0;
    }

    this.bricks.forEach((brick, index) => {
      brick.vx = gameFeatures.dt * this.vx;
      brick.x += brick.vx;
      if (brick.x + brick.width <= 0) {
        this.bricks.splice(index, 1);
        var next = this.d[0] + (this.d[1] == 0 ? this.numBricks : 0);
        if (this.ls[this.d[1]].length == next) {
          if (this.ll - (this.d[2] + this.numBricks) > 1) {
            next = 0;
            this.d[0] = 0;
            this.d[1]++;
          }
        }
        if (this.ls[this.d[1]][next] !== undefined) {
          this.appendBrick(
            gameFeatures,
            this.bricks[this.bricks.length - 1],
            this.ls[this.d[1]][next]
          );
        }
        this.d[0]++;
        this.d[2]++;
        this.d[4]++;
        this.d[5]++;
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
        this.ls[this.d[1]][i]
      );
      brick.x = 20;
      if (this.bricks.length > 0) {
        let lastBrick = this.bricks[i - 1];
        brick = this.getNewBrick(
          gameFeatures,
          lastBrick,
          this.ls[this.d[1]][i]
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
    brick.label.text = t.toUpperCase();
    brick.start(gameFeatures);
    return brick;
  }

  public gtLsLength(): number {
    return this.ls.reduce((x, l) => x + l.length, 0);
  }
}
