import { StyleSheet, Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    width: WIDTH,
    height: HEIGHT,
  },
  pin: {
    position: 'absolute',
    width: HEIGHT / 3,
    height: HEIGHT / 3,
  },
  pinImage: { flex: 1, width: 'auto', height: 'auto' },
  pininactive: {
    tintColor: 'gray',
    opacity: 0.6,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#C0CA33',
    backgroundColor: 'rgba(240, 244, 195, 0.7)',
  },
}));
