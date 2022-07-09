import React from "react";
import { View, Text } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { useSelector } from "react-redux";
import { GUTTER, globalStyle } from "@src/styles/global";
import TopicsWidget from './TopicsWidget';

const TopicsWidgetContainer = (props) => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    const Route = () => {
        props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'TopicsScreenTabRoute2',
            })
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 25 }}>
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: GUTTER }}>
                <Text style={[global.widgetTitle, {textAlign: 'left'}]}>Hot Topics</Text>
                <Text style={[global.seeLink, colors.primaryColor, {textAlign: 'right'}]} onPress={() => Route()}>See all</Text>
            </View>
            <View style={{ minHeight: 150 }}>
                <TopicsWidget />
            </View>
        </View>
    );
};

export default withNavigation(TopicsWidgetContainer);