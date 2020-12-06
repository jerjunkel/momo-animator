type MomoOptions = {
  duration: number;
  delay: number;
  curve: string;
};

export default class Momo {
  static options: MomoOptions;
  static init(
    options: MomoOptions = { duration: 1000, delay: 0, curve: "linear" }
  ) {
    // Check for option properties
    let { duration, delay, curve } = options;

    if (!duration) duration = 1000;
    if (!delay) delay = 0;
    if (!curve) curve = "linear";
    Momo.options = { curve, duration, delay };
  }

  static animateElement(selector: string, options?: MomoOptions): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);

    const validOptions =
      options == null ? Momo.options : MomoOptionsChecker.check(options!);

    return new MomoAnimator(el, validOptions);
  }

  static animateElementsIn(
    selector: string,
    options?: MomoOptions
  ): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    const momoElements = Array.from(
      el!.querySelectorAll(".momo")
    ) as HTMLElement[];

    const validOptions =
      options == null ? Momo.options : MomoOptionsChecker.check(options!);

    return new MomoAnimator(momoElements, validOptions);
  }

  constructor() {
    throw Error("Use the init method");
  }
}

class MomoAnimator {
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

class MomoOptionsChecker {
  static check(options: MomoOptions): MomoOptions {
    let { duration, delay, curve } = options;
    if (!duration) duration = Momo.options.duration;
    if (!delay) delay = Momo.options.delay;
    if (!curve) curve = Momo.options.curve;

    return { curve, duration, delay };
  }
}
