import { Game } from "./Game";
const game = new Game("c");
const setup = () => {
  console.log("setup game!");
  // Actors
  // HUD
  // prompts

  // initial state
  game.stop();
};
const JLP = () => {
  setup();
  game.start();
};
export default JLP;
