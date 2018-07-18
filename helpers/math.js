export const calculatePinchEventHypotenuse = event => {
  let dx = Math.abs(event.nativeEvent.touches[0].pageX - event.nativeEvent.touches[1].pageX);
  let dy = Math.abs(event.nativeEvent.touches[0].pageY - event.nativeEvent.touches[1].pageY);
  return Math.sqrt(dx * dx + dy * dy);
};

export const adjustScaleIfNearMaxOrMin = (scale, maxScale, minScale) =>
  scale >= maxScale - 0.1 ? maxScale : scale <= minScale + 0.1 ? minScale : scale;
