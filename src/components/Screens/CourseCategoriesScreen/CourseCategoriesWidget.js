import React, { useEffect, useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { globalStyle, GUTTER } from "@src/styles/global";
import { connect, useSelector } from "react-redux";
import { saveCourseCategories } from "../../../state/actions/courseCategories";
import { getCourseCategories } from "../../../services/Course_Categories.service";
import { saveCourses } from "../../../state/actions/courses";
import { getCourses } from "../../../services/Courses.service";
import { withNavigation, NavigationActions } from 'react-navigation';
import CourseCategoriesSkeleton from "../../Global/SkeletonLoaders/CourseCategoriesPlaceholder";
import CourseItem from "../../ListItems/CourseItem";

const Screen = (props) => {

    const state = useSelector((state) => state);
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    const courseCategoriesCache = state.courseCategories.cache;
    const coursesCacheById = state.coursesCache.byId;

    useEffect(() => {
        async function fetchAllCategories() {
            const catResponse = await getCourseCategories(props.config);
            props.dispatch(saveCourseCategories(catResponse));
        }
        async function fetchAllCourses() {
            const courseResponse = await getCourses(props.config);
            props.dispatch(saveCourses(courseResponse));
        }
        if (courseCategoriesCache.toArray().length == 0) {
            fetchAllCategories();
        }
        if (coursesCacheById.toArray().length == 0) {
            fetchAllCourses();
        }
    }, [])

    const goToCategoryList = (categorybyId) => {

        const category = state.courseCategories.cache.get(categorybyId ? categorybyId.toString() : "");

        props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: "CoursesCategorySingleScreen",
                params: {
                    title: category.name,
                    categoryId: category.id,
                },
            })
        )
    }


    const courseCatArray = courseCategoriesCache.toArray();
    const coursesArray = coursesCacheById.toArray().reverse();

    const RenderCourseCategories = useMemo(() => {

        return courseCatArray.map((category) => {
            const CourseItems = () => {
                return coursesArray.filter((course) => { return category.courses.includes(course.id) }).map((course) => {
                    return <CourseItem course={course} />
                })
            }

            return (
                <View key={category.id} style={[global.widgetInner, global.bottomBorder]}>
                    <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: GUTTER }}>
                        <Text style={[global.widgetTitle]}>{category.name}</Text>
                        <Text style={[global.seeLink, colors.primaryColor, { textAlign: 'right' }]} onPress={() => goToCategoryList(category.id)}>See all</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        decelerationRate={8}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: GUTTER }}
                    >
                        <CourseItems />
                    </ScrollView>
                </View>
            )
        })

    }, [coursesArray, courseCatArray]
    )



    return (
        <>
            {courseCatArray.length === 0 ? (
                <View style={{ flex: 1 }}>
                    <CourseCategoriesSkeleton />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    {RenderCourseCategories}
                </View>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
    courseCategories: state.courseCategories.cache,
});

const CourseCategoriesWidget = withNavigation(Screen)

export default connect(mapStateToProps)(CourseCategoriesWidget);