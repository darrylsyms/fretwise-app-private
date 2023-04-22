import React from "react";
import {
    Image,
} from 'react-native';
import Pinchable from 'react-native-pinchable';

const ImageComponent = (props) => {

    const { block } = props;

    return (
            <Pinchable style={{ paddingBottom: 20, paddingTop: 3 }}>
                <Image source={{ uri: block?.content }} style={{ paddingHorizontal: 17, borderRadius: 12, aspectRatio: block.style.width / block.style.height }} resizeMode="contain" />
            </Pinchable>
    )

}

export default ImageComponent;