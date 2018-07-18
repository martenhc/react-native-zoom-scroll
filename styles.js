import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreen: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
});