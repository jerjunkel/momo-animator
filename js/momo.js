export default function (parent, options) {
  if (typeof parent == "object" && options == undefined) {
    options = parent;
    parent = undefined;
  }

  if (!parent) {
    parent = document;
  }

  let { duration, curve } = options;
  console.log(options, parent);

  //   Check edge cases for duration option
  if (!duration) {
    duration = "2000";
  }

  if (isNaN(duration)) {
    throw Error("Duration needs to be an interger value");
  }

  //   Check edge case for curves
  if (!curve) {
    curve = "ease-in-out";
  }

  const momoElements = parent.querySelectorAll(".momo");
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
    const momoFadeElements = parent.querySelectorAll(
      `[data-animation^="fade"]`
    );

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
