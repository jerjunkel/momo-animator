import LinkedList from "./LinkedList";
export default class MomoAnimator {
    constructor(element) {
        this._children = [];
        this._element = element;
        this._options = new LinkedList(element.options);
        if (element.type == "Group") {
            const parent = this._element.element;
            this._children = Array.from(parent.querySelectorAll(".momo"));
        }
        // Prep for fade
        const startAnimation = this._element.element.getAttribute("data-animation") ||
            this._element.options.animation;
        const fadeRegex = new RegExp(/^fade/g);
        const hasFadeAnimation = fadeRegex.test(startAnimation);
        if (hasFadeAnimation && this._element.type == "Item") {
            this._element.element.style.opacity = "0";
        }
        if (hasFadeAnimation && this._element.type == "Group") {
            this._children.forEach((child) => {
                const animation = child.getAttribute("data-animation");
                if (hasFadeAnimation || fadeRegex.test(animation)) {
                    child.style.opacity = "0";
                }
            });
        }
    }
    get id() {
        return this._element.key;
    }
    get htmlElement() {
        return this._element.element;
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
        const el = this._element.element;
        const animation = option.animation || el.getAttribute("data-animation");
        const duration = option.duration || ((_a = this._options.firstItem) === null || _a === void 0 ? void 0 : _a.duration);
        const delay = option.delay || ((_b = this._options.firstItem) === null || _b === void 0 ? void 0 : _b.delay);
        const curve = option.curve || ((_c = this._options.firstItem) === null || _c === void 0 ? void 0 : _c.curve);
        let childrenAnimationDuration = 0;
        if (this._element.type == "Group" && option.staggerBy) {
            const offset = option.staggerBy;
            childrenAnimationDuration = offset * this._children.length;
            this._children.forEach((child, index) => {
                const childAnimation = child.getAttribute("data-animation") || animation;
                child.style.animation = `momo-${childAnimation} ${curve} ${duration}ms ${offset * index}ms forwards`;
            });
        }
        else {
            el.style.animation = `momo-${animation} ${curve} ${duration}ms ${delay}ms forwards`;
            console.log(el.style.animation);
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            // Clean up code
            this._element.element.style.removeProperty("animation");
            this._element.element.style.removeProperty("opacity");
            this._children.forEach((child) => {
                child.style.removeProperty("animation");
                child.style.removeProperty("opacity");
            });
            this.run();
        }, duration + delay + childrenAnimationDuration + 100);
    }
}
