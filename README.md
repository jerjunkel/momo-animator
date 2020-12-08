# Momo Animator

<img src="momo-image.png" style="width: 200px; margin: 0 auto"></img>

## Description

Momo is a simple javascript animation library that animates elements once they are scrolled into view. Named after the flying lemur from [Avatar: The Last Airbender](https://en.wikipedia.org/wiki/Avatar:_The_Last_Airbender)

## Getting Started

### Add Momo using a script tag on your page.

Momo will be added to the `window` namespace as a property named `Momo` and will be accessible on all pages.

```html
<script src="/path/to/momo.js"></script>
```

Before using Momo animator, you will need to iniatialize it with your own global [`MomoOptions`](#momo-options)
or use Momo's default properties. You will only need to do this once.

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

To animate a single element, pass the selector of the element and use the `animate` function, along with your [`MomoOptions`](#momo-options).

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

To animate a group of elements, pass the parent selector as the first argument and use the `animateGroup` function, along with your your options [`MomoOptions`](#momo-options).

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

Iniatilizes Momo object by setting the global animation options. If no optioins are provided, it will use the default options. Calling this method more than once will overwrite the previous settings.

| Name      | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| `options` | object | See [`MomoOptions`](#momo-options) section for more details. |

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

## MomoOptions <a name="momo-options"></a>

An object that encapsulates the animation properties to be used on a momo element.

**Arguments:**
| Name | Type | Description |
| ------- | ------ | ------------------------------------- |
| `duration` | number |Duration of animation in milliseconds. .|
| `delay` | number | Delay in ms that will be applied to animation. |
| `curve `| string | The animation timing function. Feel free to use the default ease or a custom bezier path. |

## Data Attributes

Data attributes that can be added to HTML elements.

| Name                 | Type   | Description                                                                                                   |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| `animation`          | string | The name of the animation to used on the element. This attribute is `required`. See [Animations](#animations) |
| `animation-duration` | number | Animation duration in milliseconds.                                                                           |
| `animation-delay`    | number | Animation delay in milliseconds.                                                                              |

## Animations <a name="animations"></a>

Animations that can be added to an element
|Style | Directions|
|-------| ----------|
|_Fade_ | `fade-in`, `fade-in-up`, `fade-in-down`, `fade-in-right`, `fade-in-left`|
|_Slide_| `slide-in`, `slide-in-up`, `slide-in-down`, `slide-in-right`, `slide-in-left`|
