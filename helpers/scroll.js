import { Animated } from 'react-native';

export const limitScrolling = (offset, screenDimension, scale) => {
  let offsetLimit = ((screenDimension * scale - screenDimension) * 0.5) / scale;
  return offset > offsetLimit ? offsetLimit : -offset >= offsetLimit ? -offsetLimit : offset;
};

export const scrollToMiddleIfZoomOut = (scale, lastScale, translateAnimation) => {
  if (scale < lastScale) {
    Animated.timing(translateAnimation, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
};

export const animateZoomedInScrolling = (offsetX, offsetY, translateAnimation) => {
  Animated.timing(translateAnimation, {
    toValue: { x: offsetX, y: offsetY },
    duration: 0,
    useNativeDriver: true,
  }).start();
};
