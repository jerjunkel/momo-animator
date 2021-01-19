import MomoAnimator from "./MomoAnimator.js";
import MomoElement from "./MomoElement.js";
import { MomoOptions } from "./MomoOptions";

class Momo {
  private _instance: Momo | null = null;
  private _options: MomoOptions = { duration: 1000, delay: 0, curve: "linear" };

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

  setGlobalOptions(options: MomoOptions) {
    const validOptions = this._checkOptions(options);
    this._options.delay = validOptions.delay;
    this._options.duration = validOptions.duration;
    this._options.curve = validOptions.curve;
  }

  getGlobalOptions(): MomoOptions {
    return this._options;
  }

  createAnimatable(selector: string, options?: MomoOptions): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    if (!el.classList.contains("momo"))
      throw Error(`Element with selector ${selector} is missing Momo class`);

    const validOptions =
      options == null ? this._options : this._checkOptions(options!);

    return new MomoAnimator(el, validOptions);
  }

  createAnimatableGroup(selector: string, options?: MomoOptions): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    const momoElements = Array.from(
      el!.querySelectorAll(".momo")
    ) as HTMLElement[];

    let validOptions =
      options == null ? this._options : this._checkOptions(options!);

    if (options?.staggerBy) {
      const staggerBy = options?.staggerBy;
      validOptions = { ...validOptions, staggerBy };
    }

    return new MomoAnimator(momoElements, validOptions);
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

  private _checkOptions(options: MomoOptions): MomoOptions {
    let { duration, delay, curve } = options;
    if (!duration) duration = this._options.duration;
    if (!delay) delay = this._options.delay;
    if (!curve) curve = this._options.curve;

    return { duration, delay, curve };
  }
}

export default new Momo();
