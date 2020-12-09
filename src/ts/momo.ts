import MomoAnimator from "./MomoAnimator.js";
import { MomoOptions } from "./MomoOptions";

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

  static animate(selector: string, options?: MomoOptions): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    if (!el.classList.contains("momo"))
      throw Error(`Element with selector ${selector} is missing Momo class`);

    const validOptions =
      options == null ? Momo.options : MomoOptionsChecker.check(options!);

    return new MomoAnimator(el, validOptions);
  }

  static animateGroup(selector: string, options?: MomoOptions): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    const momoElements = Array.from(
      el!.querySelectorAll(".momo")
    ) as HTMLElement[];

    let validOptions =
      options == null ? Momo.options : MomoOptionsChecker.check(options!);

    if (options?.staggerBy) {
      const staggerBy = options?.staggerBy;
      validOptions = { ...validOptions, staggerBy };
    }

    return new MomoAnimator(momoElements, validOptions);
  }

  constructor() {
    throw Error("Use the init method");
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
