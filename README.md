# Momo Animator

## Description

Momo is a simple javascript animation library that animates elements once they are scrolled into view.

## Getting Started

Before using Momo animator, you will need to iniatialize it with your own global `MomoOptions` or use Momo's default properties.

```javascript
// Initalizing with your custom properties
Momo.init({
  duration: 2000,
  curve: "cubic-bezier(0.65, 0, 0.35, 1)",
});

// Using default options
Momo.init();
```

## Usage

### Animating a single element

To animate a single element, pass the selector of the element and use the `animate` function, along with your `MomoOptions`.

```html
<h2 id="fooElement" class="momo" data-animation="fade-in-right">
  Momo is pretty cool
</h2>
```

```js
const fooAnimator = Momo.animate("#fooElement", {
  duration: 2500,
  delay: 1000,
});
```

### Animating a group of elements

To animate a group of elements, pass the parent selector as the first argument and use the `animateGroup` function, along with your your options `MomoOptions`.

```html
<div class="container">
  <h2 class="momo" data-animation="fade-in-up">Momo Animations</h2>
  <p class="momo" data-animation="fade-in-right" data-animation-delay="800">
    Momo is pretty cool
  </p>
</div>
```

```js
const barAnimatorGroup = Momo.animateGroup(".container", {
  duration: 1200,
});
```

## Methods and Classes

### `Momo.init(options)`

Iniatilizes Momo object with global options.

| Name      | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| `options` | object | See options section for more details. |

### `Momo.animate(selector, options)`

Animates a single Momo element.

**Arguments:**
| Name | Type | Description |
| ------- | ------ | ------------------------------------- |
| `selector` | string | The CSS selector used to find the HTML element.|
| `options` | object | See [`MomoOptions`](#momo-options) section for more details. |

**Returns:**
| Type | Description  
| ------ | ------------------------------------- |
| `Momo.MomoAnimator`| The return type is the animator class used to managed all the elements. |

### `Momo.animateGroup(selector, options)`

Animates a group of Momo elements.

**Arguments:**
| Name | Type | Description |
| ------- | ------ | ------------------------------------- |
| `selector` | string | The CSS selector used to find the parent element of whos children needs to be animated.|
| `options` | object | See [`MomoOptions`](#momo-options) section for more details. |

**Returns:**
| Type | Description  
| ------ | ------------------------------------- |
| `Momo.MomoAnimator`| The return type is the animator class used to managed all the elements. |

## Selector

The selector should the parent of the elements that will be animated.

## MomoOptions <a name="momo-options"></a>

These options will be applied to all `momo` elements within the parent selector. For individual use element data attributes

**Arguments:**
| Name | Type | Description |
| ------- | ------ | ------------------------------------- |
| `duration` | number |Duration of animation in milliseconds. .|
| `delay` | number | Delay in ms that will be applied to animation. |
| `curve `| string | The animation timing function. Feel free to use the default ease or a custom bezier path. |

## Data Attributes

Data attributes that can be added to HTML elements.

| Name                 | Type   | Description                                                                     |
| -------------------- | ------ | ------------------------------------------------------------------------------- |
| `animation`          | string | The name of the animation to used on the element. See [Animations](#animations) |
| `animation-duration` | number | Animatiion duration in milliseconds.                                            |
| `animation-delay`    | number | nimaition delay in milliseconds.                                                |

## Animations <a name="animations"></a>

Animations that can be added to an element
|Style | Directions|
|-------| ----------|
|_Fade_| `fade-in`, `fade-in-up`, `fade-in-down`, `fade-in-right`, `fade-in-left`|
|_Slide_| `slide-in`, `slide-in-up`, `slide-in-down`, `slide-in-right`, `slide-in-left`|
