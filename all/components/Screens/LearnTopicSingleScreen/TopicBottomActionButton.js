import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import AuthWrapper from "@src/components/AuthWrapper";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import Icon from "@src/components/Icon";
import { isColorDark } from "@src/utils";

const LearnTopicActionComponent = ({
  showComplete,
  global,
  colors,
  t,
  topicVM,
  onCompleteTopicClick,
  completing,
  completeDisabled
}) => {

  const myFunction = () => {
    console.log('testing1')
  }

  return (
    <AuthWrapper actionOnGuestLogin={"hide"}>
      {showComplete && (
        <View
          style={[
            global.row,
            {
              backgroundColor: colors.bodyFrontBg,
              borderTopColor: colors.borderColor
            },
            global.learnTopicActionButtonContainer
          ]}
        >
          <AppTouchableOpacity
            style={[
              { flex: 1 },
              {
                opacity: !topicVM.completed && completeDisabled ? 0.5 : 1,
                backgroundColor: !topicVM.completed
                  ? colors.primaryButtonBg
                  : colors.bodyFrontBg
              },
              global.completeTopicButtonW
            ]}
            disabled={topicVM.completed || completeDisabled}
            onPress={() => {
              onCompleteTopicClick();
              //myFunction();
            }
            }
          >
            <View style={global.row}>
              <View style={global.linkWithArrow}>
                {topicVM.completed && (
                  <Icon
                    webIcon={""}
                    icon={require("@src/assets/img/completed-course.png")}
                    styles={global.learnTopicActionCompleteIcon}
                  />
                )}
                <Text
                  style={[
                    {
                      marginLeft: 10,
                      color: !topicVM.completed
                        ? colors.primaryButtonColor
                        : isColorDark(colors.bodyFrontBg)
                          ? "white"
                          : "black"
                    },
                    global.completeTopicButton
                  ]}
                >
                  {!topicVM.completed ? (
                    completing ? (
                      <ActivityIndicator
                        animating={true}
                        color={colors.primaryButtonColor}
                        size="small"
                        style={global.learnTopicButtonLoadingIcon}
                      />
                    ) : (
                      <>
                        {t(
                          !topicVM.completed
                          && "lessonTopic:markAsComplete"
                        )}
                      </>
                    )
                  ) : (
                    <>
                      {t(
                        topicVM.completed
                        && "lessonTopic:completed"
                      )}
                    </>
                  )}
                </Text>
              </View>
            </View>
          </AppTouchableOpacity>
        </View>
      )}
    </AuthWrapper>
  )
};

export default LearnTopicActionComponent;
