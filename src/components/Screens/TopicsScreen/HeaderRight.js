import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';
import { useSelector } from "react-redux";
import IconButton from "@src/components/IconButton";
import ForumsModal from "./ForumsModal";

const HeaderRightComponent = (props) => {

    const { navigation, headerRight } = props;

    const [shouldShow, toggleBottomSheet] = useState(false);

    const state = useSelector((state) => state);
    // Forums List is already being called from the TopicActionButton Component.
    const forumsCachebyId = state.forumsCache.byId;
    const forumsArray = forumsCachebyId.toArray();
    const forumStateMissing = forumsArray.length == 0;
    const topicStateMissing = state.topicCache.byId.toArray().length == 0;

    if (navigation.state?.params?.item?.object === "topics") {

        return (
            <>
                {forumStateMissing || topicStateMissing ? (
                    <IconButton
                        icon={require("../../../assets/img/icons/hamburger.png")}
                        tintColor="#fff"
                        style={{
                            height: 20,
                            marginRight: 10,
                            opacity: 0.3
                        }}
                    />
                ) : (
                    <IconButton
                        pressHandler={() => toggleBottomSheet(true)}
                        icon={require("../../../assets/img/icons/hamburger.png")}
                        tintColor="#fff"
                        style={{
                            height: 20,
                            marginRight: 10
                        }}
                    />
                )}
                <ForumsModal
                    shouldShow={shouldShow}
                    toggleBottomSheet={toggleBottomSheet}
                    navigation={navigation} // need to pass the navigation prop because withNavigation doesnt work in the ForumsModal component
                />
            </>
        )
    }

    if (navigation?.state?.routeName === "GroupActivity"){
        return headerRight || null;
    }

    if (navigation.state?.params?.item?.object === "blog") {
        return null;
    }

    //TODO: setTimeout to avoid critical erorr bug setTimeout(() => { seIsLoading(false) }, 1500)
    return headerRight || null;
}

export default withNavigation(HeaderRightComponent);