import MomoAnimator from "./MomoAnimator";
export default class MomoObserver {
  private _interectionObserver: IntersectionObserver;
  private _momoElements: Map<string, MomoAnimator> = new Map();

  constructor(options: object = {}) {
    this._interectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const momoID = el.getAttribute("data-momo-id");

          if (!momoID) return;
          const momoElement = this._momoElements.get(momoID);
          momoElement?.run();
          observer.unobserve(entry.target);
        });
      },
      options
    );
  }

  add(el: MomoAnimator) {
    this._momoElements.set(el.id, el);
    this._interectionObserver.observe(el.htmlElement);
  }
}
