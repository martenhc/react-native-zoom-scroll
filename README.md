# react-native-zoom-scroll

A scrolling list of zoomable images for React Native. While zoomed in, images can be scrolled.

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

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <ZoomScroll data={data} />
      </Provider>
    );
  }
}
```

## Properties

#### `data`

Value: Array of images.

In some cases, you may want to disable the pinch-zoom behaviour, just set `scalable={false}` on the component. The default value is `true`.
