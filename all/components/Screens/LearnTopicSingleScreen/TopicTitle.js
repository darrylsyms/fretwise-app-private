import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from "react-native";
import IconButton from "@src/components/IconButton";
import { DEVICE_WIDTH } from "@src/styles/global";

const TopicTitle = (props) => {

  const {
    topic,
    global,
    colors,
    paddingTop,
    setHeaderHeight,
    t,
    labels,
    lessonOrder
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
          {topic.title}
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
            {topic.title}
          </Text>

          <View style={global.row}>
          <Text style={[global.courseHeaderSubTitle]}>
            {t("lessonTopic:lessoncount", {
              lesson: labels.lesson,
              current: lessonOrder + 1
            })}
          </Text>
          <View
            style={{
              width: 3,
              height: 3,
              marginTop: 2,
              marginLeft: 5,
              marginRight: 4,
              backgroundColor: "#8D8F97",
              borderRadius: 2,
              opacity: 0.45
            }}
          />
            <Text style={[global.courseHeaderSubTitle]}>
              {t("lessonTopic:count", {
                topic: labels.topic,
                current: topic.order
              })}
            </Text>
          </View>

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

export default TopicTitle;