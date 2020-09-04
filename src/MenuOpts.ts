import { KeyName } from "@toolbox/Keyboard";

export interface MENU_COMP {
  title: string;
  desc: string;
  opts: { l: string; k: KeyName; w: number }[];
}

export const MENU_OPTS: MENU_COMP[] = [
  {
    // 0
    title: "JUMP PACKET!",
    desc: "Use the mouse and click on the canvas",
    opts: [
      {
        l: "START!",
        k: KeyName.ENTER,
        w: 180,
      },
    ],
  },
  {
    // 1
    title: "Take a Breath!",
    desc: "",
    opts: [
      {
        l: "RESTART",
        k: KeyName.ENTER,
        w: 150,
      },
      {
        l: "CONTINUE",
        k: KeyName.ESC,
        w: 130,
      },
    ],
  },
  {
    // 2
    title: "404",
    desc: "",
    opts: [
      {
        l: "PLAY AGAIN!",
        k: KeyName.ENTER,
        w: 100,
      },
    ],
  },
  {
    // 3
    title: "Sweet! You Win :D",
    desc: "all set!",
    opts: [
      {
        l: "PLAY AGAIN!",
        k: KeyName.ENTER,
        w: 100,
      },
    ],
  },
];
