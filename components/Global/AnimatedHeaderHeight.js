import {Platform} from 'react-native';
import { IPAD_HEADER_INSET, HEADER_MAX_HEIGHT_STABLE, HEADER_MIN_HEIGHT_STABLE, NOTCH } from '../../styles/global';
import DeviceInfo from 'react-native-device-info';

const IndexScreenHeaderHeight = (defaultHeaderHeight, filterType, navigation) => {

    const SEARCH_COMPONENT = Platform.OS === 'ios' ? 51 : 55; // it appears that the search component on android is sized differently
    const FILTER_BAR = 60;
    const COUNTDOWN_COMPONENT = DeviceInfo.isTablet() && !Platform.isPad ? 87 : 81; // strange how it's different on tablet.

    if (filterType === "courseCategories") {
        return HEADER_MAX_HEIGHT_STABLE + FILTER_BAR - NOTCH + IPAD_HEADER_INSET
    }
    if (filterType === "topics" && navigation?.state?.routeName !== "ProfileForums") {
        return HEADER_MAX_HEIGHT_STABLE + FILTER_BAR + SEARCH_COMPONENT - NOTCH + IPAD_HEADER_INSET
    }
    if (filterType === "topics" && navigation?.state?.routeName == "ProfileForums") {
        return HEADER_MIN_HEIGHT_STABLE + FILTER_BAR - NOTCH + IPAD_HEADER_INSET
    }
    if (filterType === "blog") {
        return HEADER_MAX_HEIGHT_STABLE + COUNTDOWN_COMPONENT - NOTCH + IPAD_HEADER_INSET
    }
    if (filterType === "courses" && navigation?.state?.routeName !== "ProfileCourses") {
        return HEADER_MAX_HEIGHT_STABLE + SEARCH_COMPONENT + FILTER_BAR - NOTCH + IPAD_HEADER_INSET
    }
    if (filterType === "groups") {
        return HEADER_MAX_HEIGHT_STABLE + SEARCH_COMPONENT - NOTCH + IPAD_HEADER_INSET
    }
    if (filterType === "documents") {
        return HEADER_MIN_HEIGHT_STABLE + SEARCH_COMPONENT - NOTCH + IPAD_HEADER_INSET
    }
    if (navigation?.state?.routeName === "GroupMembers") {
        return 0 // hides search component
    }
    if (navigation?.state?.routeName === "GroupActivity") {
        return HEADER_MIN_HEIGHT_STABLE + SEARCH_COMPONENT - IPAD_HEADER_INSET
    }
    if (navigation?.state?.routeName === "ProfileCourses") {
        return HEADER_MIN_HEIGHT_STABLE + SEARCH_COMPONENT + FILTER_BAR - NOTCH + IPAD_HEADER_INSET
    }

    return HEADER_MAX_HEIGHT_STABLE + IPAD_HEADER_INSET;
}

export default IndexScreenHeaderHeight;