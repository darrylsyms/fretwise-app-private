import React from 'react';
import { Animated, View, TextInput, Image, Keyboard, TouchableWithoutFeedback, Dimensions, Text } from "react-native";
import { withNavigation } from 'react-navigation';
import FontManager from '@src/FontManager';
import { NAV_HEIGHT, DEVICE_WIDTH, GUTTER } from "@src/styles/global";

const HEADER_HEIGHT = FontManager.applyFontHeightAdjustment(NAV_HEIGHT + 76);
const { deviceWidth } = Dimensions.get('window');
const width = deviceWidth - GUTTER;

const Tempo = (props) => {

    const { global, colors, searchTerm, setSearchTerm, inputProps, navigation } = props;

    const customInputProps = {
        ...inputProps,
        placeholder: `Search`
    }

    const Screen = navigation.state.params.item.label


    //* Animation Toggle Functions *//
    const animVal = new Animated.Value(0);

    const toggleOpen = () => {
        Animated.timing(animVal, {
            toValue: 1,
            duration: 300,
        }).start();
        this._open = !this._open;
    };

    const toggleClose = () => {
        Animated.timing(animVal, {
            toValue: 0,
            duration: 300,
        }).start();
        this._open = !this._open;
    };


    //* Interpolations *//
    const interpolateLabel = animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const interpolateBar = animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [width, width - 60],
    });
    const interpolateIcon = animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const animatedTransition = Animated.spring(animVal, { toValue: 1 });
    const clickAnimate = () => {
        animatedTransition.start();
    };



    //* Return Component *//
    if (Screen == "Messages" || Screen == "More") {
        return null;
    } else {
        return (
            <Animated.View
                style={{
                    //flex: 1,
                    alignItems: 'center',
                    marginBottom: 15,
                    flexDirection: 'row',
                    //backgroundColor: "blue",
                    width: interpolateBar,
                }}>
                    <TextInput
                        style={[
                            global.searchBarText,
                            {
                                color: colors.lightSearchColor,
                                height: 40,
                                backgroundColor: colors.lightSearchBg,
                                borderRadius: 12,
                                paddingLeft: 20,
                                paddingRight: 40,
                                //width: '100%',
                            }
                        ]}
                        onChangeText={setSearchTerm}
                        value={searchTerm}
                        placeholderTextColor={colors.searchPlaceholderLightColor}
                        autoCapitalize={"none"}
                        returnKeyType="done"
                        highlightColorAndroid="transparent"
                        autoCorrect={true}
                        autoFocus={false}
                        onFocus={toggleOpen}
                        onSubmitEditing={toggleClose}
                        onBlur={toggleClose}
                        {...customInputProps}
                    />

                <Animated.View style={{
                    transform: [{ scale: interpolateIcon }],
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 30
                }}>
                    <TouchableWithoutFeedback
                        onPress={() => { this.textInput.clear() }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                backgroundColor: colors.mediumWhite,
                                borderRadius: 10,
                                position: 'absolute',
                                marginRight: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{
                                    height: 10,
                                    width: 10,
                                    transform: [{ rotate: "45deg" }]
                                }}
                                source={require("../../assets/img/icons/plus-white.png")}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View
                    style={{
                        width: 60, // must be same as interpolate width
                        alignItems: 'center',
                    }}>
                    <TouchableWithoutFeedback onPress={() => {
                        toggleClose();
                        Keyboard.dismiss
                    }}>
                        <Animated.Text style={{ transform: [{ scale: interpolateLabel }] }}>
                            Cancel
                        </Animated.Text>
                    </TouchableWithoutFeedback>
                </Animated.View>

            </Animated.View>
        )
    }
}

Tempo.navigationOptions = {
    header: null
}

export default withNavigation(Tempo);



// Put this in index.js 
/*
const CustomSearchInputComponent = (props) => { return <Tempo {...props} /> }
externalCodeSetup.searchScreenApiHooks.setSearchInputComponent(CustomSearchInputComponent)
*/