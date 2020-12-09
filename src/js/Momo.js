import MomoAnimator from "./MomoAnimator.js";
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
    static animate(selector, options) {
        const el = document.querySelector(selector);
        if (!el)
            throw Error(`No element found with selector ${selector}`);
        if (!el.classList.contains("momo"))
            throw Error(`Element with selector ${selector} is missing Momo class`);
        const validOptions = options == null ? Momo.options : MomoOptionsChecker.check(options);
        return new MomoAnimator(el, validOptions);
    }
    static animateGroup(selector, options) {
        const el = document.querySelector(selector);
        if (!el)
            throw Error(`No element found with selector ${selector}`);
        const momoElements = Array.from(el.querySelectorAll(".momo"));
        let validOptions = options == null ? Momo.options : MomoOptionsChecker.check(options);
        if (options === null || options === void 0 ? void 0 : options.staggerBy) {
            const staggerBy = options === null || options === void 0 ? void 0 : options.staggerBy;
            validOptions = Object.assign(Object.assign({}, validOptions), { staggerBy });
        }
        return new MomoAnimator(momoElements, validOptions);
    }
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
