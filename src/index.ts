import { Game, GameFeatures } from "./Game";
import gameScene from "./Scenes/Game";
import welcomeScene from "./Scenes/Welcome";
import Layer from "@abstract/Layer";
import { KeyName } from "@toolbox/Keyboard";
import EventHandler from "@toolbox/EventHandler";

class MainLayer extends Layer {
  private evtHandler = new EventHandler();
  start(gameFeatures: GameFeatures): void {
    gameScene.start(gameFeatures);
    welcomeScene.start(gameFeatures);
    gameScene.pause(gameFeatures);

    this.evtHandler.on(window.document, "keyup", (evt) => {
      if (KeyName.ESC == evt.keyCode) {
        if (gameScene.isOff) {
          gameScene.resume(gameFeatures);
          return;
        }
        gameScene.pause(gameFeatures);
      }
    });
  }
  update(gameFeatures: GameFeatures): void {
    gameScene.update(gameFeatures);
    welcomeScene.update(gameFeatures);
  }
  render(gameFeatures: GameFeatures): void {
    gameScene.render(gameFeatures);
    welcomeScene.render(gameFeatures);
  }
}

const JLP = () => {
  const game = new Game("c", new MainLayer());
  game.setup();
  game.on();
};
export default JLP;
