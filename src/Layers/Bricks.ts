import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";
import { Random } from "@toolbox/Math";

class LayerBricks extends Layer {
  private bricks: Layer[] = [];
  private numBricks = 7;

  start(gameFeatures: GameFeatures): void {
    this.width = gameFeatures.canvas.width;
    this.height = gameFeatures.canvas.height / 2 - 50;
    this.fillStyle = "#00ff00fa";
    this.lineWidth = 2;
    this.strokeStyle = "#000";
    this.x = 20;
    this.y = gameFeatures.canvas.height - this.height;
    this.generateBricks();
  }
  update(gameFeatures: GameFeatures): void {
    this.x += this.vx;
    this.bricks.forEach((brick) => {
      brick.vx = this.vx;
      brick.x += brick.vx;
    });
  }
  render(gameFeatures: GameFeatures): void {
    rectangleFixture(this, gameFeatures);
    this.bricks.forEach((brick) => {
      rectangleFixture(brick, gameFeatures);
    });
  }

  private generateBricks() {
    for (let i = 0; i < this.numBricks; i++) {
      let brick: Layer = {
        x: this.x,
        y: Random.fromArray([this.y, this.height]),
        fillStyle: "#ff0000",
        lineWidth: 0,
        width: 60,
        height: 30,
      };
      if (this.bricks.length > 0) {
        let lastBrick = this.bricks[i - 1];
        if (brick.y == lastBrick.y) {
          brick.y = Random.fromArray([brick.y, this.height]);
        }
        brick.x = lastBrick.x + lastBrick.width + 60;
      }
      this.bricks.push(brick);
    }
  }
}

export default new LayerBricks();
