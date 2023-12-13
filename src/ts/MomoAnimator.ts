import { MomoAnimatorOptions } from "./MomoOptions.js";
import { MomoAnimatorState } from "./MomoAnimatorState.js";
import LinkedList from "./LinkedList.js";
import MomoElement from "./MomoElement.js";
import MomoAnimation from "./MomoAnimation.js";

export default class MomoAnimator {
  private _element: MomoElement;
  private _options: LinkedList<MomoAnimatorOptions>;
  private _children: HTMLElement[] = [];
  private _state: MomoAnimatorState = MomoAnimatorState.READY;
  private _animationEnd = () => {
    this.animationPrep();
  };

  constructor(element: MomoElement) {
    this._element = element;
    this._options = new LinkedList<MomoAnimatorOptions>(element.options);

    // Add animation end listener
    if (element.type == "Group") {
      const parent = this.htmlElement;
      this._children = Array.from(parent.querySelectorAll(".momo"));
      this._children[this._children.length - 1].addEventListener(
        "animationend",
        this._animationEnd
      );
    } else {
      this.htmlElement.addEventListener("animationend", this._animationEnd);
    }

    // Prep for fade
    this._element.options.animation =
      this._element.element.getAttribute("data-animation") ||
      this._element.options.animation;

    const animation = new MomoAnimation(element.options);

    // const fadeRegex = new RegExp(/^fade/g);

    // const hasFadeAnimation = fadeRegex.test(startAnimation!);

    if (animation.fades && this._element.type == "Item") {
      this._element.element.style.opacity = "0";
    }

    if (animation.direction) {
      const direction = animation.direction;
      let x = 0,
        y = 0,
        offset = 120;

      this._children.forEach((child) => {
        switch (direction) {
          case "up":
            y = offset;
            break;
          case "down":
            y = 0 - offset;
            break;
          case "left":
            x = offset;
            break;
          case "right":
            x = 0 - offset;
            break;
          default:
            (y = 0), (x = 0);
            break;
        }

        child.style.transform = `translate(${x}%, ${y}%)`;
      });
    }

    if (animation.fades && this._element.type == "Group") {
      this._children.forEach((child) => {
        // const animation = child.getAttribute("data-animation");
        if (animation.fades) {
          child.style.opacity = "0";
        }
      });
    }
  }

  get id(): string {
    return this._element.key;
  }

  get htmlElement(): HTMLElement {
    return this._element.element;
  }

  get state(): MomoAnimatorState {
    return this._state;
  }

  then(options: MomoAnimatorOptions): MomoAnimator {
    this._options.add(options);
    return this;
  }

  animate() {
    this._state = MomoAnimatorState.RUNNING;
    let option = this._options.next();

    if (option == null) {
      this._state = MomoAnimatorState.COMPLETED;
      return;
    }
    const momoAnimation = new MomoAnimation(option);

    const el = this._element.element;
    const animation = el.getAttribute("data-animation") || option.animation;
    const duration = option.duration || this._options.firstItem?.duration;
    const delay = option.delay || this._options.firstItem?.delay;
    const curve = option.curve || this._options.firstItem?.curve;

    // // Prep for fade
    // const fadeRegex = new RegExp(/^fade-in/g);
    // const hasFadeAnimation = fadeRegex.test(this.parseAnimation(animation!));

    if (
      momoAnimation.fades &&
      momoAnimation.isEntering &&
      this._element.type == "Group"
    ) {
      this._children.forEach((child) => {
        child.style.opacity = "0";
      });
    }

    if (
      momoAnimation.fades &&
      momoAnimation.isLeaving &&
      this._element.type == "Group"
    ) {
      this._children.forEach((child) => {
        child.style.opacity = "1";
      });
    }

    if (this._element.type == "Group" && option.staggerBy) {
      const offset = option.staggerBy;

      this._children.forEach((child, index) => {
        const childAnimation =
          child.getAttribute("data-animation") || animation;

        child.style.animation = `momo-${
          momoAnimation.name
        } ${curve} ${duration}ms ${offset * index}ms forwards`;
      });
    } else {
      el.style.animation = `momo-${animation} ${curve} ${duration}ms ${delay}ms forwards`;
      console.log(el.style.animation);
    }
  }

  private animationPrep() {
    this.htmlElement.style.removeProperty("animation");
    this.htmlElement.style.removeProperty("opacity");

    this._children.forEach((child) => {
      child.style.removeProperty("animation");
      child.style.removeProperty("opacity");
      child.style.removeProperty("transform");
    });

    this.animate();
  }
}
