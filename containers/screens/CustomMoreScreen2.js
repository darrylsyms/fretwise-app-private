import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import { add } from "react-native-reanimated";
import MoreScreen from "@src/containers/Custom/MoreScreen";
import FontManager from "@src/FontManager";
import {
    NAV_HEIGHT, // = 88, same as HEADER_MIN_HEIGHT
    BARHEIGHT
} from "@src/styles/global";
import { SEARCH_HEIGHT } from "@src/components/Search";
import { useSearchTransition } from "@src/components/listUtils";
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '../../styles/global';

const MoreScreeen = (props) => {

    const { navigation, metaMoreScreen } = props;

    const Notificat = metaMoreScreen.data.sections[2].screens[0].routeName

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate(Notificat)}>
                <Text>Hello!</Text>
            </TouchableOpacity>
        </View>
    )
}

MoreScreeen.navigationOptions = { header: null };

export default withNavigation(MoreScreeen);