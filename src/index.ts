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
    menuScene.start(gameFeatures);
    menuScene.show("welcome");
    this.evtHandler.on(window.document, "keyup", (evt) => {
      if (KeyName.ESC == evt.keyCode) {
        if (this.gs.isOff) {
          this.gs.resume(gameFeatures);
          menuScene.clear();
          console.log("clearrr!!");
          return;
        }
        console.log("pause!!");
        menuScene.show("pause");
        this.gs.pause(gameFeatures);
      }
    });
  }
  update(gameFeatures: GameFeatures): void {
    if (this.gs.isOut) {
      menuScene.show("lose");
      //this.gs.restart(gameFeatures);
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
