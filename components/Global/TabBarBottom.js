import React from 'react';
import { BottomTabBar } from "react-navigation-tabs";
import {
    Image,
    View,
    StyleSheet,
    Text,
    Platform,
} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { IOS_HOME_INDICATOR } from '../../styles/global';

const CustomTabBarBottom = (props) => {

    const {
        style,
        safeAreaInset,
        screenProps,
        navigation,
        inactiveTintColor,
        activeTintColor,
        showLabel
    } = props;

    const { global, colors } = screenProps;

    const currentTab = navigation.state.index;
    const currentTabKey = navigation?.state?.routes[currentTab]?.key


    const renderLabel = (props) => {

        const label = props.route?.routes[0]?.params?.item?.label;
        const tabKeys = props.route?.key;

        const isTabActive = tabKeys == currentTabKey;
        const tintColor = !isTabActive ? inactiveTintColor : activeTintColor;

        if (showLabel)
            return (
                <Text style={[
                    global.tabBarText,
                    {
                        color: tintColor,
                        marginLeft: Platform.isPad ? 20 : 0
                    }
                ]}>
                    {label}
                </Text>
            );

        return null;
    }


    const renderIcon = (props) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: props.route?.routes[0]?.params?.item?.icon?.uri }}
                    //{routeName === "MoreScreen" && source={require('../../assets/img/tabbar/more.png')}} // TODO: if using my own MoreScreen, I can't utilise the icon or label props until there's better hooks available.
                    style={[styles.icon, { tintColor: props.tintColor }]}
                />
            </View>
        )

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

    const styles = StyleSheet.create({
        icon: {
            width: 25,
            height: 25,
        },
        label: {
            fontSize: 11,
        },
    });

    const blurViewStyles = {
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        backgroundColor: "transparent"
    };

    // BlurView is necessary to hide "tabbar on tabbar" iOS bug. It has zero contribution to the look.
    return (
        <>
            {Platform.OS === 'ios' ? (
                <BlurView
                    style={blurViewStyles}
                    blurType={"xlight"}
                    blurAmount={0}
                    reducedTransparencyFallbackColor={"#fff"}
                >
                    <BottomTabBar
                        {...props}
                        style={[
                            //style,
                            {
                                borderTopWidth: 1,
                                ...global.topBorder,
                                backgroundColor: colors.bottomTabsBg,
                            }
                        ]}
                        safeAreaInset={{ bottom: Platform.isPad ? IOS_HOME_INDICATOR : safeAreaInset }}
                        onTabPress={handleTabPress(props)}
                        getLabelText={renderLabel}
                        renderIcon={renderIcon}
                    />
                </BlurView>
            ) : (
                <BottomTabBar
                    {...props}
                    style={[
                        style,
                        {
                            //height: 60,
                            borderTopWidth: 1,
                            ...global.topBorder,
                            backgroundColor: colors.bottomTabsBg,
                        }
                    ]}
                    safeAreaInset={{ bottom: safeAreaInset }}
                    onTabPress={handleTabPress(props)}
                    getLabelText={renderLabel}
                    renderIcon={renderIcon}
                />
            )}

        </>
    )

}

export default CustomTabBarBottom;
