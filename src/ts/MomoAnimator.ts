import { MomoOptions } from "./MomoOptions";

export default class MomoAnimator {
  private el: HTMLElement | HTMLElement[];
  private options: MomoOptions;

  constructor(el: HTMLElement | HTMLElement[], options: MomoOptions) {
    this.el = el;
    this.options = options;
    this.setup();
  }

  private setup() {
    this.addIntersectionObserver();
    this.prepForFadeAnimation();
  }

  private addIntersectionObserver() {
    //   Observer for all momo elements in parent
    const animate = (entry: IntersectionObserverEntry) => {
      let timer: number;
      let el = entry.target as HTMLElement;
      const animation = el.getAttribute("data-animation");
      if (!animation) return; // Exit if no animation is set
      const delay =
        Number(el.getAttribute("data-animation-delay") as string) ||
        this.options.delay;
      const duration =
        Number(el.getAttribute("data-animation-duration") as string) ||
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

  private createObserver(
    elements: HTMLElement | HTMLElement[],
    closure: (entry: IntersectionObserverEntry) => void,
    options: object = {}
  ) {
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

  private prepForFadeAnimation() {
    if (Array.isArray(this.el)) {
      this.el.forEach((el) => {
        if (el.getAttribute("data-animation")?.match(/^fade/g)) {
          el.style.opacity = "0";
        }
      });
    } else {
      if (this.el.getAttribute("data-animation")?.match(/^fade/g)) {
        this.el.style.opacity = "0";
      }
    }
  }
}
