export default function (el, options = {}) {
  if (typeof el === "object") {
    options = el;
    el = undefined;
  }

  if (!el) {
    el = document;
  }

  const momoElements = el.querySelectorAll(".momo");
  momoElements.forEach((el) => console.log(el.dataset.animation));
}
