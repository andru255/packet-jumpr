import { Game, GameFeatures } from "./Game";
import menuScene from "./Scenes/Menu";
import Layer from "@abstract/Layer";
import { KeyName } from "@toolbox/Keyboard";
import EventHandler from "@toolbox/EventHandler";
import GameScene from "./Scenes/Game";

class MainLayer extends Layer {
  private evtHandler = new EventHandler();
  private gs = new GameScene();
  start(gameFeatures: GameFeatures): void {
    this.gs.start(gameFeatures);
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
    if (this.gs.won) {
      menuScene.show(3);
      menuScene.update(gameFeatures);
      return;
    }
    if (this.gs.isOut) {
      menuScene.show(2, this.gs.score);
      menuScene.update(gameFeatures);
      return;
    }
    this.gs.update(gameFeatures);
    menuScene.update(gameFeatures);
  }
  render(gameFeatures: GameFeatures): void {
    this.gs.render(gameFeatures);
    menuScene.render(gameFeatures);
  }
}

const JLP = () => {
  const game = new Game("c", new MainLayer());
  game.setup();
  game.on();
};
export default JLP;
