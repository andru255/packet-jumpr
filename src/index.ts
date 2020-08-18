import { Game } from "./Game";
import box from "./Layers/Box";

const game = new Game("c");
const setup = () => {
  console.log(game.getFeatures().name);
  // Actors
  game.add("box", box);
  // HUD
  // prompts
  // initial state
  //game.stop();
};
const JLP = () => {
  setup();
  game.start();
};
export default JLP;
