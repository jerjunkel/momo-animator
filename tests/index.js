import Momo from "../dist/js/momo.js";

const section = document.querySelector("section");
// momo({ duration: "2000", curve: "cubic-bezier(0.65, 0, 0.35, 1)" });

Momo.init({
  duration: 2000,
  curve: "cubic-bezier(0.65, 0, 0.35, 1)",
});
// console.log(Momo.options);

const slide = Momo.animateElement("#slide");
const body = Momo.animateElementsIn("body", { duration: 4000 });
