import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import AuthWrapper from "@src/components/AuthWrapper";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import Icon from "@src/components/Icon";
import { isColorDark } from "@src/utils";

const LessonActionComponent = ({
    showComplete,
    global,
    colors,
    t,
    lesson,
    onCompleteButtonClick,
    completing,
    completeDisabled,
    labels
}) => (<AuthWrapper actionOnGuestLogin={"hide"}>
    {showComplete && (
        <View
            style={[
                global.row,
                {
                    backgroundColor: colors.bodyFrontBg,
                    borderTopColor: colors.borderColor
                },
                global.lessonActionButtonContainer
            ]}
        >
            <AppTouchableOpacity
                style={[
                    { flex: 1 },
                    {
                        opacity: !lesson.completed && completeDisabled ? 0.5 : 1,
                        backgroundColor: !lesson.completed
                            ? colors.primaryButtonBg
                            : colors.bodyFrontBg
                    },
                    global.completeLessonButtonW
                ]}
                disabled={lesson.completed || completeDisabled}
                onPress={onCompleteButtonClick}
            >
                <View style={global.row}>
                    <View style={global.linkWithArrow}>
                        {!lesson.completed ? (
                            completing && (
                                <>
                                    <Text style={{color: "#fff"}}>Completing...</Text>
                                    <ActivityIndicator
                                        animating={true}
                                        color={colors.primaryButtonColor}
                                        size="small"
                                        style={global.lessonButtonLoadingIcon}
                                    />
                                </>
                            )
                        ) : (
                            <Icon
                                webIcon={""}
                                icon={require("@src/assets/img/completed-course.png")}
                                styles={global.lessonActionCompleteIcon}
                            />
                        )}
                        <Text
                            style={[
                                {
                                    marginLeft: 10,
                                    color: !lesson.completed
                                        ? colors.primaryButtonColor
                                        : isColorDark(colors.bodyFrontBg)
                                            ? "white"
                                            : "black"
                                },
                                !lesson.completed
                                    ? global.completeLessonButton
                                    : global.completeButton
                            ]}
                        >
                            {t(
                                lesson.completed
                                    ? "lesson:completed"
                                    : "lesson:completeLesson",
                                { label: labels.lesson.toLowerCase() }
                            )}
                        </Text>
                    </View>
                </View>
            </AppTouchableOpacity>
        </View>
    )}
</AuthWrapper>)

export default LessonActionComponent;