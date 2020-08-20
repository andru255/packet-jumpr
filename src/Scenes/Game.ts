import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import box from "src/Layers/Box";
import bricks from "src/Layers/Bricks";
import EventHandler from "@toolbox/EventHandler";

class GameScene extends Layer {
  private isPressed: boolean = false;
  private evtHandler = new EventHandler();
  start(gameFeatures: GameFeatures): void {
    box.start(gameFeatures);
    bricks.start(gameFeatures);
    this.evtHandler.on(gameFeatures.canvas, "mousedown", () => {
      this.isPressed = true;
    });
    this.evtHandler.on(gameFeatures.canvas, "mouseup", () => {
      this.isPressed = false;
    });
  }
  update(gameFeatures: GameFeatures): void {
    if (box.y <= 100) {
      box.accY = 100;
    }
    var brickTouched = bricks.collidesWithBrick(box);
    if (brickTouched) {
      box.y = brickTouched.y;
      box.accY *= box.bounce;
    }

    bricks.vx = 0;
    if (this.isPressed) {
      bricks.vx -= 1;
    }

    box.update(gameFeatures);
    bricks.update(gameFeatures);
  }
  render(gameFeatures: GameFeatures): void {
    box.render(gameFeatures);
    bricks.render(gameFeatures);
  }
}

export default new GameScene();
