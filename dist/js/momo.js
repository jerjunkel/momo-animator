export default class Momo {
    constructor() {
        throw Error("Use the init method");
    }
    static init(options = { duration: 1000, delay: 0, curve: "linear" }) {
        // Check for option properties
        let { duration, delay, curve } = options;
        if (!duration)
            duration = 1000;
        if (!delay)
            delay = 0;
        if (!curve)
            curve = "linear";
        Momo.options = { curve, duration, delay };
    }
    static animateElement(selector, options) {
        const el = document.querySelector(selector);
        if (!el)
            throw Error(`No element found with selector ${selector}`);
        const validOptions = MomoOptionsChecker.check(options);
        return new MomoAnimator(el, validOptions);
    }
}
class MomoAnimator {
    constructor(el, options) { }
}
class MomoOptionsChecker {
    static check(options) {
        let { duration, delay, curve } = options;
        if (!duration)
            duration = Momo.options.duration;
        if (!delay)
            delay = Momo.options.delay;
        if (!curve)
            curve = Momo.options.curve;
        return { curve, duration, delay };
    }
}
