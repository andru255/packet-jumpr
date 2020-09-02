import { KeyName } from "@toolbox/Keyboard";

export interface MENU_COMP {
  title: string;
  desc: string;
  opts: { l: string; k: KeyName }[];
}

export const MENU_OPTS: MENU_COMP[] = [
  {
    title: "Welcome to Run Packet!",
    desc: "Use the mouse and click on the canvas",
    opts: [
      {
        l: "START",
        k: KeyName.ENTER,
      },
    ],
  },
  {
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
    title: "Thanks for playing!",
    desc: "",
    opts: [
      {
        l: "START AGAIN",
        k: KeyName.ENTER,
      },
    ],
  },
];
