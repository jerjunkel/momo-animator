export default function (selector, options) {
  if (typeof selector == "object" && options == undefined) {
    options = selector;
    selector = undefined;
  }

  // Root element for momo animations
  let root;

  // Defaults to the body if no selector is passed in options
  if (!selector) {
    root = document.querySelector("body");
  } else {
    // Checks for selector type
    if (typeof selector != "string")
      throw Error("Selector needs to be a string");

    root = document.querySelector(selector);
    if (!root) throw Error(`No element found with the selector '${selector}'`);
  }

  let { duration, curve } = options;
  console.log(options, root);

  // Check edge cases for duration option
  if (!duration) {
    duration = "2000";
  }

  if (isNaN(duration)) {
    throw Error("Duration needs to be an interger value");
  }

  // Check edge case for curves
  if (!curve) {
    curve = "ease-in-out";
  }

  const momoElements = root.querySelectorAll(".momo");
  addIntersectionObserver();
  addFadeIntersection();

  function addIntersectionObserver() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animate(entry.target, { duration, curve });
      });
    }, {});

    momoElements.forEach((el) => {
      observer.observe(el);
    });
  }

  function addFadeIntersection() {
    const momoFadeElements = root.querySelectorAll(`[data-animation^="fade"]`);

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = 0;
        });
      },
      { rootMargin: "20%" }
    );

    momoFadeElements.forEach((el) => {
      observer.observe(el);
    });
  }

  function animate(el) {
    let timer;
    const animation = el.getAttribute("data-animation");
    const delay = parseInt(el.getAttribute("data-animation-delay")) || 0;
    const elDuration =
      parseInt(el.getAttribute("data-animation-duration")) || duration;
    el.style.animation = `${animation} ${curve} ${elDuration}ms ${delay}ms forwards`;

    timer = setTimeout(() => {
      el.style = "";
      clearTimeout(timer);
    }, parseInt(elDuration) + 100 + delay);
  }
}
