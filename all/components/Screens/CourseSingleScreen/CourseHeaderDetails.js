import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from "@src/components/Icon";
import AppImageBackground from "@src/components/AppImageBackground";
import AppAvatar from "@src/components/AppAvatar";
import { CourseVideo } from "@src/components/Course/CourseStatus";
import { connect, useSelector } from "react-redux";
import { getCourseIncludes } from '../../../services/Course_Includes.service';
import { saveCourseIncludes } from '../../../state/actions/courseIncludes';
import { isTabletOrIPad } from "@src/utils";

const CourseHeaderItems = (props) => {

    const {
        courseVM,
        global,
        labels,
        colors,
        t,
        lCount,
        tCount,
        qCount,
        navigation,
        learndashCourseParticipants
    } = props;

    useEffect(() => {
        async function fetchCourseIncludes() {
            const response = await getCourseIncludes(props.config);
            props.dispatch(saveCourseIncludes(response));
        }
        fetchCourseIncludes();
    }, []);

    /*
    const CourseIncludesData = () => {

        const state = useSelector((state) => state);
        const courseIncludesState = state.courseIncludesCache.byId;

        const Item = ({ data, icon }) => {
            return (
                <View style={{ flexDirection: "row", }}>
                    <Image
                        source={icon}
                        style={{ height: 19, width: 19, tintColor: colors.descLightTextColor }}
                    />
                    <Text
                        style={styles.courseDetailsText}
                    >
                        {data}
                    </Text>
                </View>
            )
        }

        if (!courseIncludesState) return <Text>...</Text>

        const courseId = courseVM.id;
        //const CourseIncludesData = courseIncludesState[0];
        const CourseIncludesData = courseIncludesState?.get(courseId.toString());

        console.log('CourseIncludesData', CourseIncludesData);
        console.log('courseIncludesState', courseIncludesState);

        return (
            <>
                {CourseIncludesData?.videoDuration &&
                    <Item
                        data={CourseIncludesData?.videoDuration}
                        icon={require("../../../assets/img/courseHeaderDetails/play.png")}
                    />
                }
                {CourseIncludesData?.annotations &&
                    <Item
                        data={CourseIncludesData?.annotations}
                        icon={require("../../../assets/img/courseHeaderDetails/pin.png")}
                    />
                }
                {CourseIncludesData?.transcripts &&
                    <Item
                        data={CourseIncludesData?.transcripts}
                        icon={require("../../../assets/img/courseHeaderDetails/align-left.png")}
                    />
                }
                {CourseIncludesData?.tabs &&
                    <Item
                        data={CourseIncludesData?.tabs}
                        icon={require("../../../assets/img/courseHeaderDetails/note.png")}
                    />
                }
                {CourseIncludesData?.backingTracks !== "" &&
                    <Item
                        data={CourseIncludesData?.backingTracks}
                        icon={require("../../../assets/img/courseHeaderDetails/mp3.png")}
                    />
                }
                {CourseIncludesData?.other !== "" &&
                    <Item
                        data={CourseIncludesData?.other}
                        icon={require("../../../assets/img/courseHeaderDetails/plus.png")}
                    />
                }
            </>
        )

    }
    */

    const size = 26;

    const shouldShowParticipants = !!+learndashCourseParticipants;

    const showIncludesTitle = lCount !== 0 ||
        tCount !== 0 ||
        qCount !== 0 ||
        courseVM.certificate?.available

    const styles = StyleSheet.create({
        videoContainer: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden",
            ...(!shouldShowParticipants && {
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
            })
        },

        avatar: {
            width: size + 4,
            height: size + 4,
            borderRadius: size + 4 / 2,
            borderColor: colors.bodyFrontBg,
            borderWidth: 2
        },
        enrolledText: {
            ...global.textAlt,
            left: -8,
            fontSize: 13
        },
        courseDetailsText: {
            ...global.itemText,
            marginBottom: 10,
            marginLeft: 14
        }

    });

    return (
        <>
            <View
                style={styles.videoContainer}
            >
                {!!!courseVM.videoUrl &&
                    !!courseVM.featuredUrl && (
                        <AppImageBackground
                            source={{ uri: courseVM.featuredUrl }}
                            style={{ width: "100%", height: isTabletOrIPad() ? 500 : 200 }}
                            //resizeMode={'contain'}
                        />
                    )}
                {typeof courseVM.videoUrl === "string" &&
                    courseVM.videoUrl !== "" && (
                        <CourseVideo
                            url={courseVM.videoUrl}
                            feature={courseVM.featuredUrl}
                            global={global}
                            colors={colors}
                            navigation={navigation}
                        />
                    )}
            </View>

            <View
                style={{
                    paddingHorizontal: 16,
                    ...(shouldShowParticipants && { paddingVertical: 12 })
                }}
            >
                {courseVM?.members?.length > 0 &&
                    shouldShowParticipants && (
                        <View style={{ ...global.row }}>
                            {courseVM.members
                                .map(x => x.member_rest?.avatar?.thumb || "")
                                .map((url, index) => (
                                    <AppAvatar
                                        key={url}
                                        style={[styles.avatar, { left: index === 0 ? 0 : -10 * index, zIndex: index }]}
                                        borderRadius={size / 2}
                                        size={size}
                                        source={{
                                            uri: url
                                        }}
                                    />
                                ))}
                            <Text style={styles.enrolledText}>
                                {courseVM.enrolledMembers > 2
                                    ? `+${courseVM.enrolledMembers - 2} ${t("course:enrolled")}`
                                    : ""}
                            </Text>
                        </View>
                    )}
                {showIncludesTitle && (
                    <Text
                        style={[
                            global.courseIncludesTitle,
                            {
                                marginBottom: 15,
                                marginTop: courseVM?.members?.length > 0 ? 20 : 0
                            }
                        ]}
                    >
                        {t("course:includesTitle", { label: labels.course })}
                    </Text>
                )}
                {lCount !== 0 && (
                    <View style={{ flexDirection: "row" }}>
                        <Icon
                            tintColor={colors.descLightTextColor}
                            icon={require("../../../assets/img/courseHeaderDetails/goal.png")}
                            styles={{ height: 19, width: 19 }}
                        />
                        <Text
                            style={styles.courseDetailsText}
                        >
                            {lCount + tCount + qCount} Steps
                        </Text>
                    </View>
                )}
                {courseVM.certificate?.available && (
                    <View style={{ flexDirection: "row" }}>
                        <Icon
                            tintColor={colors.descLightTextColor}
                            icon={require("@src/assets/img/small-certificate.png")}
                        />
                        <Text
                            style={styles.courseDetailsText}
                        >
                            {t("course:certificate", { label: labels.course })}
                        </Text>
                    </View>
                )}
            </View>
        </>
    );
}

const mapStateToProps = (state) => ({
    config: state.config,
});

export default connect(mapStateToProps)(CourseHeaderItems);