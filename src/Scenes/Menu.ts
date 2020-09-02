import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture, textFixture } from "@toolbox/Fixture";
import LayerButton from "src/Layers/Button";
import { KeyName } from "@toolbox/Keyboard";
import { MENU_OPTS, MENU_COMP } from "src/MenuOpts";

class MenuScene extends Layer {
  startBtn = new LayerButton();
  isHidden = false;
  comps: { title: Layer; desc: Layer; btns?: LayerButton[] }[] = [];
  active: number;
  cbs = {};

  start(gameFeatures: GameFeatures): void {
    this.width = gameFeatures.canvas.width;
    this.height = gameFeatures.canvas.height;
    this.fillStyle = "#ffffffcc";
    // start button
    //this.startBtn.fillStyle = "#f00";
    //this.startBtn.width = 320;
    //this.startBtn.height = 55;
    //this.startBtn.x = this.width / 2 - this.startBtn.width / 2;
    //this.startBtn.y = this.height / 2;
    //this.startBtn.label.y = 40 + this.startBtn.y;
    //this.startBtn.label.x = 5 + this.startBtn.x;
    //this.startBtn.label.fillStyle = "#000";
    //this.startBtn.label.font = "30px arial, sans-serif";
    //this.startBtn.label.text = "START [ENTER]";
    //this.startBtn
    //  .on("click", () => this.toggle())
    //  .on("keydown", (evt) => {
    //    if (KeyName.ENTER == evt.keyCode) {
    //      this.toggle();
    //    }
    //  });
    //this.startBtn.start(gameFeatures);
    console.log("this.cbs", this.cbs);
    this.comps = MENU_OPTS.map((op, i) => {
      const title = <Layer>{ text: op.title };
      title.y = this.height / 2 - 100;
      title.x = 40;
      title.font = "50px Arial, sans-serif";

      const desc = <Layer>{ text: op.desc };
      desc.y = title.y + 60;
      desc.x = title.x;
      desc.font = "40px Arial, sans-serif";

      const btns = op.opts.map((item, x) => {
        const btn = new LayerButton();
        btn.id = `${i}${x}`;
        btn.fillStyle = "#f00";
        btn.width = 320;
        btn.height = 55;
        btn.x = this.width / 2 - btn.width / 2;
        btn.y = this.height / 2 + 100 * x;
        btn.label.y = btn.y + btn.height;
        btn.label.x = btn.x;
        btn.label.font = "60px Arial, sans-serif";
        btn.label.fillStyle = "#000";
        btn.label.text = item.l;
        if (this.cbs[`c${btn.id}`] !== undefined) {
          console.log("click", `c${btn.id}`);
          btn.on("click", this.cbs[`c${btn.id}`]);
        }
        if (this.cbs[`ku${btn.id}`] !== undefined) {
          console.log("keyup", `ku${btn.id}`);
          btn.on("keyup", (evt) => {
            if (item.k == evt.keyCode) {
              this.cbs[`ku${btn.id}`](evt);
            }
          });
        }
        btn.start(gameFeatures);
        return btn;
      });
      return {
        title,
        desc,
        btns,
      };
    });
  }

  update(gameFeatures: GameFeatures): void {
    if (this.isHidden || this.active == undefined) {
      this.comps.forEach((item) => {
        item.btns.forEach((btn) => btn.hide());
      });
      return;
    }
    //this.startBtn.show(gameFeatures.canvas);
    this.getComp().btns.forEach((btn) => btn.show());
  }

  render(gameFeatures: GameFeatures): void {
    if (this.isHidden) {
      return;
    }
    rectangleFixture(this, gameFeatures);
    textFixture(this.getComp().title, gameFeatures);
    textFixture(this.getComp().desc, gameFeatures);
    this.getComp().btns.forEach((btn) => btn.render(gameFeatures));
  }

  show(type: any, sc?: number): void {
    if (sc > 0) {
      this.comps[2].desc.text = `Your packet jumps ${sc} bricks! awesome :D`;
    }
    this.active = type;
    this.isHidden = false;
  }

  clear(): void {
    this.isHidden = true;
    this.active = undefined;
  }

  private getComp() {
    return this.comps[this.active];
  }
}

export default new MenuScene();
