import typescript from "rollup-plugin-typescript";
const dist = "dist";
const bundle = "momo";

export default {
  input: "src/ts/momo.ts",
  output: {
    name: "Momo",
    file: `${dist}/${bundle}.umd.js`,
    format: "umd",
  },
  plugins: [typescript()],
};
