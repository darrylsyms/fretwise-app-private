import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from "react-native";
import IconButton from "@src/components/IconButton";
import { DEVICE_WIDTH } from "@src/styles/global";

const LessonTitle = (props) => {

  const {
    global,
    colors,
    paddingTop,
    lesson,
    t,
    labels
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const animState = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(animState, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (isOpen)
      setTimeout(() => { setIsOpen(false) }, 3000);

  }, [isOpen, animState]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const Opacity = {
    opacity: animState.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <>
      <View
        style={[
          global.row,
          global.bottomBorder,
          {
            backgroundColor: colors.bodyFrontBg,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            //paddingTop,
            paddingBottom: 14
          }]}
      >
        <Text
          style={[
            global.courseHeaderTitle,
            {
              fontSize: 26,
              maxWidth: DEVICE_WIDTH - 80 // oddly necessary otherwise IconButton is pushed to right: 0
            }
          ]}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>

        <Animated.View style={[
          Opacity,
          {
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            position: 'absolute',
            height: '100%',
            top: 0,
            left: 0,
            right: 50,
            justifyContent: 'center',
          }
        ]}>
          <Text style={[global.courseHeaderSubTitle, { color: '#000' }]} numberOfLines={1}>
            {lesson.title}
          </Text>
          <Text style={global.courseHeaderSubTitle}>
            {t("lesson:count", {
              label: labels.lesson,
              current: lesson.order,
              total: lesson.total
            })}
          </Text>
        </Animated.View>

        <IconButton
          pressHandler={() => toggleOpen(true)}
          icon={require("../../../assets/img/lessons/information.png")}
          tintColor="#ddd"
          style={{
            height: 20,
            width: 20,
          }}
        />

      </View>
    </>
  );
};

export default LessonTitle;