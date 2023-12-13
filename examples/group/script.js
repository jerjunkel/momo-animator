import Momo from "../../src/js/index.js";

Momo.setGlobalOptions({
  curve: "ease",
  duration: 1000,
});
const boxGroupAnimator = Momo.createAnimatableGroup("#box-group", {
  animation: "scale.in.up",
  staggerBy: 100,
  curve: "cubic-bezier(0.85, 0, 0.15, 1)",
});

// boxGroupAnimator
//   .then({
//     animation: "fade-out-down",
//     staggerBy: 100,
//   })
//   .then({
//     animation: "fade-in-right",
//     staggerBy: 100,
//     duration: 200,
//   });
// const textAnimator = Momo.createAnimatableGroup("#text-group", {
//   animation: "fade-in-up",
//   staggerBy: 100,
//   curve: "cubic-bezier(0.85, 0, 0.15, 1)",
// });
// textAnimator
//   .then({
//     animation: "fade-out-up",
//     staggerBy: 100,
//   })
//   .then({
//     animation: "fade.in.left",
//     staggerBy: 100,
//     duration: 1000,
//   });
