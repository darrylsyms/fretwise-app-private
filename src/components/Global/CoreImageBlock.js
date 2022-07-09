import React from "react";
import {
    Image,
} from 'react-native';
import Pinchable from 'react-native-pinchable';

const ImageComponent = (props) => {

    const { block } = props;

    return (
            <Pinchable style={{ flex: 1 }}>
                <Image source={{ uri: block?.content }} style={{ paddingHorizontal: 17, borderRadius: 12, aspectRatio: block.style.width / block.style.height }} resizeMode="contain" />
            </Pinchable>
    )

}

export default ImageComponent;