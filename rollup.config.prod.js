import typescript from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser";
const dist = "dist";
const bundle = "momo";

export default {
  input: "src/ts/momo.ts",
  output: [
    {
      name: "Momo",
      file: `${dist}/${bundle}.umd.js`,
      format: "umd",
    },
    {
      name: "Momo",
      file: `${dist}/${bundle}.min.js`,
      format: "cjs",
      plugins: [terser()],
    },
  ],
  plugins: [typescript()],
};
