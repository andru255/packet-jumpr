import { Game, GameFeatures } from "./Game";
import menuScene from "./Scenes/Menu";
import Layer from "@abstract/Layer";
import { KeyName } from "@toolbox/Keyboard";
import EventHandler from "@toolbox/EventHandler";
import GameScene from "./Scenes/Game";
import NavBarScene from "./Scenes/NavBar";
import gen from "./URLGen";
import { Random } from "@toolbox/Math";

class MainLayer extends Layer {
  private evtHandler = new EventHandler();
  private gs = new GameScene();
  private v = new NavBarScene();
  private bsc: string;
  private ksc = "jlp";

  start(gameFeatures: GameFeatures): void {
    // game
    this.gs.ls = gen(Random.int(5, 10));
    this.gs.start(gameFeatures);
    // score in navbar
    this.v.start(gameFeatures);
    //menu events
    //welcome
    menuScene.cbs["c00"] = () => {
      menuScene.clear();
      this.gs.resume(gameFeatures);
    };
    // restart && continue
    menuScene.cbs["ku00"] = menuScene.cbs["c00"];
    menuScene.cbs["c10"] = () => {
      menuScene.clear();
      this.gs.restart(gameFeatures);
    };
    menuScene.cbs["ku10"] = menuScene.cbs["c10"];
    menuScene.cbs["c11"] = menuScene.cbs["c00"];
    // 404
    menuScene.cbs["c20"] = menuScene.cbs["c10"];
    menuScene.cbs["ku20"] = menuScene.cbs["c20"];
    // win
    menuScene.cbs["c30"] = menuScene.cbs["c10"];
    menuScene.cbs["ku30"] = menuScene.cbs["c10"];
    menuScene.start(gameFeatures);
    menuScene.show(0);
    this.evtHandler.on(window.document, "keyup", (evt) => {
      if (
        KeyName.ESC == evt.keyCode &&
        [0, 2].indexOf(menuScene.active) == -1
      ) {
        if (this.gs.isOff) {
          this.gs.resume(gameFeatures);
          menuScene.clear();
          return;
        }
        menuScene.show(1);
        this.gs.pause(gameFeatures);
      }
    });
  }

  update(gameFeatures: GameFeatures): void {
    this.v.v = [this.gs.ls[this.gs.d[3]], this.gs.d[2], this.gs.d[3]];
    if (this.gs.isPressed) {
      this.v.v[3] = "😮";
      this.v.update(gameFeatures);
    }
    if (this.gs.won) {
      this.v.v = [
        this.gs.ls[this.gs.d[3]],
        this.gs.d[2] + 1,
        this.gs.d[3] + 1,
        "🤩",
      ];
      this.v.update(gameFeatures);
      menuScene.show(3);
      menuScene.update(gameFeatures);
      return;
    }
    if (this.gs.isOut) {
      this.v.v[3] = "😵";
      this.v.update(gameFeatures);
      menuScene.show(2, this.recMRAndResult());
      menuScene.update(gameFeatures);
      return;
    }
    this.v.update(gameFeatures);
    this.gs.update(gameFeatures);
    menuScene.update(gameFeatures);
  }
  render(gameFeatures: GameFeatures): void {
    this.gs.render(gameFeatures);
    menuScene.render(gameFeatures);
    this.v.render(gameFeatures);
  }

  recMRAndResult() {
    this.bsc =
      localStorage.getItem(this.ksc) == null
        ? "[0,0]"
        : localStorage.getItem(this.ksc);
    const lastData = JSON.parse(this.bsc);
    if (this.gs.d[2] > lastData[0]) {
      localStorage.setItem(
        this.ksc,
        JSON.stringify([this.gs.d[2], this.gs.d[3]])
      );
    }
    if (lastData[0] > this.gs.d[2]) {
      return [lastData[0], lastData[1]];
    }
    return [this.gs.d[2], this.gs.d[3]];
  }
}

const JLP = () => {
  const game = new Game("c", new MainLayer());
  game.setup();
  game.on();
};
export default JLP;
