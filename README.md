# react-native-zoom-scroll

A list of images which can be scrolled, zoomed in and out. When zoomed in, images can be dragged around.
Arrays of 'pins' that will get rendered over each image of the scrolling list can be passed as well.

###### Click on the image for a demo video

[![RNZS demo](https://img.youtube.com/vi/MvV6oZny3HY/0.jpg)](https://www.youtube.com/watch?v=MvV6oZny3HY)

## Usage

`require` the `react-native-zoom-scroll` and use `<ZoomScroll>` tag, passing an array of images as `data` property.

```javascript
import React, { Component } from 'react';
import ZoomScroll from 'react-native-zoom-scroll';

const data = [
  require('./assets/one_thumb.png'),
  require('./assets/two_thumb.png'),
  require('./assets/three_thumb.png'),
  require('./assets/four_thumb.png'),
];

const pins = [
  [
    {
      src: require('./assets/pin1.png'),
      top: 20,
      left: 50,
      inactive: true,
    },
    { src: require('./assets/pin2.png'), top: 200, left: 150 },
  ],
  [{ src: require('./assets/pin3.png'), top: 150, left: 50 }],
];

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <ZoomScroll horizontal data={data} pins={pins} />;
  }
}
```

## Properties

#### `data`

Value: Array of images.

#### `horizontal`

Value: Boolean

#### `pins`

Value: Array containing arrays of objects (pin).
Each array will map to one of the images in the scroll (Array in position 0 to first image and so on).

##### `pin object properties`

`src:` image source.
`top:` Numeric || Value for placing the pin (Y axis)
`left:` Numeric || Value for placing the pin (X axis)
`inactive:` Boolean || If present, the pin will be inactive (gray figure with background)

## What does react-native-zoom-scroll use?

Everything gets rendered inside a FlatList, dragging when images are zoomed in is done with Animated using native drivers for better performace.
Zooming and dragging on each page has been developed using PanResponder.

Dependencies:
prop-types
