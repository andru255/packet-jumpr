import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import LayerBox from "src/Layers/Box";
import LayerBricks from "src/Layers/Bricks";
import EventHandler from "@toolbox/EventHandler";
import { Random } from "@toolbox/Math";

class GameScene extends Layer {
  private isPressed: boolean = false;
  private evtHandler = new EventHandler();

  private box: LayerBox = new LayerBox();
  private bricks: LayerBricks = new LayerBricks();

  start(gameFeatures: GameFeatures): void {
    this.box.start(gameFeatures);
    this.bricks.start(gameFeatures);
    this.evtHandler.on(gameFeatures.canvas, "mousedown", () => {
      this.isPressed = true;
    });
    this.evtHandler.on(gameFeatures.canvas, "mouseup", () => {
      this.isPressed = false;
    });
  }
  update(gameFeatures: GameFeatures): void {
    this.box.accY -= Math.sin(30) * 25;

    if (this.box.y > gameFeatures.canvas.height) {
      this.restart(gameFeatures);
    }

    if (!this.isPressed) {
      this.bricks.vx = 0;
      this.bounceBox();
    }

    if (this.isPressed) {
      this.bricks.vx = -10;
    }

    this.box.update(gameFeatures);
    this.bricks.update(gameFeatures);
  }
  render(gameFeatures: GameFeatures): void {
    this.box.render(gameFeatures);
    this.bricks.render(gameFeatures);
  }

  private bounceBox() {
    let brickTouched = this.bricks.collidesWithBrick(this.box);
    if (brickTouched) {
      this.box.y = brickTouched.y - brickTouched.height - this.box.height;
      this.box.vy *= this.box.bounce;
    }
  }
  private restart(gameFeatures: GameFeatures) {
    this.box = new LayerBox();
    this.bricks = new LayerBricks();
    this.start(gameFeatures);
  }
}

export default new GameScene();
