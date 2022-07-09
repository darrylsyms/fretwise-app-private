import React from "react";
import {View, Text} from "react-native";
import Animated from "react-native-reanimated";
import {DEVICE_WIDTH} from "@src/styles/global";
import AuthWrapper from "@src/components/AuthWrapper";

const Header = (props) => {

    const {
        headerLeftStyle,
        style,
        global,
        backToCourse,
        headerRightAuthWrapperProps,
        prevNext,
        t,
        labels,
        lesson,
    } = props;

  return (
    <Animated.View
      style={[
        global.row,
        global.fakeHeader,
        {
          backgroundColor: "transparent",
          paddingHorizontal: 10,
          overflow: "hidden"
        },
        {
          width: DEVICE_WIDTH
        },
        style
      ]}
    >
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
            height: "100%"
          }
        ]}
      >
        <View style={[global.headerButtonLeft, headerLeftStyle]}>
          {backToCourse}
        </View>
        <View style={[global.headerCustomTitle]}>
        <Text>{lesson?.title}</Text>
        {/*t("lesson:count", {
                label: labels.lesson,
                current: lesson.order,
                total: lesson.total
              })*/}
        </View>
        <View style={[global.headerButtonRight]}>
          <AuthWrapper
            actionOnGuestLogin={"hide"}
            {...headerRightAuthWrapperProps}
          >
            {prevNext}
          </AuthWrapper>
        </View>
      </View>
    </Animated.View>
  );
};

export default Header;