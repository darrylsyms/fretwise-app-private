import React from 'react';
import {
    Text,
    Platform,
} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { BottomTabBar } from "react-navigation-tabs";
import BadgeIcon from "@src/components/BadgeIcon";
import AppImage from "@src/components/AppImage";
import { isTabletOrIPad } from "@src/utils";
import {
    FontWeights,
    textRTLStyleFix,
} from "@src/styles/global";

const CustomTabBarBottom = (props) => {

    const {
        style,
        safeAreaInset,
        screenProps,
        color,
        navigation,
        inactiveTintColor,
        activeTintColor,
        showLabel
    } = props;

    const getIconUri = (route) => {
        let icon = route?.routes?.[0]?.params?.item?.icon || "";
        if (icon) {
            if (icon.uri) {
                icon = icon.uri;
            } else {
                icon = Platform.select({ ios: icon.ios_uri, android: icon.android_uri });
            }
        }
        return icon;

    }

    const getIcon = (iconProps) => {
        const { route, tintColor, focused } = iconProps;
        const { calcFontSize, colors } = props.screenProps;
        const item = route?.routes?.[0]?.params?.item;

        if (!item) return null;

        const color =
            item.icon.monochrome &&
            (!focused ? item.icon?.tint_color || tintColor : tintColor);

        const icon = getIconUri(route);
        const iconTintColor = !focused ? inactiveTintColor : activeTintColor;

        console.log('iconTintColor', iconTintColor)

        if (item.object === "notifications" || item.object === "messages") {
            return (
                <BadgeIcon
                    calcFontSize={calcFontSize}
                    tintColor={color}
                    bottomTabsBg={colors.bottomTabsBg}
                    warningColor={colors.warningColor}
                    platform="ios"
                    inMore={false}
                    app={"learnerapp"}
                    type={item.object}
                    iconUri={icon ? { uri: icon } : null}
                />
            );
        }

        return <AppImage
            source={{ uri: icon }}
            style={{ width: 25, height: 25, tintColor: tintColor, color: tintColor }}
            tintColor={tintColor} // Doesnt work!
        />

    };

    const currentTab = navigation.state.index;
    const currentTabKey = navigation?.state?.routes[currentTab]?.key;

    const renderLabel = (props) => {
        const label = props.route.routes[0].params.item.label;
        const tabKeys = props.route?.key;

        const isTabActive = tabKeys == currentTabKey;
        const tintColor = !isTabActive ? inactiveTintColor : activeTintColor;

        if (showLabel)
            return (
                <Text
                    style={[
                        screenProps.global.menuLabelStyle,
                        {
                            marginRight: 5,
                            marginTop: isTabletOrIPad() ? -(props.bottomSafeArea / 5) : 2,
                            marginLeft: Platform.isPad ? 25 : 5,
                            color: tintColor,
                            fontWeight: FontWeights["medium"],
                            ...textRTLStyleFix(),
                            opacity: 1,
                            textAlign: "center"
                        }
                    ]}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    allowFontScaling={false}
                >
                    {label}
                </Text>
            );

        return null;

    }

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
