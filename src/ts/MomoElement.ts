import { MomoAnimatorOptions } from "./MomoOptions";
import { MomoElementType } from "./MomoElementType";

export default class MomoElement {
  private _el: HTMLElement;
  private _options: MomoAnimatorOptions;
  private _type: MomoElementType;
  private _key: string;

  constructor(
    el: HTMLElement,
    options: MomoAnimatorOptions,
    type: MomoElementType,
    key: string
  ) {
    this._el = el;
    this._options = options;
    this._type = type;
    this._key = key;
    this._el.setAttribute("data-momo-id", this._key);
  }

  get element(): HTMLElement {
    return this._el;
  }

  get options(): MomoAnimatorOptions {
    return this._options;
  }

  get type(): MomoElementType {
    return this._type;
  }

  get key(): string {
    return this._key;
  }
}
