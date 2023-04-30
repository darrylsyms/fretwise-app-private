import React from 'react';
import {
    Text,
    Platform,
} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { BottomTabBar } from "react-navigation-tabs";
import Icon from "@src/components/Icon";
import BadgeIcon from "@src/components/BadgeIcon";
import {getIcon as getIconColor, getLabelColor} from "@src/navigators/util";
import {glyphMap as bbIconGlyphMap} from "@src/components/BBIcon";
import { isTabletOrIPad } from "@src/utils";
import {
    FontWeights,
    textRTLStyleFix,
} from "@src/styles/global";

const CustomTabBarBottom = (props) => {

    const {
        navigation,
        activeTintColor,
        inactiveTintColor,
        showLabel,
        screenProps
    } = props;

    const getIcon = iconProps => {
        const {route, tintColor, focused} = iconProps;
        const {calcFontSize, colors} = props.screenProps;
        const item = route?.routes?.[0]?.params?.item;
  
        if (!item) return null;
  
        const {color, menuIcon} = getIconColor(
            item,
            bbIconGlyphMap,
            focused,
            tintColor
        );
  
        if (item.object === "notifications" || item.object === "messages") {
            return (
                <BadgeIcon
                    calcFontSize={calcFontSize}
                    tintColor={color}
                    bottomTabsBg={colors.bottomTabsBg}
                    warningColor={colors.warningColor}
                    foregroundColor={item.icon.fg_color}
                    platform="ios"
                    inMore={false}
                    app={"learnerapp"}
                    type={item.object}
                    icon={menuIcon}
                    styles={{height: 25, width: 25}}
                />
            );
        }
        return (
            <Icon
                icon={menuIcon}
                tintColor={color}
                styles={{height: 25, width: 25}}
            />
        );
    };

    //const currentTab = navigation.state.index;
    //const currentTabKey = navigation?.state?.routes[currentTab]?.key;

    const renderLabel = (labelProps) => {

        const {route} = labelProps;
        if (!showLabel) return null;
  
        const tintColor = getLabelColor(route, navigation, activeTintColor, inactiveTintColor);
  
        const label = labelProps.route.routes[0].params.item.label;
  
        const textStyle = [
            screenProps.global.menuLabelStyle,
            {
                //marginHorizontal: 5,
                marginLeft: isTabletOrIPad() ? 20 : 0,
                marginTop: 2,
                color: tintColor,
                fontWeight: FontWeights["medium"],
                ...textRTLStyleFix(),
                opacity: 1,
                textAlign: "center"
            }
        ];
  
        return (
            <Text
                style={textStyle}
                 numberOfLines={1}
                ellipsizeMode={"tail"}
                allowFontScaling={false}
            >
                {label}
            </Text>
        );
    };

    const renderIcon = (props) => {
        return getIcon(props);
    }

    const handleTabPress = props => ({ route }) => {

        try {
            const { navigation } = props;
            const prevActiveTabIndex = navigation.state.index;
            const isFocused =
                route.key === navigation.state.routes[prevActiveTabIndex].key;

            if (
                isFocused &&
                typeof route.routes[0]?.params?.onTabBarPress === "function"
            ) {
                route.routes[0].params.onTabBarPress();
            }
            if (
                isFocused &&
                typeof route.routes[0]?.params?.scrollToTop === "function"
            ) {
                route.routes[0]?.params?.scrollToTop(); // My custom tabBarOnPress function
            }
        } catch (err) {
        } finally {
            props.onTabPress({ route });
        }

    };

    return Platform.select({
        android: (
            <BottomTabBar
                {...props}
                style={[props.style]}
                getLabelText={renderLabel}
                onTabPress={handleTabPress(props)}
                renderIcon={renderIcon}
            />
        ),
        ios: (
            <BlurView
                style={{
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "absolute",
                    backgroundColor: "transparent"
                }}
                blurType={"xlight"}
                blurAmount={50}
                onLayout={props.handleLayout}
                reducedTransparencyFallbackColor={"#fcfcfc"}
            >
                <BottomTabBar
                    {...props}
                    style={[props.style]}
                    safeAreaInset={{ bottom: props.bottomSafeArea }}
                    onTabPress={handleTabPress(props)}
                    getLabelText={renderLabel}
                    renderIcon={renderIcon}
                />
            </BlurView>
        )
    });

}

export default CustomTabBarBottom;
