import MomoAnimator from "./MomoAnimator.js";
import MomoElement from "./MomoElement.js";
import MomoObserver from "./MomoObserver.js";
import { MomoAnimatorOptions, MomoGlobalOptions } from "./MomoOptions.js";
import { MomoElementType } from "./MomoElementType.js";

export default class Momo {
  private _instance: Momo | null = null;
  private _options: MomoGlobalOptions = {
    duration: 1000,
    delay: 0,
    curve: "linear",
    animation: "fade-enter-bottom",
    staggerBy: 100,
    useIntersection: true,
    animatePage: false,
  };
  private _observer: MomoObserver = new MomoObserver();

  constructor() {
    if (!this._instance) {
      this._instance = this;
      Object.freeze(this._instance);
    }
    return this._instance;
  }

  getInstance() {
    return this._instance;
  }

  setGlobalOptions(options: MomoGlobalOptions) {
    const validOptions = this._checkGlobalOptions(options);
    this._options.delay = validOptions.delay;
    this._options.duration = validOptions.duration;
    this._options.curve = validOptions.curve;
    this._options.animatePage = validOptions.animatePage;
    this._options.useIntersection = validOptions.useIntersection;

    if (options.animatePage) {
      const elements = Array.from(document.querySelectorAll(".momo"));
      const momoGroupItems = elements
        .filter((el) => el.classList.contains("group"))
        .forEach((el) => this.createAnimatableGroup(el as HTMLElement));

      const momoItems = elements
        .filter((el) => {
          const parent = el.parentNode as HTMLElement;
          if (
            el.classList.contains("group") ||
            (parent && parent.classList.contains("group"))
          )
            return false;
          return true;
        })
        .forEach((el) => this.createAnimatable(el as HTMLElement));

      // const momoElements = [...momoGroupItems, ...momoItems];

      // momoElements
      //   .map((el) => new MomoAnimator(el))
      //   .forEach((el) => this._observer.add(el));

      // const momoElement = elements.map((element) => {
      //   return new MomoAnimator(
      //     new MomoElement(
      //       element as HTMLElement,
      //       validOptions,
      //       MomoElementType.Item,
      //       Momo.generateUUID()
      //     )
      //   );
      // });
      // momoElement.forEach((el) => this._observer.add(el));
      // console.log(momoElement);
    }
  }

  getGlobalOptions(): MomoGlobalOptions {
    return this._options;
  }

  createAnimatable(
    target: string | HTMLElement,
    options?: MomoAnimatorOptions
  ): MomoAnimator {
    let el;
    if (typeof target == "string") {
      el = document.querySelector(target) as HTMLElement;
      if (!el) throw Error(`No element found with selector ${target}`);
    } else {
      el = target;
    }

    if (!el.classList.contains("momo"))
      throw Error(`Element is missing Momo class`);

    const validOptions =
      options == null ? this._options : this._checkAnimatorOptions(options!);

    const momoAnimator = new MomoAnimator(
      new MomoElement(
        el,
        validOptions,
        MomoElementType.Item,
        Momo.generateUUID()
      )
    );
    this._observer.add(momoAnimator);

    return momoAnimator;
  }

  createAnimatableGroup(
    target: string | HTMLElement,
    options?: MomoAnimatorOptions
  ): MomoAnimator {
    let el;
    if (typeof target == "string") {
      el = document.querySelector(target) as HTMLElement;
      if (!el) throw Error(`No element found with selector ${target}`);
    } else {
      el = target;
    }

    let validOptions =
      options == null ? this._options : this._checkAnimatorOptions(options!);

    if (options?.staggerBy) {
      const staggerBy = options?.staggerBy;
      validOptions = { ...validOptions, staggerBy };
    }

    const momoAnimator = new MomoAnimator(
      new MomoElement(
        el,
        validOptions,
        MomoElementType.Group,
        Momo.generateUUID()
      )
    );
    this._observer.add(momoAnimator);

    return momoAnimator;
  }

  static generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  private _checkGlobalOptions(options: MomoGlobalOptions): MomoGlobalOptions {
    let {
      duration,
      delay,
      curve,
      animation,
      animatePage,
      useIntersection,
      staggerBy,
    } = options;
    if (!duration) duration = this._options.duration;
    if (!delay) delay = this._options.delay;
    if (!animatePage) animatePage = this._options.animatePage;
    if (!useIntersection) useIntersection = this._options.useIntersection;
    if (!curve) curve = this._options.curve;
    if (!staggerBy) staggerBy = this._options.staggerBy;

    return { duration, delay, curve, animation, useIntersection, animatePage };
  }

  private _checkAnimatorOptions(
    options: MomoAnimatorOptions
  ): MomoAnimatorOptions {
    let { duration, delay, curve, animation } = options;
    if (!duration) duration = this._options.duration;
    if (!delay) delay = this._options.delay;
    if (!curve) curve = this._options.curve;

    return { duration, delay, curve, animation };
  }
}
