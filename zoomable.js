import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder, Dimensions } from 'react-native';
import {
  limitScrolling,
  scrollToMiddleIfZoomOut,
  calculatePinchEventHypotenuse,
  animateZoomedInScrolling,
  adjustScaleIfNearMaxOrMin,
} from './helpers';

export default class PinchZoomView extends Component {
  static propTypes = {
    scalable: PropTypes.bool,
    enableScroll: PropTypes.func.isRequired,
    maxScale: PropTypes.number,
    minScale: PropTypes.number,
  };

  static defaultProps = {
    scalable: true,
    minScale: 1,
    maxScale: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      lastScale: 1,
      offsetX: 0,
      offsetY: 0,
      lastX: 0,
      lastY: 0,
      lastMovePinch: false,
      scaleAnim: new Animated.Value(this.props.minScale),
      translateAnim: new Animated.ValueXY(),
    };
    this.distance = 150;
  }

  componentWillMount() {
    this.gestureHandlers = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    });
  }

  // Prenvet shielding click on children elements
  _handleStartShouldSetPanResponder = () => false;

  _handleMoveShouldSetPanResponder = (e, gestureState) =>
    this.props.scalable &&
    (Math.abs(gestureState.dx) > 2 ||
      Math.abs(gestureState.dy) > 2 ||
      gestureState.numberActiveTouches === 2);

  _handlePanResponderGrant = (e, gestureState) => {
    if (gestureState.numberActiveTouches === 2) this.distance = calculatePinchEventHypotenuse(e);
  };

  _handlePanResponderEnd = () => {
    this.setState({
      lastX: this.state.offsetX,
      lastY: this.state.offsetY,
      lastScale: this.state.scale,
    });

    this.props.enableScroll(this.state.scale == this.props.minScale);
  };

  _handlePanResponderMove = (e, gestureState) => {
    if (gestureState.numberActiveTouches === 2) {
      let scale = adjustScaleIfNearMaxOrMin(
        (calculatePinchEventHypotenuse(e) / this.distance) * this.state.lastScale, // Current scale of the movement.
        this.props.maxScale,
        this.props.minScale
      );

      scale >= this.props.minScale &&
        scale <= this.props.maxScale &&
        this.setState({ scale, lastMovePinch: true });

      scrollToMiddleIfZoomOut(scale, this.state.lastScale, this.state.translateAnim);
    }

    if (this.state.scale > this.props.minScale && gestureState.numberActiveTouches === 1) {
      if (this.state.lastMovePinch) gestureState.dx = gestureState.dy = 0;

      let offsetX = limitScrolling(
        this.state.lastX + gestureState.dx / this.state.scale,
        Dimensions.get('screen').width,
        this.state.scale
      );
      let offsetY = limitScrolling(
        this.state.lastY + gestureState.dy / this.state.scale,
        Dimensions.get('screen').height,
        this.state.scale
      );

      this.setState({ offsetX, offsetY, lastMovePinch: false });

      animateZoomedInScrolling(offsetX, offsetY, this.state.translateAnim);
    }
  };

  render() {
    return (
      <Animated.View
        {...this.gestureHandlers.panHandlers}
        style={{
          transform: [
            { scale: this.state.scale },
            { translateX: this.state.translateAnim.x },
            { translateY: this.state.translateAnim.y },
          ],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
