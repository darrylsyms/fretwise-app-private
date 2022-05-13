import React from "react";
import { View, Text } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { globalStyle, GUTTER } from "@src/styles/global"
import { useSelector } from "react-redux";
import CoursesWidget from "./CoursesWidget";
import { isTabletOrIPad } from "@src/utils";

const CoursesWidgetContainer = (props) => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    const Route = () => {
        props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'CourseCategoriesScreenTabRoute1',
            })
        )
    }

    return (
        <View style={[global.bottomBorder, { flex: 1, backgroundColor: '#f2f2f2', paddingTop: 25 }]}>
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: GUTTER }}>
                <Text style={[global.widgetTitle]}>Latest Classes</Text>
                <Text style={[global.seeLink, colors.primaryColor, {textAlign: 'right'}]} onPress={() => Route()}>See all</Text>
            </View>
            <View style={{ height: isTabletOrIPad() ? 250 : 175 }}>
                <CoursesWidget />
            </View>
        </View>
    );
};

export default withNavigation(CoursesWidgetContainer);