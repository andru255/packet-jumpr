import { Game } from "./Game";
import gameScene from "./Scenes/Game";
import welcomeScene from "./Scenes/Welcome";

const game = new Game("c");
const setup = () => {
  game.add("gameScene", gameScene);
  game.add("welcomeScene", welcomeScene);
};
const JLP = () => {
  setup();
  game.start();
};
export default JLP;
