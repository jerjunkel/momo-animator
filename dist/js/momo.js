export default class Momo {
  constructor() {
    throw Error("Use the init method");
  }
  static init(options = { duration: 1000, delay: 0, curve: "linear" }) {
    // Check for option properties
    let { duration, delay, curve } = options;
    if (!duration) duration = 1000;
    if (!delay) delay = 0;
    if (!curve) curve = "linear";
    Momo.options = { curve, duration, delay };
  }
  static animate(selector, options) {
    const el = document.querySelector(selector);
    if (!el) throw Error(`No element found with selector ${selector}`);
    if (!el.classList.contains("momo"))
      throw Error(`Element with selector ${selector} is missing Momo class`);
    const validOptions =
      options == null ? Momo.options : MomoOptionsChecker.check(options);
    return new MomoAnimator(el, validOptions);
  }
  static animateGroup(selector, options) {
    const el = document.querySelector(selector);
    if (!el) throw Error(`No element found with selector ${selector}`);
    const momoElements = Array.from(el.querySelectorAll(".momo"));
    const validOptions =
      options == null ? Momo.options : MomoOptionsChecker.check(options);
    return new MomoAnimator(momoElements, validOptions);
  }
}
class MomoAnimator {
  constructor(el, options) {
    this.el = el;
    this.options = options;
    this.setup();
  }
  setup() {
    this.addIntersectionObserver();
    this.prepForFadeAnimation();
  }
  addIntersectionObserver() {
    //   Observer for all momo elements in parent
    const animate = (entry) => {
      let timer;
      let el = entry.target;
      const animation = el.getAttribute("data-animation");
      if (!animation) return; // Exit if no animation is set
      const delay =
        Number(el.getAttribute("data-animation-delay")) || this.options.delay;
      const duration =
        Number(el.getAttribute("data-animation-duration")) ||
        this.options.duration;
      timer = setTimeout(() => {
        el.removeAttribute("style");
        clearTimeout(timer);
      }, duration + delay + 100);
      el.style.animation = `momo-${animation} ${this.options.curve} ${duration}ms ${delay}ms forwards`;
    };
    // Animation observer
    this.createObserver(this.el, animate);
  }
  createObserver(elements, closure, options = {}) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        closure(entry);
        observer.unobserve(entry.target);
      });
    }, options);
    // Check for more than one element
    if (!Array.isArray(elements)) return observer.observe(elements);
    elements.forEach((el) => {
      observer.observe(el);
    });
  }
  prepForFadeAnimation() {
    var _a;
    if (Array.isArray(this.el)) {
      this.el.forEach((el) => {
        var _a;
        if (
          (_a = el.getAttribute("data-animation")) === null || _a === void 0
            ? void 0
            : _a.match(/^fade/g)
        ) {
          el.style.opacity = "0";
        }
      });
    } else {
      if (
        (_a = this.el.getAttribute("data-animation")) === null || _a === void 0
          ? void 0
          : _a.match(/^fade/g)
      ) {
        this.el.style.opacity = "0";
      }
    }
  }
}
class MomoOptionsChecker {
  static check(options) {
    let { duration, delay, curve } = options;
    if (!duration) duration = Momo.options.duration;
    if (!delay) delay = Momo.options.delay;
    if (!curve) curve = Momo.options.curve;
    return { curve, duration, delay };
  }
}
// Add Momo to window namespace
// (function () {
//   (window as any).momo = Momo;
// })();
