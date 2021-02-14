import MomoAnimator from "./MomoAnimator.js";
import MomoElement from "./MomoElement.js";
import MomoObserver from "./MomoObserver.js";
import { MomoAnimatorOptions, MomoGlobalOptions } from "./MomoOptions";
import { MomoElementType } from "./MomoElementType";

class Momo {
  private _instance: Momo | null = null;
  private _options: MomoGlobalOptions = {
    duration: 1000,
    delay: 0,
    curve: "linear",
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
      const momoElement = elements.map((element) => {
        return new MomoAnimator(
          new MomoElement(
            element as HTMLElement,
            validOptions,
            MomoElementType.Item,
            Momo.generateUUID()
          )
        );
      });
      momoElement.forEach((el) => this._observer.add(el));
      console.log(momoElement);
    }
  }

  getGlobalOptions(): MomoGlobalOptions {
    return this._options;
  }

  createAnimatable(
    selector: string,
    options?: MomoAnimatorOptions
  ): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    if (!el.classList.contains("momo"))
      throw Error(`Element with selector ${selector} is missing Momo class`);

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
    selector: string,
    options?: MomoAnimatorOptions
  ): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    const momoElements = Array.from(
      el!.querySelectorAll(".momo")
    ) as HTMLElement[];

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
    } = options;
    if (!duration) duration = this._options.duration;
    if (!delay) delay = this._options.delay;
    if (!animatePage) animatePage = this._options.animatePage;
    if (!useIntersection) useIntersection = this._options.useIntersection;
    if (!curve) curve = this._options.curve;

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

export default new Momo();
