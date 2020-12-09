export default class MomoAnimator {
    constructor(el, options) {
        this.el = el;
        this.options = options;
        this.setup();
    }
    setup() {
        this.addIntersectionObserver();
        this.prepForFadeAnimation();
        if (this.options.staggerBy) {
            const offset = this.options.staggerBy;
            this.prepForStagger(offset);
        }
    }
    addIntersectionObserver() {
        //   Observer for all momo elements in parent
        const animate = (entry) => {
            let timer;
            let el = entry.target;
            const animation = el.getAttribute("data-animation");
            if (!animation)
                return; // Exit if no animation is set
            const delay = Number(el.getAttribute("data-animation-delay")) ||
                this.options.delay;
            const duration = Number(el.getAttribute("data-animation-duration")) ||
                this.options.duration;
            timer = setTimeout(() => {
                el.removeAttribute("style");
                clearTimeout(timer);
            }, duration + delay + 100);
            el.style.animation = `momo-${animation} ${this.options.curve} ${duration}ms ${delay}ms forwards`;
        };
        // Animation observer
        this.createObserver(this.el, animate);
    }
    createObserver(elements, closure, options = {}) {
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
    prepForFadeAnimation() {
        var _a;
        if (Array.isArray(this.el)) {
            this.el.forEach((el) => {
                var _a;
                if ((_a = el.getAttribute("data-animation")) === null || _a === void 0 ? void 0 : _a.match(/^fade/g)) {
                    el.style.opacity = "0";
                }
            });
        }
        else {
            if ((_a = this.el.getAttribute("data-animation")) === null || _a === void 0 ? void 0 : _a.match(/^fade/g)) {
                this.el.style.opacity = "0";
            }
        }
    }
    prepForStagger(offset) {
        if (Array.isArray(this.el)) {
            let count = 0;
            for (let el of this.el) {
                if (el.hasAttribute("data-animation-delay"))
                    continue;
                el.setAttribute("data-animation-delay", String(count * offset));
                count++;
            }
        }
    }
}
