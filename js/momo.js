export default function (el, options) {
  if (typeof el == "object" && options == undefined) {
    options = el;
    el = undefined;
  }

  if (!el) {
    el = document;
  }

  let { speed, curve } = options;
  console.log(options, el);

  //   Check edge cases for speed option
  if (!speed) {
    speed = "2000";
  }

  //   Check edge case for curves
  if (!curve) {
    curve = "ease-in-out";
    // curve = "cubic-bezier(0.65, 0, 0.35, 1)";
  }

  const momoElements = el.querySelectorAll(".momo");
  momoElements.forEach((el) => {
    let timer;
    const animation = el.dataset.animation;
    el.style.animation = `${animation} ${curve} ${speed}ms forwards`;

    timer = setTimeout(() => {
      el.style.animation = "";
      clearTimeout(timer);
    }, parseInt(speed) + 100);
  });
}
