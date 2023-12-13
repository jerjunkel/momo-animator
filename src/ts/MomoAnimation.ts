/**
 *
 */

import { MomoAnimatorOptions } from "./MomoOptions";

export default class MomoAnimation {
  private _type: string;
  private _action: string;
  private _direction: string | undefined;

  constructor(options: MomoAnimatorOptions) {
    let delimiter;
    if (options.animation?.includes("-")) {
      delimiter = "-";
    } else {
      delimiter = ".";
    }

    const animation = options.animation!.split(delimiter);

    if (animation.length < 2 || animation.length > 3) {
      throw Error(
        `There was a problem with the animation: ${options.animation}`
      );
    }

    if (animation.length == 3) {
      this._direction = animation.pop();
    }
    this._type = animation[0];
    this._action = animation[1];
  }

  get type(): string {
    return this._type;
  }

  get action(): string {
    return this._action;
  }

  get direction(): string | undefined {
    return this._direction;
  }

  get name(): string {
    let name = `${this.type}-${this.action}`;
    if (this.direction) name += `-${this.direction}`;
    return name;
  }

  get fades(): boolean {
    return this.type == "fade";
  }

  get slides(): boolean {
    return this.type == "slide";
  }

  get scales(): boolean {
    return this.type == "scale";
  }

  get isLeaving(): boolean {
    return this.action == "out";
  }

  get isEntering(): boolean {
    return this.action == "in";
  }
}

export enum MomoAnimationDirection {
  UP = "up",
  DOWN = "down",
  RIGHT = "right",
  LEFT = "left",
  INPLACE = "",
}
