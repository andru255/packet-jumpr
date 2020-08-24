import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture } from "@toolbox/Fixture";
import LayerButton from "src/Layers/Button";
import { KeyName } from "@toolbox/Keyboard";

class WelcomeScene extends Layer {
  startBtn = new LayerButton();
  statsBtn = new LayerButton();
  isHidden = false;

  start(gameFeatures: GameFeatures): void {
    this.width = gameFeatures.canvas.width;
    this.height = gameFeatures.canvas.height;
    // start button
    this.startBtn.fillStyle = "#f00";
    this.startBtn.width = 320;
    this.startBtn.height = 55;
    this.startBtn.x = this.width / 2 - this.startBtn.width / 2;
    this.startBtn.y = this.height / 2;
    this.startBtn.label.y = 40 + this.startBtn.y;
    this.startBtn.label.x = 5 + this.startBtn.x;
    this.startBtn.label.fillStyle = "#000";
    this.startBtn.label.font = "40px arial, sans-serif";
    this.startBtn.label.text = "START [ENTER]";
    this.startBtn
      .on("click", () => this.toggle())
      .on("keydown", (evt) => {
        if (KeyName.ENTER == evt.keyCode) {
          this.toggle();
        }
      });
    this.startBtn.start(gameFeatures);
  }
  update(gameFeatures: GameFeatures): void {
    if (this.isHidden) {
      this.startBtn.hide();
    }
  }
  render(gameFeatures: GameFeatures): void {
    if (this.isHidden) {
      return;
    }
    rectangleFixture(this, gameFeatures);
    this.startBtn.render(gameFeatures);
  }
}

export default new WelcomeScene();
