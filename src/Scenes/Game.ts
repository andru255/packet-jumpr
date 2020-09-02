import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import LayerBox from "src/Layers/Box";
import LayerBricks from "src/Layers/Bricks";
import EventHandler from "@toolbox/EventHandler";
export default class GameScene extends Layer {
  private isPressed: boolean = false;
  private evtHandler = new EventHandler();
  private box: LayerBox = new LayerBox();
  private bricks: LayerBricks = new LayerBricks();
  public isOff: boolean = false;
  public isOut: boolean = false;
  public score: number = 0;

  start(gameFeatures: GameFeatures): void {
    this.box.start(gameFeatures);
    this.bricks.start(gameFeatures);
    this.off(gameFeatures.canvas);
  }

  update(gameFeatures: GameFeatures): void {
    if (this.isOff) {
      return;
    }
    this.box.update(gameFeatures);
    this.bricks.update(gameFeatures);
    if (this.box.y > gameFeatures.canvas.height) {
      this.isOut = true;
      this.score = this.bricks.passed;
      //this.restart(gameFeatures);
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
    //gameFeatures.off();
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
    this.score = 0;
    this.bricks.passed = 0;
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
  }

  private off(canvas: HTMLCanvasElement) {
    this.evtHandler.off(canvas, "mousedown");
    this.evtHandler.off(canvas, "mouseup");
  }

  private bounceBox() {
    let brickTouched = this.bricks.collidesWithBrick(this.box);
    if (brickTouched) {
      this.box.y = brickTouched.y - (this.box.height + this.box.lineWidth);
      this.box.vy *= this.box.bounce;
    }
  }
}
