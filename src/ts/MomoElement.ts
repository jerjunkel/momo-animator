import { MomoOptions } from "./MomoOptions";

export default class MomoElement {
  private _el: HTMLElement;
  private _options: MomoOptions;
  private _type: MomoElementType;
  private _key: String;

  constructor(
    el: HTMLElement,
    options: MomoOptions,
    type: MomoElementType,
    key: String
  ) {
    this._el = el;
    this._options = options;
    this._type = type;
    this._key = key;
  }

  get element(): HTMLElement {
    return this._el;
  }

  get options(): MomoOptions {
    return this._options;
  }

  get type(): MomoElementType {
    return this._type;
  }

  get key(): String {
    return this._key;
  }
}
