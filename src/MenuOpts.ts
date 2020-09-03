import { KeyName } from "@toolbox/Keyboard";

export interface MENU_COMP {
  title: string;
  desc: string;
  opts: { l: string; k: KeyName }[];
}

export const MENU_OPTS: MENU_COMP[] = [
  {
    title: "JUMP PACKET!",
    desc: "Use the mouse and click on the canvas",
    opts: [
      {
        l: "START!",
        k: KeyName.ENTER,
      },
    ],
  },
  {
    title: "Take a Breath!",
    desc: "",
    opts: [
      {
        l: "RESTART",
        k: KeyName.ENTER,
      },
      {
        l: "CONTINUE",
        k: KeyName.ESC,
      },
    ],
  },
  {
    title: "404",
    desc: "",
    opts: [
      {
        l: "PLAY AGAIN!",
        k: KeyName.ENTER,
      },
    ],
  },
  {
    title: "Sweet! You Win :D",
    desc: "all set!",
    opts: [
      {
        l: "PLAY AGAIN!",
        k: KeyName.ENTER,
      },
    ],
  },
];
