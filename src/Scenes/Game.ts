import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import LayerBox from "src/Layers/Box";
import LayerBricks from "src/Layers/Bricks";
import EventHandler from "@toolbox/EventHandler";
import { KeyName } from "@toolbox/Keyboard";
export default class GameScene extends Layer {
  public isPressed: boolean = false;
  private evtHandler = new EventHandler();
  private box: LayerBox = new LayerBox();
  private bricks: LayerBricks = new LayerBricks();
  public isOff: boolean = false;
  public isOut: boolean = false;
  public won: boolean = false;
  public ls = [];
  public d = [0, 0, 0];

  start(gameFeatures: GameFeatures): void {
    this.bricks.ls = this.ls;
    this.box.start(gameFeatures);
    this.bricks.start(gameFeatures);
    this.off(gameFeatures.canvas);
  }

  update(gameFeatures: GameFeatures): void {
    this.d = this.bricks.d;
    if (this.isOff) {
      return;
    }
    this.box.update(gameFeatures);
    this.bricks.update(gameFeatures);

    if (this.box.y > gameFeatures.canvas.height) {
      this.won = this.bricks.won;
      this.isOut = true;
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
    if (this.isOff || this.isOut) {
      return;
    }
    this.box.render(gameFeatures);
    this.bricks.render(gameFeatures);
  }

  pause(gameFeatures: GameFeatures) {
    this.isOff = true;
    this.off(gameFeatures.canvas);
  }

  resume(gameFeatures: GameFeatures) {
    this.isOff = false;
    this.on(gameFeatures.canvas);
    gameFeatures.on();
  }

  restart(gameFeatures: GameFeatures) {
    this.box = new LayerBox();
    this.bricks = new LayerBricks();
    this.isOut = false;
    this.isOff = false;
    this.won = false;
    this.bricks.d[2] = 0;
    this.start(gameFeatures);
    this.on(gameFeatures.canvas);
  }

  private on(canvas: HTMLCanvasElement) {
    this.evtHandler.on(canvas, "mousedown", () => {
      this.isPressed = true;
    });
    this.evtHandler.on(canvas, "mouseup", () => {
      this.isPressed = false;
    });
    this.evtHandler.on(document, "keydown", (evt) => {
      if (evt.keyCode == KeyName.SBAR) {
        this.isPressed = true;
      }
    });
    this.evtHandler.on(document, "keyup", (evt) => {
      if (evt.keyCode == KeyName.SBAR) {
        this.isPressed = false;
      }
    });
  }

  private off(canvas: HTMLCanvasElement) {
    this.evtHandler.off(canvas, "mousedown");
    this.evtHandler.off(canvas, "mouseup");
    this.evtHandler.off(document, "keydown");
    this.evtHandler.off(document, "keyup");
  }

  private bounceBox() {
    let brickTouched = this.bricks.collidesWithBrick(this.box);
    if (brickTouched) {
      this.box.y = brickTouched.y - (this.box.height + this.box.lineWidth);
      this.box.vy *= this.box.bounce;
      brickTouched.fillStyle = "#0dfff0";
      if (this.bricks.ll == this.bricks.d[2] + 1) {
        this.won = true;
      }
    }
  }
}
