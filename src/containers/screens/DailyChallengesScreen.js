import React from 'react';
import BlogScreen from "@src/containers/Custom/BlogScreen";

const DailyChallengesScreen = (props) => (
    <BlogScreen {...props}
    screenTitle="blog:title"
    showSearch={false}
    hideFilters={false}
    />
)

DailyChallengesScreen.navigationOptions = {
    header: null
}

export default DailyChallengesScreen;