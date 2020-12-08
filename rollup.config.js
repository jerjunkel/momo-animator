const dist = "dist";
const bundle = "momo";
export default {
  input: "src/js/Momo.js",
  output: {
    name: "Momo",
    file: `${dist}/${bundle}.umd.js`,
    format: "umd",
  },
};
