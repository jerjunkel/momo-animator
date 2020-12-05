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

  constructor() {
    throw Error("Use the init method");
  }
}
