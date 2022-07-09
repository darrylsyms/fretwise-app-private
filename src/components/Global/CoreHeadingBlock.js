import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { GUTTER } from "@src/styles/global";

const ContentHeadingsBlock = (props) => {
    const { block, navigation, global, colors } = props;
    const route = navigation.state.routeName;

    const [widthMain, setWidthMain] = useState();
    const [heightMain, setHeightMain] = useState();
    const [widthSecondary, setWidthSecondary] = useState();
    const [heightSecondary, setHeightSecondary] = useState();

    const onLayout = (event) => {
        const { height, width } = event.nativeEvent.layout;
        setWidthMain(width);
        setHeightMain(height);
    };

    const onLayoutSecondary = (eventSecondary) => {
        const { height, width } = eventSecondary.nativeEvent.layout;
        setWidthSecondary(width);
        setHeightSecondary(height);
    };

    // Only change the heading component within the following routes
    if (['LessonSingleScreen', 'LearnTopicSingleScreen', 'BlogSingleScreen'].includes(route)) {
        if (['h1', 'h2'].includes(block.style.header)) {
            return (
                <View>
                    <View style={{
                        //marginTop: 50,
                        //marginBottom: 10,
                        marginHorizontal: GUTTER,
                    }}>
                        <Text
                            style={[
                                global.assignmentHeading,
                                {
                                    fontSize: 24,
                                    alignSelf: 'flex-start',
                                    zIndex: 1,
                                    elevation: 1
                                }
                            ]}
                            onLayout={onLayout}
                        >
                            {block.content}
                        </Text>
                        <View style={{
                            backgroundColor: colors.headerBg,
                            position: 'absolute',
                            height: heightMain - 8,
                            width: widthMain,
                            //top: -height / 1.5,
                            bottom: 3,
                            opacity: 0.1,
                            borderRadius: 3,
                            transform: [{ rotate: '-1deg' }]
                        }} />
                    </View>
                </View>
            )
        }

        if (['h3', 'h4'].includes(block.style.header)) {
            return (
                <View>
                    <View style={{
                        marginVertical: 5,
                        marginHorizontal: GUTTER,
                    }}>
                        <Text style={[
                            global.assignmentHeading,
                            {
                                fontSize: 18,
                                alignSelf: 'flex-start',
                                zIndex: 1,
                                elevation: 1
                            }
                        ]}
                            onLayout={onLayoutSecondary}
                        >
                            {block.content}
                        </Text>
                        <View style={{
                            backgroundColor: '#ddd',
                            position: 'absolute',
                            height: heightSecondary - 8,
                            width: widthSecondary,
                            //top: -height / 1.5,
                            bottom: 0,
                            opacity: 0.4,
                            borderRadius: 3,
                            transform: [{ rotate: '-1deg' }]
                        }} />
                    </View>
                </View>
            )
        }

    }

    // Else display default
    return (
        <View style={{ marginHorizontal: GUTTER, marginVertical: 25 }}>
            <Text style={global.widgetTitle}>{block.content}</Text>
        </View>
    )
}

export default ContentHeadingsBlock;