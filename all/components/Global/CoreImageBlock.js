import React from "react";
import {
    Image,
    Dimensions
} from 'react-native';
import { GUTTER } from "@src/styles/global";
import Pinchable from 'react-native-pinchable';

const ImageComponent = (props) => {

    const { block } = props;
    //const { width } = Dimensions.get("window") - GUTTER;

    return (
            <Pinchable style={{ paddingBottom: 20, paddingTop: 3 }}>
                <Image source={{ uri: block?.content }} style={{ paddingHorizontal: 17, borderRadius: 12, aspectRatio: block.style.width / block.style.height }} resizeMode="contain" />
            </Pinchable>
    )

}

export default ImageComponent;