import React from 'react';
import { View, Image } from 'react-native';

const AvatarBadge = () => {
    return (
        <View style={{ position: "absolute", bottom: -1, right: -1, elevation: 3, }}>
            <Image style={{ width: 14, height: 14 }} source={require("../../../assets/img/branding/fw-badge.png")} />
        </View>
    )
}

export default AvatarBadge;