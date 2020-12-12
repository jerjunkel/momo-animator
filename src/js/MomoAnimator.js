export default class MomoAnimator {
    constructor(el, options) {
        this._el = el;
        this._options = options;
        Object.freeze(this._el);
        Object.freeze(this._options);
        this._setup();
    }
    setOptions(options) { }
    getOptions() {
        return this._options;
    }
    animate() { }
    _setup() {
        this._addIntersectionObserver();
        this._prepForFadeAnimation();
        if (this._options.staggerBy) {
            const offset = this._options.staggerBy;
            this._prepForStagger(offset);
        }
    }
    _addIntersectionObserver() {
        //   Observer for all momo elements in parent
        const animate = (entry) => {
            let timer;
            let el = entry.target;
            const animation = el.getAttribute("data-animation");
            if (!animation)
                return; // Exit if no animation is set
            const delay = Number(el.getAttribute("data-animation-delay")) ||
                this._options.delay;
            const duration = Number(el.getAttribute("data-animation-duration")) ||
                this._options.duration;
            timer = setTimeout(() => {
                el.removeAttribute("style");
                clearTimeout(timer);
            }, duration + delay + 100);
            el.style.animation = `momo-${animation} ${this._options.curve} ${duration}ms ${delay}ms forwards`;
        };
        // Animation observer
        this._createObserver(this._el, animate);
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
