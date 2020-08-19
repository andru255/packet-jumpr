import { Game } from "./Game";
import gameScene from "./Scenes/Game";

const game = new Game("c");
const setup = () => {
  console.log(game.getFeatures().name);
  game.add("gameScene", gameScene);
};
const JLP = () => {
  setup();
  game.start();
};
export default JLP;
