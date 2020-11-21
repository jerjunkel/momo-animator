import Momo from "../dist/js/momo.js";

const section = document.querySelector("section");
// momo({ duration: "2000", curve: "cubic-bezier(0.65, 0, 0.35, 1)" });
const test = new Momo("body", {
  duration: 2000,
  curve: "cubic-bezier(0.65, 0, 0.35, 1)",
});
