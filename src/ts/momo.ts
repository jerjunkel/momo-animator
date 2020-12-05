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

  static animateElement(selector: string, options: MomoOptions): MomoAnimator {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) throw Error(`No element found with selector ${selector}`);
    const validOptions = MomoOptionsChecker.check(options);
    return new MomoAnimator(el, validOptions);
  }

  constructor() {
    throw Error("Use the init method");
  }
}

class MomoAnimator {
  constructor(el: HTMLElement | [HTMLElement], options: MomoOptions) {}
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
