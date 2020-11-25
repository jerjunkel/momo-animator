export default class Momo {
    constructor(selector, options) {
        this.elements = [];
        this.findRootElement = (selector) => {
            const root = document.querySelector(selector);
            if (!root)
                throw Error(`No element found with the selector ${selector}`);
            return root;
        };
        this.setup = () => {
            this.elements = Array.from(this.root.querySelectorAll(".momo"));
            this.addAnimationToStyleSheet();
            this.addIntersectionObservers();
            this.hideElementsForFadeAnimation();
        };
        this.root = this.findRootElement(selector);
        this.options = options;
        this.setup();
    }
    addIntersectionObservers() {
        //   Observer for all momo elements in parent
        const animate = (entry) => {
            let timer;
            let el = entry.target;
            const animation = el.getAttribute("data-animation");
            const delay = parseInt(el.getAttribute("data-animation-delay")) || 0;
            const duration = parseInt(el.getAttribute("data-animation-duration")) ||
                this.options.duration ||
                2000;
            timer = setTimeout(() => {
                el.removeAttribute("style");
                clearTimeout(timer);
            }, Number(duration) + Number(delay) + 100);
            el.style.animation = `momo-${animation} ${this.options.curve} ${duration}ms ${delay}ms forwards`;
        };
        // Animation observer
        this.createObserver(this.elements, animate);
    }
    hideElementsForFadeAnimation() {
        this.elements.forEach((el) => {
            var _a;
            if ((_a = el.getAttribute("data-animation")) === null || _a === void 0 ? void 0 : _a.match(/^fade/g)) {
                el.style.opacity = "0";
            }
        });
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
        elements.forEach((el) => {
            observer.observe(el);
        });
    }
    addAnimationToStyleSheet() {
        const style = document.createElement("style");
        style.title = "momo-styles";
        document.head.appendChild(style);
        // insert CSS Rule
        style.innerHTML = `
    @keyframes momo-slide-in-right {
      from {
        transform: translateX(50%);
      }
      to {
        transform: translate(0);
      }
    }
    
    @keyframes momo-slide-in-left {
      from {
        transform: translateX(-50%);
      }
      to {
        transform: translate(0);
      }
    }
    
    @keyframes momo-slide-in-up {
      from {
        transform: translateY(50%);
      }
      to {
        transform: translate(0);
      }
    }
    
    @keyframes momo-slide-in-down {
      from {
        transform: translateY(-50%);
      }
      to {
        transform: translate(0);
      }
    }
    
    @keyframes momo-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes momo-fade-in-right {
      from {
        opacity: 0;
        transform: translateX(50%);
      }
      to {
        opacity: 1;
        transform: translate(0);
      }
    }
    
    @keyframes momo-fade-in-left {
      from {
        opacity: 0;
        transform: translateX(-50%);
      }
      to {
        opacity: 1;
        transform: translate(0);
      }
    }
    
    @keyframes momo-fade-in-up {
      from {
        opacity: 0;
        transform: translateY(50%);
      }
      to {
        opacity: 1;
        transform: translate(0);
      }
    }
    
    @keyframes momo-fade-in-down {
      from {
        opacity: 0;
        transform: translateY(-50%);
      }
      to {
        opacity: 1;
        transform: translate(0);
      }
    }
`;
    }
}
