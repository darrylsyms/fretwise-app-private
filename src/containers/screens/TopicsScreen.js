import React from 'react';
import {
    View,
    StyleSheet
} from "react-native";
import TopicsScreen from "@src/containers/Custom/TopicsScreen";
import ActionButton from '../../components/Screens/TopicsScreen/TopicScreenActionButton';
import { useSelector } from 'react-redux';
import { SEARCH_FOCUSED_TOP_SPACING } from '../../styles/global';

const TopicsScreeen = (props) => {

    const state = useSelector((state) => state);
    const user = state.user?.userObject;

    return (
        <View style={{ flex: 1 }}>
            <TopicsScreen {...props}
                screenTitle="Discussions"
                showSearch={true}
                hideFilters={false}
                searchFocusedListTopSpace={SEARCH_FOCUSED_TOP_SPACING}
            />

            {user && (
                <View style={styles.actionButton}>
                    <ActionButton />
                </View>
            )}
        </View>
    )
}

TopicsScreeen.navigationOptions = {
    header: null
}

export default TopicsScreeen;


const styles = StyleSheet.create({
    actionButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
})