import { KeyName } from "@toolbox/Keyboard";

export interface MENU_COMP {
  id: string;
  title: string;
  desc: string;
  opts: { l: string; k: KeyName }[];
}

export const MENU_OPTS: MENU_COMP[] = [
  {
    id: "welcome",
    title: "Welcome to Run Packet! ruun!!",
    desc: "Use the mouse and click on the canvas",
    opts: [
      {
        l: "START",
        k: KeyName.ENTER,
      },
    ],
  },
  {
    id: "pause",
    title: "Take a breath!",
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
    id: "lose",
    title: "Thanks for playing!",
    desc: "Your packet jumps %N bricks! awesome :D",
    opts: [
      {
        l: "START AGAIN",
        k: KeyName.ENTER,
      },
    ],
  },
];
