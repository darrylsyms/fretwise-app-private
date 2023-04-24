import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Animated,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import { NavigationActions, withNavigation } from "react-navigation";
import { globalStyle, DEVICE_WIDTH, GUTTER } from "@src/styles/global";
import { connect, useSelector } from "react-redux";
import { Portal } from 'react-native-portalize';
import { saveForums } from "../../../state/actions/forums";
import { getForums } from "../../../services/Forums.service";
import { BOTTOM_TAB_BAR_HEIGHT, PORTAL_TAB_BAR_HEIGHT } from "../../../styles/global";

const Component = (props) => {

    /*-----------------------------------------------------------------------------------*/
    /* Fetch and structure data */
    /*-----------------------------------------------------------------------------------*/

    const state = useSelector((state) => state);
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    const forumsCachebyId = state.forumsCache.byId;
    const topicCachebyId = state.topicCache.byId;

    const forumsArray = forumsCachebyId.toArray().sort(function (a, b) {
        return a.menu_order - b.menu_order; // Order the forums according to their set menu_order
    });

    const forumStateMissing = forumsArray.length == 0;
    const topicStateMissing = topicCachebyId.toArray().length == 0;

    useEffect(() => {
        async function fetchAllForums() {
            const response = await getForums(props.config);
            props.dispatch(saveForums(response));
        }
        fetchAllForums();
    }, [])


    /*-----------------------------------------------------------------------------------*/
    /* Animated events */
    /*-----------------------------------------------------------------------------------*/

    const [isOpen, setIsOpen] = useState(false)
    const animState = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animState, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen, animState])

    const toggleOpen = () => {
        setIsOpen(prev => !prev)
    };

    const ActionButtonScale = {
        transform: [{
            scale: animState.interpolate({
                inputRange: [0, 0.0001, 1],
                outputRange: [0, 1, 1],
            })
        }]
    };
    const ActionButtonIconRotate = {
        transform: [{
            rotate: animState.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "-45deg"],
            })
        }]
    };
    const labelStyle = {
        opacity: animState.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: [0, 0, 1],
        }),
        transform: [{
            translateX: animState.interpolate({
                inputRange: [0, 0.9, 1],
                outputRange: [-30, -200, -280],
            })
        }]
    };
    const bgStyle = {
        opacity: animState.interpolate({
            inputRange: [0, 0.1, 1],
            outputRange: [0, 1, 1],
        }),
        transform: [{
            scale: animState.interpolate({
                inputRange: [0, 1],
                outputRange: [0, DEVICE_WIDTH / 10],
            })
        }]
    };


    /*-----------------------------------------------------------------------------------*/
    /* Forums list component */
    /*-----------------------------------------------------------------------------------*/

    const addTopic = (forumId) => {
        const ForumObject = state.forumsCache.byId.get(forumId ? forumId.toString() : "");

        const ForumData = {
            id: ForumObject.id,
            title: {
                raw: ForumObject.title.rendered
            },
        }

        props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: "AddTopicScreen",
                params: {
                    action: "newForum",
                    from: "forum",
                    forum: ForumData
                }
            })
        )
    }

    const RenderItems = () => {
        // 21025198 is the News & Announcements Forum. We do not want to show this in the list.
        return forumsArray.filter(key => ![21025198].includes(key.id)).map((forum, i) => {

            const Position = (i + 1) * 70;
            const Opacity = 180 / (180 + Position);

            // setTimeout isn't necessary but it makes the transition much more interactive/smoother
            const Navi = () => {
                setTimeout(() => { addTopic(forum.id) }, 330)
            }

            return (
                <View key={forum.id}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            toggleOpen();
                            Navi();
                        }}>
                        <Animated.View style={[styles.item,
                        {
                            transform: [
                                {
                                    translateY: animState.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [180, -Position],
                                    })
                                },
                            ],
                            opacity: animState.interpolate({
                                inputRange: [0, Opacity, 1],
                                outputRange: [0, 0, 1],
                            })

                        }
                        ]}>
                            <Animated.Text style={[global.semiboldText, styles.label, labelStyle]}>{forum.title.rendered}</Animated.Text>
                            <Image source={{ uri: forum.featured_media.thumb }} style={styles.image} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            )
        })
    }


    /*-----------------------------------------------------------------------------------*/
    /* Final component */
    /*-----------------------------------------------------------------------------------*/

    return (
        <>
            {forumStateMissing || topicStateMissing ? (
                <View style={styles.container}>
                    <Animated.View style={[
                        styles.button,
                        {
                            backgroundColor: colors.headerBg,
                            opacity: 0.3
                        }
                    ]}>
                        <Image style={styles.icon} source={require("../../../assets/img/icons/plus-white.png")} />
                    </Animated.View>
                </View>
            ) : (
                <View style={styles.container}>


                    <TouchableWithoutFeedback
                        onPress={() => {
                            toggleOpen();
                        }}>
                        <Animated.View style={[styles.button, { backgroundColor: colors.headerBg }]}>
                            <Image style={styles.icon} source={require("../../../assets/img/icons/plus-white.png")} />
                        </Animated.View>
                    </TouchableWithoutFeedback>


                    <Portal>
                        <TouchableWithoutFeedback
                            style={[styles.backgroundTouchable]}
                            onPress={() => {
                                toggleOpen();
                            }}>
                            <Animated.View style={[
                                styles.background,
                                bgStyle
                            ]} />
                        </TouchableWithoutFeedback>

                        <View style={[styles.forumListContainer]}>
                            <RenderItems />
                        </View>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                toggleOpen();
                            }}>
                            <Animated.View style={[
                                styles.buttonInPortal,
                                styles.buttonPressedBg,
                                ActionButtonScale,
                            ]}>
                                <Animated.Image style={[styles.icon, ActionButtonIconRotate]} source={require("../../../assets/img/icons/plus-white.png")} />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </Portal>


                </View>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});

const ActionButton = withNavigation(Component)

export default connect(mapStateToProps)(ActionButton);

const ActionButtonDefaultStyle = {
    position: "absolute",
    width: 55,
    height: 55,
    bottom: BOTTOM_TAB_BAR_HEIGHT + 12,
    right: 12,
    borderRadius: 30,
}

const PortalActionButtonDefaultStyle = {
    position: "absolute",
    width: 55,
    height: 55,
    bottom: PORTAL_TAB_BAR_HEIGHT + 12,
    right: 12,
    borderRadius: 30,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
    },
    icon: {
        width: 18,
        height: 18,
        borderRadius: 30,
    },
    background: {
        ...PortalActionButtonDefaultStyle,
        backgroundColor: "rgba(0,0,0,.8)"
    },
    backgroundTouchable: {
        ...PortalActionButtonDefaultStyle,
        backgroundColor: "transparent"
    },
    button: {
        ...ActionButtonDefaultStyle,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#333",
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
    },
    buttonInPortal: {
        ...PortalActionButtonDefaultStyle,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#333",
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
    },
    item: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    forumListContainer: {
        position: "absolute",
        bottom: PORTAL_TAB_BAR_HEIGHT + 12,
        right: 12,
        borderRadius: 30,
    },
    buttonPressedBg: {
        backgroundColor: "#222",
    },
    label: {
        color: "#FFF",
        position: "absolute",
        textAlign: "right",
        width: 260,
        top: 15,
        backgroundColor: "transparent",
    },
});