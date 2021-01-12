import LinkedList from "./LinkedList";
export default class MomoAnimator {
    constructor(el, options) {
        this._el = el;
        this._options = options;
        Object.freeze(this._el);
        Object.freeze(this._options);
        this._setup();
    }
    getElement() {
        return this._el;
    }
    setOptions(options) { }
    getOptions() {
        return this._options;
    }
    animate() {
        const isAnimatableGroup = Array.isArray(this._el);
        if (isAnimatableGroup) {
            const elements = Array.from(this._el);
            elements.forEach((el) => {
                this._animate(el);
            });
        }
        else {
            const el = this._el;
            // this._animate(el);
        }
    }
    then(options) {
        return new Thenable(this, options);
    }
    _setup() {
        this._addIntersectionObserver();
        this._prepForFadeAnimation();
        if (this._options.staggerBy) {
            const offset = this._options.staggerBy;
            this._prepForStagger(offset);
        }
    }
    _animate(el) {
        var _a;
        let timer;
        const hasFadeAnimation = (_a = el.getAttribute("data-animation")) === null || _a === void 0 ? void 0 : _a.match(/^fade/g);
        const animation = el.getAttribute("data-animation");
        if (!animation)
            return; // Exit if no animation is set
        const delay = Number(el.getAttribute("data-animation-delay")) ||
            this._options.delay;
        const duration = Number(el.getAttribute("data-animation-duration")) ||
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
    _addIntersectionObserver() {
        //   Observer for all momo elements in parent
        const animationObserverCallback = (entry) => {
            const el = entry.target;
            // this._animate(el);
        };
        // Animation observer
        this._createObserver(this._el, animationObserverCallback);
    }
    _createObserver(elements, closure, options = {}) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting)
                    return;
                closure(entry);
                observer.unobserve(entry.target);
            });
        }, options);
        // Check for more than one element
        if (!Array.isArray(elements))
            return observer.observe(elements);
        elements.forEach((el) => {
            observer.observe(el);
        });
    }
    _prepForFadeAnimation() {
        var _a;
        if (Array.isArray(this._el)) {
            this._el.forEach((el) => {
                var _a;
                if ((_a = el.getAttribute("data-animation")) === null || _a === void 0 ? void 0 : _a.match(/^fade/g)) {
                    el.style.opacity = "0";
                }
            });
        }
        else {
            if ((_a = this._el.getAttribute("data-animation")) === null || _a === void 0 ? void 0 : _a.match(/^fade/g)) {
                this._el.style.opacity = "0";
            }
        }
    }
    _prepForStagger(offset) {
        if (Array.isArray(this._el)) {
            let count = 0;
            for (let el of this._el) {
                if (el.hasAttribute("data-animation-delay"))
                    continue;
                el.setAttribute("data-animation-delay", String(count * offset));
                count++;
            }
        }
    }
}
class Thenable {
    constructor(animator, newOptions) {
        this._options = new LinkedList(animator.getOptions());
        this._options.add(newOptions);
        this._el = animator.getElement();
    }
    then(options) {
        this._options.add(options);
        return this;
    }
    run() {
        var _a, _b, _c;
        let option = this._options.next();
        let timer;
        if (option == null)
            return;
        const el = this._el;
        const animation = option.animation || el.getAttribute("data-animation");
        const duration = option.duration || ((_a = this._options.firstItem) === null || _a === void 0 ? void 0 : _a.duration);
        const delay = option.delay || ((_b = this._options.firstItem) === null || _b === void 0 ? void 0 : _b.delay);
        const curve = option.curve || ((_c = this._options.firstItem) === null || _c === void 0 ? void 0 : _c.curve);
        timer = setTimeout(() => {
            el.removeAttribute("style");
            clearTimeout(timer);
            this.run();
        }, duration + delay + 100);
        el.style.animation = `momo-${animation} ${curve} ${duration}ms ${delay}ms forwards`;
        console.log(el.style.animation);
    }
    // TODO: Animate and wait for animation to finish
    _animate(options) {
        let timer;
    }
}
