import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GUTTER, globalStyle } from "@src/styles/global";
import { connect, useSelector } from 'react-redux';
import Modal from "react-native-modal";
import { getWelcomeMessages } from "../../../services/Welcome_Messages.service";
import { saveWelcomeMessages } from "../../../state/actions/welcomeMessages";
import ShortTextSkeleton from "../../Global/SkeletonLoaders/ShortTextPlaceholder";

const BeforeBlocks = (props) => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;

    const user = useSelector((state) => state.user.userObject);
    const welcomeMessages = useSelector((state) => state.welcomeMessagesCache.byId);

    const gamiWisdomPoints = user.user_points[0]?.point;
    const gamiWisdomImage = user.user_points[0]?.image;
    const gamiPostsPoints = user.user_points[1]?.point;
    const gamiPostsImage = user.user_points[1]?.image;

    useEffect(() => {
        async function fetchWelcomeMessages() {
            const response = await getWelcomeMessages(props.config);
            props.dispatch(saveWelcomeMessages(response));
        }
        fetchWelcomeMessages();
    }, []);


    const message = () => {
        if (welcomeMessages) {
            const currentHour = new Date().getUTCHours();
            const getMessage = welcomeMessages.get(currentHour !== 0 ? currentHour.toString() : "24");
            return <Text style={[global.subtitle, {color: '#000'}]}>{getMessage.message}</Text>
        }
        return <ShortTextSkeleton />
    }

    const [isModalWisdomVisible, setModalWisdomVisible] = useState(false);
    const [isModalPostsVisible, setModalPostsVisible] = useState(false);

    const toggleModalWisdom = () => {
        setModalWisdomVisible(!isModalWisdomVisible);
    };
    const toggleModalPosts = () => {
        setModalPostsVisible(!isModalPostsVisible);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <View>
                <Modal
                    isVisible={isModalWisdomVisible}
                    onBackdropPress={() => setModalWisdomVisible(false)}
                    onSwipeComplete={() => setModalWisdomVisible(false)}
                    swipeDirection="bottom"
                    //backdropOpacity="0.60"
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                >
                    <View style={styles.modalView}>
                        <Image style={styles.modalViewBackground} source={{ uri: gamiWisdomImage }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 18
                        }}>
                            <Image
                                style={{
                                    width: 22,
                                    height: 22,
                                    marginRight: 6
                                }}
                                source={{ uri: gamiWisdomImage }} />
                            <Text style={[global.h5, {}]}>Wisdom</Text>
                        </View>
                        <Text style={{ textAlign: 'center', ...global.text }}>Earn Wisdom by completing lessons and Masterclasses. This helps measure your progress at quick glance, and helps others guage your experience when communicating in the forums.</Text>
                    </View>
                </Modal>
                <Modal
                    isVisible={isModalPostsVisible}
                    onBackdropPress={() => setModalPostsVisible(false)}
                    onSwipeComplete={() => setModalPostsVisible(false)}
                    swipeDirection="bottom"
                    //backdropOpacity="0.60"
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                >
                    <View style={styles.modalView}>
                        <Image style={styles.modalViewBackground} source={{ uri: gamiPostsImage }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 18
                        }}>
                            <Image
                                style={{
                                    width: 22,
                                    height: 22,
                                    marginRight: 6
                                }}
                                source={{ uri: gamiPostsImage }} />
                            <Text style={[global.h5, {}]}>Posts</Text>
                        </View>
                        <Text style={{ textAlign: 'center', ...global.text }}>This is your post count which is a measure of how engaged you are with the community.</Text>
                    </View>
                </Modal>
            </View>
            <View style={{ marginHorizontal: GUTTER, marginTop: 40, marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    {/*<View style={{paddingRight: 20}}>  
                    <FastImage style={{width: 50, height: 50, borderRadius: 50}} source={{uri: user.avatar_urls.thumb}} />
                </View>*/}

                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={global.xProfileSectionText}>Hello, {user.name}!</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 0 }}>
                                <TouchableOpacity style={styles.gami} onPress={toggleModalWisdom}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={{
                                                width: 15,
                                                height: 15,
                                                marginRight: 4
                                            }}
                                            source={{ uri: gamiWisdomImage }} />
                                        <Text style={[global.achievementSheetInnerContent, {color: '#000'}]}>{gamiWisdomPoints}</Text>
                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.gami} onPress={toggleModalPosts}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={{
                                                width: 15,
                                                height: 15,
                                                marginRight: 4
                                            }}
                                            source={{ uri: gamiPostsImage }} />
                                        <Text style={[global.achievementSheetInnerContent, {color: '#000'}]}>{gamiPostsPoints}</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            {message()}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token, // remove this from all similar components
});

export default connect(mapStateToProps)(BeforeBlocks);

const styles = StyleSheet.create({
    gami: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginLeft: 8
    },
    modalView: {
        padding: 40,
        paddingBottom: 60,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center'
    },
    modalViewBackground: {
        width: 160,
        height: 160,
        opacity: 0.1,
        left: 0,
        top: 0,
        position: "absolute",
        transform: [{ rotate: '-20deg' }]
    }
});