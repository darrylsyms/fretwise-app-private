import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { withNavigation } from "react-navigation";
import ForumsModal from "../Screens/TopicsScreen/ForumsModal";

const AnimatedHeaderContents = (props) => {

    const {
        title,
        subtitle,
        global,
        titleStyle,
        navigation
    } = props;

    const [shouldShow, toggleBottomSheet] = useState(false);
    
    const state = useSelector((state) => state);
    const forumsArray = state.forumsCache.byId.toArray();
    const forumStateMissing = forumsArray.length == 0;
    const topicStateMissing = state.topicCache.byId.toArray().length == 0;

    if (title === "Course Categories" || title === "Daily Challenges" || title === "Messages") {
        return (
            <Text
                style={{
                    ...global.iosStyleScreenTitle,
                    alignSelf: "stretch",
                    ...titleStyle,
                    fontSize: 30,
                    paddingBottom: 5 // Fixes issue https://github.com/darrylsyms/fretwise-app-private/issues/25
                }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
            >
                {title}
            </Text>
        )
    } else if (title === "Discussions") {
        return (
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                    <View>
                        <Text
                            style={{
                                ...global.iosStyleScreenTitle,
                                alignSelf: "stretch",
                                ...titleStyle,
                                fontSize: 30,
                            }}
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                        >
                            {title}
                        </Text>
                    </View>
                    
                    {forumStateMissing || topicStateMissing ? (
                                <View style={{ marginTop: 'auto', marginBottom: 'auto', paddingBottom: 10, paddingRight: 5 }}>
                                    <Image
                                        source={require("../../assets/img/icons/hamburger.png")}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            opacity: 0.3
                                        }}
                                    />
                                </View>
                            ) : (
                            <TouchableOpacity onPress={() => toggleBottomSheet(true)}>
                                <View style={{ marginTop: 'auto', marginBottom: 'auto', paddingBottom: 10, paddingRight: 5}}>
                                    <Image
                                        source={require("../../assets/img/icons/hamburger.png")}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                    )}

                </View>
                <ForumsModal
                    shouldShow={shouldShow}
                    toggleBottomSheet={toggleBottomSheet}
                    navigation={navigation} // need to pass the navigation prop because withNavigation doesnt work in the ForumsModal component
                />
            </>
        )
    }

    return (
        <Text
            style={{
                ...global.iosStyleScreenTitle,
                alignSelf: "stretch",
                ...titleStyle,
                fontSize: 30
            }}
            numberOfLines={1}
            ellipsizeMode={"tail"}
        >
            {title}
        </Text>
    )
    

}

export default withNavigation(AnimatedHeaderContents);