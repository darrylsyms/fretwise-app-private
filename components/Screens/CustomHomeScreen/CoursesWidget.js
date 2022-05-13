import React, { useEffect, useMemo } from "react";
import { ScrollView } from "react-native";
import CourseSkeleton from "../../Global/SkeletonLoaders/CoursePlaceholder";
import { connect, useSelector } from "react-redux";
import { withNavigation } from 'react-navigation';
import { GUTTER } from "@src/styles/global";
import { saveCourses } from "../../../state/actions/courses";
import { getCourses } from "../../../services/Courses.service";
import CourseItem from "../../ListItems/CourseItem";

const CoursesWidget = (props) => {

    const state = useSelector((state) => state);

    const coursesCacheById = state.coursesCache.byId;
    const coursesArray = coursesCacheById.toArray().reverse();
    const coursesStateMissing = coursesArray.length === 0;

    useEffect(() => {
        async function fetchAllCourses() {
            const response = await getCourses(props.config);
            props.dispatch(saveCourses(response));
        }
        if (coursesStateMissing) { // This may be unnecessary
            fetchAllCourses();
        }
    }, [])


    const RenderItems = useMemo(() => {
        return coursesArray.filter((e, k) => k < 6).map((course) => {
            return <CourseItem course={course} />
        })

    }, [coursesArray])

    return (
        <>
            {coursesStateMissing ? (
                <ScrollView
                    horizontal={true}
                    decelerationRate={8}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: GUTTER }}
                >
                    <CourseSkeleton />
                    <CourseSkeleton />
                    <CourseSkeleton />
                    <CourseSkeleton />
                    <CourseSkeleton />
                    <CourseSkeleton />
                </ScrollView>

            ) : (
                <ScrollView
                    horizontal={true}
                    decelerationRate={8}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: GUTTER }}
                >
                    {RenderItems}
                </ScrollView>
            )}
        </>
    );

};

const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});

const FinalComponent = withNavigation(CoursesWidget)

export default connect(mapStateToProps)(FinalComponent);