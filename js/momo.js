export default class Momo {
  constructor(selector, options) {
    this.elements = [];
    this.findRootElement = (selector) => {
      const root = document.querySelector(selector);
      if (!root) throw Error(`No element found with the selector ${selector}`);
      return root;
    };
    this.setup = () => {
      this.elements = Array.from(this.root.querySelectorAll(".momo"));
      this.addIntersectionObservers();
    };
    this.root = this.findRootElement(selector);
    this.options = options;
    this.setup();
  }
  addIntersectionObservers() {
    //   Observer for all momo elements in parent
    const animate = (entry) => {
      let timer;
      let el = entry.target;
      const animation = el.getAttribute("data-animation");
      const delay = parseInt(el.getAttribute("data-animation-delay")) || 0;
      const duration =
        parseInt(el.getAttribute("data-animation-duration")) ||
        this.options.duration ||
        2000;
      timer = setTimeout(() => {
        el.removeAttribute("style");
        clearTimeout(timer);
      }, Number(duration) + Number(delay) + 100);
      el.style.animation = `${animation} ${this.options.curve} ${duration}ms ${delay}ms forwards`;
    };
    const fadeElements = this.elements.filter((el) => {
      var _a;
      return (_a = el.getAttribute("data-animation")) === null || _a === void 0
        ? void 0
        : _a.match(/^fade/g);
    });
    const fade = (entry) => {
      const el = entry.target;
      el.style.opacity = "0";
    };
    // Animation observer
    this.createObserver(this.elements, animate);
    // Fade element observer
    this.createObserver(fadeElements, fade, { rootMargin: "20%" });
  }
  createObserver(elements, closure, options = {}) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        closure(entry);
      });
    }, options);
    elements.forEach((el) => {
      observer.observe(el);
    });
  }
}
