import React from 'react';
import MessagesScreen from "@src/containers/Custom/MessagesScreen";

const MessagesListScreen = (props) => (
    <MessagesScreen {...props}
    screenTitle="Messages"
    showSearch={false}
    hideFilters={false}
    />
)

MessagesListScreen.navigationOptions = {
    header: null
}

export default MessagesListScreen;