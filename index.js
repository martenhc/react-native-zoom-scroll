import React, { Component } from 'react';
import { Image, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Zoomable from './zoomable';
import styles from './styles';

export default class ZoomScroll extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
    };
  }

  _onSetScroll = scrollEnabled => this.setState({ scrollEnabled });

  _onRenderItem = ({ item }) => (
    <Zoomable enableScroll={this._onSetScroll}>
      <Image source={item} style={styles.fullScreen} />
    </Zoomable>
  );

  render() {
    return (
      <View style={[styles.container, styles.fullScreen]}>
        <FlatList
          horizontal
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
