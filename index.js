import React, { Component } from 'react';
import { Image, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Zoomable from './zoomable';
import styles from './styles';

export default class ZoomScroll extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    horizontal: PropTypes.bool,
    pins: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  };

  static defaultProps = {
    horizontal: false,
    pins: [[]],
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
    };
  }

  _onRenderPins = itemIndex =>
    this.props.pins[itemIndex] &&
    this.props.pins[itemIndex].map((pin, pinIndex) => (
      <View
        style={[
          styles.pin,
          {
            top: pin.top,
            left: pin.left,
          },
        ]}
        key={pinIndex}
      >
        <Image source={pin.src} style={[!pin.active && styles.pinInactive, styles.pinImage]} />
      </View>
    ));

  _onSetScroll = scrollEnabled => this.setState({ scrollEnabled });

  _onRenderItem = ({ item, index }) => (
    <Zoomable enableScroll={this._onSetScroll}>
      <Image source={item} style={styles.fullScreen} />
      {this._onRenderPins(index)}
    </Zoomable>
  );

  render() {
    return (
      <View style={[styles.container, styles.fullScreen]}>
        <FlatList
          horizontal={this.props.horizontal}
          pagingEnabled
          data={this.props.data}
          renderItem={this._onRenderItem}
          keyExtractor={(item, index) => `${index}`}
          scrollEnabled={this.state.scrollEnabled}
        />
      </View>
    );
  }
}
