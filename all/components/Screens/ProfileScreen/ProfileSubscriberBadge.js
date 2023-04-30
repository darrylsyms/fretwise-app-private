import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import AvatarImageUpload from "@src/components/AvatarImageUpload";

const UserProfileAvatar = (props) => {

    const { global } = props;

    const [isModalBadgeVisible, setModalBadgeVisible] = useState(false);

    const toggleModalBadge = () => {
        setModalBadgeVisible(!isModalBadgeVisible);
    };

    const Badge = () => {
        if (props.user.type == "Instructor" || props.user.type == "Subscriber") {
            return (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        elevation: 3,
                    }}
                    onPress={toggleModalBadge}
                >
                    <Image style={{ width: 25, height: 25 }} source={require("../../../assets/img/branding/fw-badge.png")} />
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }

    return (
        <>
            <AvatarImageUpload
                isOwnAccount={props.isOwnAccount}
                user={props.user}
                size={110}
                imagePickerProps={{ cropping: true, cropperCircleOverlay: true }}
            />
            <Badge />
            <Modal
                isVisible={isModalBadgeVisible}
                onBackdropPress={() => setModalBadgeVisible(false)}
                onSwipeComplete={() => setModalBadgeVisible(false)}
                swipeDirection="bottom"
                //backdropOpacity="0.60"
                style={{
                    justifyContent: 'flex-end',
                    margin: 0
                }}
            >
                <View style={{
                    padding: 40,
                    paddingBottom: 60,
                    backgroundColor: "#fff",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    alignItems: 'center'
                }}>
                    <Image
                        style={{
                            width: 160,
                            height: 160,
                            opacity: 0.1,
                            left: 0,
                            top: 0,
                            position: "absolute"
                        }}
                        source={require("../../../assets/img/branding/fw-badge.png")}
                    />
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
                            source={require("../../../assets/img/branding/fw-badge.png")} />
                        <Text style={{ ...global.h5 }}>Subscriber Badge</Text>
                    </View>
                    <Text style={{ textAlign: 'center', ...global.text }}>This badge is given to active subscribing members. When you see this badge on another members Avatar, you'll know that they have access to all classes and resources on Fretwise!</Text>
                </View>
            </Modal>
        </>
    )
}

export default UserProfileAvatar;