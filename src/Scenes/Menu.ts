import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture, textFixture } from "@toolbox/Fixture";
import LayerButton from "src/Layers/Button";
import { MENU_OPTS } from "src/MenuOpts";

class MenuScene extends Layer {
  startBtn = new LayerButton();
  isHidden = false;
  comps: { title: Layer; desc: Layer; btns?: LayerButton[] }[] = [];
  active: number;
  cbs = {};

  start(gameFeatures: GameFeatures): void {
    this.width = gameFeatures.canvas.width;
    this.height = gameFeatures.canvas.height - 50;
    this.y = 80;
    this.fillStyle = "#ffffffcc";
    this.comps = MENU_OPTS.map((op, i) => {
      const title = <Layer>{ text: op.title };
      title.y = this.height / 2 - 100;
      title.x = this.width / 2 - 180;
      title.font = "50px Arial, sans-serif";
      const desc = <Layer>{ text: op.desc };
      desc.y = title.y + 60;
      desc.x = title.x - 180;
      desc.font = "40px Arial, sans-serif";
      const btns = op.opts.map((item, x) => {
        const btn = new LayerButton();
        btn.id = `${i}${x}`;
        btn.width = 280;
        btn.height = 60;
        btn.x = this.width / 2 - btn.width / 2;
        btn.y = this.height / 2 + 80 * (x + 1);
        btn.label.y = 10 + btn.y + btn.height / 2;
        btn.label.width = item.w;
        btn.label.x = btn.x + item.w / 2;
        btn.label.text = item.l;
        if (this.cbs[`c${btn.id}`] !== undefined) {
          btn.on("click", this.cbs[`c${btn.id}`]);
        }
        if (this.cbs[`ku${btn.id}`] !== undefined) {
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

  show(type: any, sc = []): void {
    if (sc.length > 0) {
      this.comps[2].desc.text = `Max Scored: ${sc[0]} bricks & ${sc[1]} URLs`;
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
