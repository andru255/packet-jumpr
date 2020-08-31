import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture, textFixture } from "@toolbox/Fixture";
import LayerButton from "src/Layers/Button";
import { KeyName } from "@toolbox/Keyboard";
import GameScene from "./Game";
import { MENU_OPTS, MENU_COMP } from "src/MenuOpts";

class MenuScene extends Layer {
  startBtn = new LayerButton();
  isHidden = false;
  comps: { id: string; title: Layer; desc: Layer; btns?: LayerButton[] }[] = [];
  compId: string;

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
    this.comps = MENU_OPTS.map((op, i) => {
      const title = <Layer>{ text: op.title };
      title.y = this.width / 2;
      title.x = this.height / 2;

      const desc = <Layer>{ text: op.desc };
      desc.y = title.y + 20;
      desc.x = title.x;
      return {
        id: op.id,
        title,
        desc,
      };
    });
  }

  update(gameFeatures: GameFeatures): void {
    console.log("compId", this.compId);
    if (this.isHidden || this.compId == "") {
      //this.startBtn.hide(gameFeatures.canvas);
      return;
    }
    //this.startBtn.show(gameFeatures.canvas);
  }

  render(gameFeatures: GameFeatures): void {
    if (this.isHidden || this.compId == "") {
      return;
    }
    rectangleFixture(this, gameFeatures);
    textFixture(this.getComp(this.compId).title, gameFeatures);
    textFixture(this.getComp(this.compId).desc, gameFeatures);
    //this.startBtn.render(gameFeatures);
  }

  show(type: any): void {
    this.compId = type;
  }

  clear() {
    this.compId = "";
  }

  private setupBtns(
    st: MENU_COMP,
    gf: GameFeatures,
    callbacks?: any
  ): LayerButton[] {
    return st.opts.map((i, x) => {
      const btn = new LayerButton();
      btn.id = `${st.id}${x}`;
      btn.fillStyle = "#f00";
      btn.width = 320;
      btn.height = 55;
      btn.x = this.width / 2 - this.startBtn.width / 2;
      btn.y = this.height / 2;
      btn.label.y = 40 + this.startBtn.y;
      btn.label.x = 5 + this.startBtn.x;
      btn.label.fillStyle = "#000";
      btn.label.font = "30px arial, sans-serif";
      btn.label.text = i.l;
      btn.on("click", callbacks[`click${btn.id}`]).on("keyup", (evt) => {
        if (i.k == evt.keyCode) {
          callbacks[`ku${btn.id}`](evt);
        }
      });
      btn.start(gf);
      return btn;
    });
  }

  private getComp(id) {
    return this.comps.find((e) => e.id == id);
  }
}

export default new MenuScene();
