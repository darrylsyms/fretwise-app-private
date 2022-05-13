import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
} from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const ImageComponent = (props) => {

    const { block } = props;

    const scale = new Animated.Value(1);

    const onZoomEventFunction = Animated.event(
        [{
            nativeEvent: { scale: scale },
        }],
        {
            useNativeDriver: true,
        }
    );

    const onZoomStateChangeFunction = (event) => {
        if (event.nativeEvent.oldState == State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <PinchGestureHandler
                onGestureEvent={onZoomEventFunction}
                onHandlerStateChange={onZoomStateChangeFunction}
            >
                <Animated.Image source={{ uri: block?.content }} style={{ paddingHorizontal: 17, borderRadius: 12, aspectRatio: block.style.width / block.style.height, transform: [{ scale: scale }] }} resizeMode="contain" />
            </PinchGestureHandler>
        </View>
    )

}

export default ImageComponent;