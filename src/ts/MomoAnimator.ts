import { MomoOptions } from "./MomoOptions";
import LinkedList from "./LinkedList";

export default class MomoAnimator {
  private _el: HTMLElement | HTMLElement[];
  private _options: MomoOptions;

  constructor(el: HTMLElement | HTMLElement[], options: MomoOptions) {
    this._el = el;
    this._options = options;
    Object.freeze(this._el);
    Object.freeze(this._options);
    this._setup();
  }

  getElement(): HTMLElement | HTMLElement[] {
    return this._el;
  }

  setOptions(options: MomoOptions) {}

  getOptions(): MomoOptions {
    return this._options;
  }

  animate() {
    const isAnimatableGroup = Array.isArray(this._el);

    if (isAnimatableGroup) {
      const elements = Array.from(this._el as HTMLElement[]);
      elements.forEach((el) => {
        this._animate(el);
      });
    } else {
      const el = this._el as HTMLElement;
      // this._animate(el);
    }
  }

  then(options: MomoOptions): Thenable {
    return new Thenable(this, options);
  }

  private _setup() {
    this._addIntersectionObserver();
    this._prepForFadeAnimation();
    if (this._options.staggerBy) {
      const offset = this._options.staggerBy;
      this._prepForStagger(offset);
    }
  }

  private _animate(el: HTMLElement) {
    let timer: any;
    const hasFadeAnimation = el.getAttribute("data-animation")?.match(/^fade/g);
    const animation = el.getAttribute("data-animation");
    if (!animation) return; // Exit if no animation is set
    const delay =
      Number(el.getAttribute("data-animation-delay") as string) ||
      this._options.delay;
    const duration =
      Number(el.getAttribute("data-animation-duration") as string) ||
      this._options.duration;

    if (hasFadeAnimation) {
      el.style.opacity = "0";
    }

    timer = setTimeout(() => {
      el.removeAttribute("style");
      clearTimeout(timer);
    }, duration + delay + 100);

    el.style.animation = `momo-${animation} ${this._options.curve} ${duration}ms ${delay}ms forwards`;
  }

  private _addIntersectionObserver() {
    //   Observer for all momo elements in parent
    const animationObserverCallback = (entry: IntersectionObserverEntry) => {
      const el = entry.target as HTMLElement;
      // this._animate(el);
    };

    // Animation observer
    this._createObserver(this._el, animationObserverCallback);
  }

  private _createObserver(
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

  private _prepForFadeAnimation() {
    if (Array.isArray(this._el)) {
      this._el.forEach((el) => {
        if (el.getAttribute("data-animation")?.match(/^fade/g)) {
          el.style.opacity = "0";
        }
      });
    } else {
      if (this._el.getAttribute("data-animation")?.match(/^fade/g)) {
        this._el.style.opacity = "0";
      }
    }
  }

  private _prepForStagger(offset: number) {
    if (Array.isArray(this._el)) {
      let count = 0;

      for (let el of this._el) {
        if (el.hasAttribute("data-animation-delay")) continue;
        el.setAttribute("data-animation-delay", String(count * offset));
        count++;
      }
    }
  }
}

class Thenable {
  private _options: LinkedList<MomoOptions>;
  private _el: HTMLElement | HTMLElement[];
  constructor(animator: MomoAnimator, newOptions: MomoOptions) {
    this._options = new LinkedList<MomoOptions>(animator.getOptions());
    this._options.add(newOptions);
    this._el = animator.getElement();
  }

  then(options: MomoOptions): Thenable {
    this._options.add(options);
    return this;
  }

  run() {
    let option = this._options.next();
    let timer: any;

    if (option == null) return;

    const el = this._el as HTMLElement;

    const animation = option.animation || el.getAttribute("data-animation");
    const duration = option.duration || this._options.firstItem?.duration;
    const delay = option.delay || this._options.firstItem?.delay;
    const curve = option.curve || this._options.firstItem?.curve;

    timer = setTimeout(() => {
      el.removeAttribute("style");
      clearTimeout(timer);
      this.run();
    }, duration! + delay! + 100);

    el.style.animation = `momo-${animation} ${curve} ${duration}ms ${delay}ms forwards`;
    console.log(el.style.animation);
  }
  // TODO: Animate and wait for animation to finish
  private _animate(options: MomoOptions) {
    let timer: any;
  }
}
