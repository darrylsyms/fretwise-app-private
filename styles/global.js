import {
	Platform,
	StatusBar
} from "react-native";
//import { isTabletOrIPad } from "@src/utils";
import { BARHEIGHT } from "@src/styles/global";
import DeviceInfo from 'react-native-device-info';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {getStatusBarHeight} from "react-native-status-bar-height";

export const THEME_COLOR = '#F24B4B'; // TODO - how to get this from globalStyles? It causes minified error..

// * * Foot * * //
export const IOS_HOME_INDICATOR = Platform.OS === 'ios' ? 22 : 0;
export const SAFE_AREA_BOTTOM = Platform.isPad ? IOS_HOME_INDICATOR : ifIphoneX(35, 0);
export const BOTTOM_TAB_BAR_HEIGHT = Platform.OS === 'ios' ? SAFE_AREA_BOTTOM + 49 : 0;
export const PORTAL_TAB_BAR_HEIGHT = SAFE_AREA_BOTTOM + 49;

// * * Head * * //
export const NOTCH = ifIphoneX(0, 25); // This might be better for some androids: const hasNotch = DeviceInfo.hasNotch();
export const HEADER_MAX_HEIGHT_STABLE = 140;
export const HEADER_MIN_HEIGHT_STABLE = 88;
export const IPAD_HEADER_INSET = Platform.isPad ? 17 : 0;
export const HEADER_MAX_HEIGHT = Platform.OS === 'ios'
	? Platform.isPad
		? HEADER_MAX_HEIGHT_STABLE + IPAD_HEADER_INSET - NOTCH
		: ifIphoneX(HEADER_MAX_HEIGHT_STABLE, 105)
	: DeviceInfo.isTablet()
		? 120
		: 112;
export const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(HEADER_MIN_HEIGHT_STABLE, 64) : 56;

const SEARCH_BAR_TOP_PADDING = Platform.select({
  ios: ifIphoneX(10, BARHEIGHT + 10),
  android: 10
});

export const SEARCH_FOCUSED_TOP_SPACING = (HEADER_MAX_HEIGHT_STABLE - 35) - SEARCH_BAR_TOP_PADDING; // untested with different HEADER_MAX_HEIGHT_STABLE value 



// * * Lesson/Topic * * //
export const LESSON_ACTION_BUTTON_HEIGHT = Platform.OS === 'ios'
	? Platform.isPad
		? 75
		: ifIphoneX(70, 50)
	: 60;

export const LESSON_ACTION_BUTTON_TEXT_MARGIN = Platform.OS === 'ios'
	? Platform.isPad
		? 15
		: ifIphoneX(15, 0)
	: 0;

export const LESSON_ACTION_BUTTON_ICON_MARGIN = Platform.OS === 'ios'
	? Platform.isPad
		? 17
		: ifIphoneX(17, 0)
	: 0;