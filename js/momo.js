export default function (parent, options) {
  if (typeof parent == "object" && options == undefined) {
    options = parent;
    parent = undefined;
  }

  if (!parent) {
    parent = document;
  }

  let { speed, curve } = options;
  console.log(options, parent);

  //   Check edge cases for speed option
  if (!speed) {
    speed = "2000";
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

        animate(entry.target, { speed, curve });
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
    el.style.animation = `${animation} ${curve} ${speed}ms forwards`;

    timer = setTimeout(() => {
      el.style = "";
      clearTimeout(timer);
    }, parseInt(speed) + 100);
  }
}
