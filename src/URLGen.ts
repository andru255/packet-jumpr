import { Random } from "@toolbox/Math";

const gen = (t: number): string[] => {
  var res = [];
  const dom = [
    "timez",
    "js13kgmes",
    "jiggle",
    "rocks",
    "hard",
    "playgrund",
    "lorem",
  ];
  const ext = ["com", "gov", "org"];
  for (var i = 0; i < t; i++) {
    res.push(
      `${dom[Random.int(0, dom.length - 1)]}.${
        ext[Random.int(0, ext.length - 1)]
      }`
    );
  }
  return res;
};

export default gen;
