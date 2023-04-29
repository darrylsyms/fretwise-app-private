import React from "react";
import { Text, View } from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { shadeColor } from "@src/utils";


export const onObjectClick = (
    object,
    onQuizClick,
    onTopicClick,
    onLessonClick
) => {
    if (!!!object) {
        return false;
    }
    switch (object.type) {
        case "quiz":
            onQuizClick(object.parentType, object.parent)(object);
            break;
        case "topic":
            onTopicClick(object, object.parent);
            break;
        case "lesson":
            onLessonClick(object);
            break;
    }
};

 const PrevNextTopics = props => {

   const { onQuizClick,
           onLessonClick,
           onTopicClick,
           global,
           colors,
           t,
           prevObject,
           nextObject,
           courseId,
           nextLockedAlert } = props;

           if (!nextObject && !prevObject) {
            return null;
        }
    
        return (
            <View style={[global.row]}>
                <AppTouchableOpacity
                    style={{
                        ...global.wrappedTextButton,
                        height: 31.622999999999998,
                        backgroundColor: "#f24b4b",
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 4
                    }}
                    onPress={() => {
                        if (prevObject !== "disabled") {
                            onObjectClick(prevObject, onQuizClick, onTopicClick, onLessonClick);
                        }
                    }}
                >
                    <View style={global.row}>
                        <View style={global.linkWithArrow}>
                            <Text
                                style={[
                                    global.wrappedTextButtonLabel,
                                    {
                                        color:
                                            !!!prevObject || prevObject === "disabled"
                                                ? shadeColor("#ddd", 0.4)
                                                : "#fff"
                                    }
                                ]}
                            >
                                {t("lesson:prevButtonText")}
                            </Text>
                        </View>
                    </View>
                </AppTouchableOpacity>
    
                <AppTouchableOpacity
                    style={{
                        ...global.wrappedTextButton,
                        height: 31.622999999999998,
                        backgroundColor: "#f24b4b",
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={() => {
                        if (nextObject !== "disabled") {
                            onObjectClick(nextObject, onQuizClick, onTopicClick, onLessonClick);
                        } else if (typeof nextLockedAlert === "function") {
                            nextLockedAlert();
                        }
                    }}
                >
                    <View style={global.row}>
                        <View style={global.linkWithArrow}>
                            <Text
                                style={[
                                    global.wrappedTextButtonLabel,
                                    {
                                        color:
                                            !!!nextObject || nextObject === "disabled"
                                                ? shadeColor("#ddd", 0.4)
                                                : "#fff"
                                    }
                                ]}
                            >
                                {t("lesson:nextButtonText")}
                            </Text>
                        </View>
                    </View>
                </AppTouchableOpacity>
            </View>
        );
};
export default PrevNextTopics;