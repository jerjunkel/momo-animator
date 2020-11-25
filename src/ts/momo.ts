type MomoOptions = {
  duration: number;
  delay: number;
  curve: string;
};

export default class Momo {
  private root: HTMLElement;
  private options: MomoOptions;
  private elements: HTMLElement[] = [];

  constructor(selector: string, options: MomoOptions) {
    this.root = this.findRootElement(selector);
    this.options = options;
    this.setup();
  }

  private findRootElement = (selector: string): HTMLElement => {
    const root = document.querySelector(selector);

    if (!root) throw Error(`No element found with the selector ${selector}`);
    return root as HTMLElement;
  };

  private setup = () => {
    this.elements = Array.from(this.root.querySelectorAll(".momo"));
    this.addAnimationToStyleSheet();
    this.addIntersectionObservers();
    this.hideElementsForFadeAnimation();
  };

  private addIntersectionObservers() {
    //   Observer for all momo elements in parent
    const animate = (entry: IntersectionObserverEntry) => {
      let timer: number;
      let el = entry.target as HTMLElement;
      const animation = el.getAttribute("data-animation");
      const delay: number =
        parseInt(el.getAttribute("data-animation-delay") as string) || 0;
      const duration: number =
        parseInt(el.getAttribute("data-animation-duration") as string) ||
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

  private hideElementsForFadeAnimation() {
    this.elements.forEach((el) => {
      if (el.getAttribute("data-animation")?.match(/^fade/g)) {
        el.style.opacity = "0";
      }
    });
  }

  private createObserver(
    elements: HTMLElement[],
    closure: (entry: IntersectionObserverEntry) => void,
    options: object = {}
  ) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        closure(entry);
        observer.unobserve(entry.target);
      });
    }, options);

    elements.forEach((el) => {
      observer.observe(el);
    });
  }

  private addAnimationToStyleSheet() {
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
