import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import LayerBox from "src/Layers/Box";
import LayerBricks from "src/Layers/Bricks";
import EventHandler from "@toolbox/EventHandler";
import { KeyName } from "@toolbox/Keyboard";

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
    this.evtHandler.on(window.document, "keyup", (evt) => {
      if (KeyName.ESC == evt.keyCode) {
        this.toggle();
      }
    });
  }
  update(gameFeatures: GameFeatures): void {
    this.box.update(gameFeatures);
    this.bricks.update(gameFeatures);
    if (this.box.y > gameFeatures.canvas.height) {
      this.restart(gameFeatures);
    }

    if (!this.isPressed) {
      this.box.accY -= Math.sin(30) * 10;
      this.bricks.vx = 0;
    }

    if (this.isPressed) {
      this.bricks.vx = -900;
    }
    this.bounceBox();
  }
  render(gameFeatures: GameFeatures): void {
    if (this.isHidden) {
      return;
    }
    this.box.render(gameFeatures);
    this.bricks.render(gameFeatures);
  }

  private bounceBox() {
    let brickTouched = this.bricks.collidesWithBrick(this.box);
    if (brickTouched) {
      this.box.y = brickTouched.y - (this.box.height + this.box.lineWidth);
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
