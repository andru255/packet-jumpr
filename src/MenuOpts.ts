import { KeyName } from "@toolbox/Keyboard";

export interface MENU_COMP {
  title: string;
  ml: number;
  desc: string;
  mml: number;
  opts: { l: string; k: KeyName; w: number }[];
}

export const MENU_OPTS: MENU_COMP[] = [
  {
    // 0
    title: "PACKET JUMPR",
    ml: -190,
    desc: "Use the mouse and click on the canvas",
    mml: -340,
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
    ml: -170,
    desc: "",
    mml: -240,
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
    title: "❌ 404 ❌",
    ml: -150,
    desc: "Max Score:",
    mml: -110,
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
    title: "Sweet! You Win 🙌 ",
    ml: -210,
    desc: "Perfect 💯",
    mml: -90,
    opts: [
      {
        l: "PLAY AGAIN!",
        k: KeyName.ENTER,
        w: 100,
      },
    ],
  },
];
