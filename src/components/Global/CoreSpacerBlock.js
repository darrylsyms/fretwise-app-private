import React from "react";
import { View } from 'react-native';

const SpacerComponent = (props) => {
    const { block } = props;
    const height = block.data.height.replace(/[^0-9]/g,'')

    return <View style={{ height: height / 1.5 }} />
}

export default SpacerComponent;