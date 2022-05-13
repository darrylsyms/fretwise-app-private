import React from 'react';
import { View, Platform } from 'react-native';
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

const SPACING_TOP = FontManager.applyFontHeightAdjustment(NAV_HEIGHT + 17);
const INITIAL_SCROLL = -SPACING_TOP + SEARCH_HEIGHT; // -69

const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

//console.log('SPACING_TOP', SPACING_TOP) = 105
//console.log('SEARCH_HEIGHT', SEARCH_HEIGHT) = 36
//console.log('NAV_HEIGHT', NAV_HEIGHT) = 88
//console.log('BARHEIGHT', BARHEIGHT) = 44

const MoreScreeen = (props) => {

    const showSearch = false;

    const {
        listTopMargin
    } = useSearchTransition(
        showSearch,
        false,
        Platform.select({
            ios: NAV_HEIGHT - 16 - BARHEIGHT,
            android: NAV_HEIGHT - 26 - BARHEIGHT
        })
    );

    const searchContainerPaddingTop = add(listTopMargin, NAV_HEIGHT + 17)

    return <MoreScreen
        screenTitle="More"
        containerPaddingTop={NAV_HEIGHT}
        contentInsetTop={70} // alters tabbar press position? (SPACING_TOP) || WAS 99
        contentOffsetY={-50} // initial pos (INITIAL_SCROLL)
        searchContainerPaddingTop={99} // (searchContainerPaddingTop)
        showSearch={showSearch}
    />
}

MoreScreeen.navigationOptions = { header: null };

export default MoreScreeen;