import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import reload from "rollup-plugin-livereload";

const isDev = process.env.npm_lifecycle_event !== "build";

export default {
  input: "src/index.ts",
  output: {
    name: "JLP",
    dir: "lib",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript(),
    commonjs(),
    //terser(),
    isDev && serve(),
    isDev && reload(),
  ],
};
