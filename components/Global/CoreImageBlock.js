import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
} from 'react-native';
import Pinchable from 'react-native-pinchable';
//import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const ImageComponent = (props) => {

    const { block } = props;

    return (
        <View style={{ flex: 1 }}>
            <Pinchable>
                <Animated.Image source={{ uri: block?.content }} style={{ paddingHorizontal: 17, borderRadius: 12 }} resizeMode="contain" />
            </Pinchable>
        </View>
    )

}

export default ImageComponent;