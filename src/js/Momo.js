import MomoAnimator from "./MomoAnimator.js";
import MomoElement from "./MomoElement.js";
import { MomoElementType } from "./MomoElementType";
class Momo {
    constructor() {
        this._instance = null;
        this._options = { duration: 1000, delay: 0, curve: "linear" };
        if (!this._instance) {
            this._instance = this;
            Object.freeze(this._instance);
        }
        return this._instance;
    }
    getInstance() {
        return this._instance;
    }
    setGlobalOptions(options) {
        const validOptions = this._checkOptions(options);
        this._options.delay = validOptions.delay;
        this._options.duration = validOptions.duration;
        this._options.curve = validOptions.curve;
    }
    getGlobalOptions() {
        return this._options;
    }
    createAnimatable(selector, options) {
        const el = document.querySelector(selector);
        if (!el)
            throw Error(`No element found with selector ${selector}`);
        if (!el.classList.contains("momo"))
            throw Error(`Element with selector ${selector} is missing Momo class`);
        const validOptions = options == null ? this._options : this._checkOptions(options);
        return new MomoAnimator(new MomoElement(el, validOptions, MomoElementType.Item, Momo.generateUUID()));
    }
    createAnimatableGroup(selector, options) {
        const el = document.querySelector(selector);
        if (!el)
            throw Error(`No element found with selector ${selector}`);
        const momoElements = Array.from(el.querySelectorAll(".momo"));
        let validOptions = options == null ? this._options : this._checkOptions(options);
        if (options === null || options === void 0 ? void 0 : options.staggerBy) {
            const staggerBy = options === null || options === void 0 ? void 0 : options.staggerBy;
            validOptions = Object.assign(Object.assign({}, validOptions), { staggerBy });
        }
        return new MomoAnimator(new MomoElement(el, validOptions, MomoElementType.Group, Momo.generateUUID()));
    }
    static generateUUID() {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }
    _checkOptions(options) {
        let { duration, delay, curve } = options;
        if (!duration)
            duration = this._options.duration;
        if (!delay)
            delay = this._options.delay;
        if (!curve)
            curve = this._options.curve;
        return { duration, delay, curve };
    }
}
export default new Momo();
