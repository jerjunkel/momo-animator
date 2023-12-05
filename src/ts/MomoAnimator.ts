import { MomoAnimatorOptions } from "./MomoOptions";
import { MomoAnimatorState } from "./MomoAnimatorState";
import LinkedList from "./LinkedList";
import MomoElement from "./MomoElement";

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
    const startAnimation =
      this._element.element.getAttribute("data-animation") ||
      this._element.options.animation;

    const fadeRegex = new RegExp(/^fade/g);

    const hasFadeAnimation = fadeRegex.test(startAnimation!);

    if (hasFadeAnimation && this._element.type == "Item") {
      this._element.element.style.opacity = "0";
    }

    if (hasFadeAnimation && this._element.type == "Group") {
      this._children.forEach((child) => {
        const animation = child.getAttribute("data-animation");
        if (hasFadeAnimation || fadeRegex.test(animation!)) {
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

    const el = this._element.element;
    const animation = el.getAttribute("data-animation") || option.animation;
    const duration = option.duration || this._options.firstItem?.duration;
    const delay = option.delay || this._options.firstItem?.delay;
    const curve = option.curve || this._options.firstItem?.curve;

    // Prep for fade
    const fadeRegex = new RegExp(/^fade-in/g);
    const hasFadeAnimation = fadeRegex.test(this.parseAnimation(animation!));

    if (hasFadeAnimation && this._element.type == "Group") {
      this._children.forEach((child) => {
        child.style.opacity = "0";
      });
    }

    if (this._element.type == "Group" && option.staggerBy) {
      const offset = option.staggerBy;

      this._children.forEach((child, index) => {
        const childAnimation =
          child.getAttribute("data-animation") || animation;
        const parsedAnimation = this.parseAnimation(childAnimation!);
        console.log(parsedAnimation);

        child.style.animation = `momo-${parsedAnimation} ${curve} ${duration}ms ${
          offset * index
        }ms forwards`;
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
    });

    this.animate();
  }

  private parseAnimation(animation: string): string {
    return animation.split(".").join("-");
  }
}
