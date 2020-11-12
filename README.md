# Momo Animator

Momo is a simple javascript animation library that animates elements once they are scrolled into view.

## Usage

A simple use case where an element with the class `container` is the parent for all the elements that needs to be animated.

```html
<div class="container">
  <h2 class="momo" data-animation="fade-in-up">Momo Animations</h2>
  <p class="momo" data-animation="fade-in-right" data-animation-delay="800">
    Momo is pretty cool
  </p>
</div>
```

```js
const momo = new Momo(".container", {
  duration: 2000,
  curve: "cubic-bezier(0.65, 0, 0.35, 1)",
});
```

## API

- `Momo(selector, options)`

## Selector

The selector should the parent of the elements that will be animated

## Options

These options will be applied to all `momo` elements within the parent selector. For individual use element data attributes

- `duration`: Duration of animation in ms (Should be number).
- `curve`: The animation timing function. Feel free to use the default ease or a custom bezier path.
- `delay`: Delay in ms that will be applied to animation.

## Data Attributes

- `animation`: The name of the animation to used on the element.
- `animation-duration`: Animatiion duration in milliseconds.
- `animation-delay`: Animaition delay in milliseconds.

## Animations

- **Fade**: `fade-in`, `fade-in-up`, `fade-in-down`, `fade-in-right`, `fade-in-left`
- **Slide**: `slide-in`, `slide-in-up`, `slide-in-down`, `slide-in-right`, `slide-in-left`
