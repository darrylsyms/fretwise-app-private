import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Platform
} from "react-native";
import { isTabletOrIPad } from "@src/utils";
import { withNavigation, NavigationActions } from 'react-navigation';
import { useSelector } from "react-redux";
import { globalStyle } from "@src/styles/global";

const CourseItem = (props) => {

    const { navigation, course } = props;
    const state = useSelector((state) => state);
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;


    const goToCourse = (courseId) => {

        const NaviOne = NavigationActions.navigate({
            routeName: 'CourseCategoriesScreenTabRoute1'
        })

        const courseObject = state.coursesCache.byId.get(courseId ? courseId.toString() : "")

        const NaviTwo = NavigationActions.navigate({
            routeName: "CoursesSingleScreen",
            params: {
                id: courseObject.id,
                courseObject
            },
            key: courseObject.id.toString()
        })

        if (navigation.state.params.object !== "courses_category") {
            navigation.dispatch(NaviOne)
            setTimeout(() => { navigation.dispatch(NaviTwo) }, 100)
        }

        if (navigation.state.params.object == "courses_category") {
            navigation.dispatch(NaviTwo)
        }

    }

    const TEXT_HEIGHT = isTabletOrIPad() ? 18 : 15;
    const ITEM_HEIGHT = isTabletOrIPad() ? 195 : 120;
    const ITEM_WIDTH = isTabletOrIPad() ? 260 : 160;
    const OFFSET = ITEM_HEIGHT / 2 - TEXT_HEIGHT / 2;

    return (
        <View key={course.id}>
            <TouchableOpacity activeOpacity={1} onPress={() => goToCourse(course.id)}>
                <View style={styles.items}>
                    <ImageBackground
                        source={{ uri: course.featured_media.large }}
                        style={[styles.view, { height: ITEM_HEIGHT, width: ITEM_WIDTH }]}
                        imageStyle={{ borderRadius: 14 }}
                    >
                        {/*course.progression == 0 && (
                            <View style={{
                                ...styles.widgetProgressItemBg,
                                backgroundColor: colors.coursesLabelNotEnrolled,
                                transform: [
                                    { rotate: "-90deg" },
                                    { translateY: -OFFSET }
                                ],
                                width: ITEM_HEIGHT,
                                height: TEXT_HEIGHT,
                            }}>
                                <Text
                                    style={[global.widgetProgressItemText, styles.progressText]}
                                >
                                    Not Enrolled
                                </Text>
                            </View>
                        )*/}
                        {course.progression >= 1 && course.progression <= 99 && (
                            <View style={{
                                ...styles.widgetProgressItemBg,
                                backgroundColor: colors.coursesLabelProgress,
                                transform: [
                                    { rotate: "-90deg" },
                                    { translateY: -OFFSET }
                                ],
                                width: ITEM_HEIGHT,
                                height: TEXT_HEIGHT,
                            }}>
                                <Text
                                    style={[global.widgetProgressItemText, styles.progressText]}
                                >
                                    In progress
                                </Text>
                            </View>
                        )}
                        {course.progression == 100 && (
                            <View style={{
                                ...styles.widgetProgressItemBg,
                                backgroundColor: colors.coursesLabelCompleted,
                                transform: [
                                    { rotate: "-90deg" },
                                    { translateY: -OFFSET }
                                ],
                                width: ITEM_HEIGHT,
                                height: TEXT_HEIGHT,
                            }}>
                                <Text
                                    style={[global.widgetProgressItemText, styles.progressText]}
                                >
                                    Complete
                                </Text>
                            </View>
                        )}
                        {course.progression >= 1 && course.progression <= 100 && (
                            <View style={{ width: '85%', height: '92%', borderRadius: 14, backgroundColor: 'transparent' }}>
                                <View
                                    style={{
                                        height: 4,
                                        backgroundColor: 'grey',
                                        opacity: 0.5,
                                        borderRadius: 55,
                                        bottom: 13,
                                        position: 'absolute',
                                        width: "100%"
                                    }} />
                                <View
                                    style={{
                                        height: 4,
                                        backgroundColor: colors.primaryColor,
                                        borderRadius: 55,
                                        bottom: 13,
                                        position: 'absolute',
                                        width: (course.progression) + "%"
                                    }} />
                            </View>
                        )}
                    </ImageBackground>
                    <Text style={[global.widgetItemTitle, { maxWidth: ITEM_WIDTH - 10 }]} numberOfLines={1} ellipsizeMode={"tail"}>{course.title.rendered}</Text>
                </View>
            </TouchableOpacity >
        </View>
    )
}

export default withNavigation(CourseItem);


const styles = StyleSheet.create({
    view: {
        marginBottom: 7,
        resizeMode: "cover",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.01)'
    },
    items: {
        flexDirection: 'column',
        marginRight: 10,
    },
    widgetProgressItemBg: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        transform: [{ rotate: '-90deg' }],
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'flex-start',
    },
    indicator: {
        flex: 1,
        height: 80,
    },
    progressText: {
        fontSize: isTabletOrIPad() ? 14 : 10,
        color: "#fff",
        //paddingHorizontal: 10,
        transform: [{ translateY: isTabletOrIPad() ? 1 : -1 }],
        textAlign: 'center',
    }
});

