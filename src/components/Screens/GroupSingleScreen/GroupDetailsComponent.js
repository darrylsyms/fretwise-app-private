import React from "react";
import { View, Text, Animated } from "react-native";
import HTML from "react-native-render-html";
import {
    groupMembersCountTranslation,
    groupStatusTranslation
} from "@src/utils"; //BuddyBoss translation helper functions
import GroupActionSheetWrapper from "@src/components/Group/GroupActionSheetWrapper";
import { DEVICE_WIDTH, GUTTER } from "@src/styles/global";

const widthWithGutter = DEVICE_WIDTH - GUTTER * 2;

const GroupDetailsComponent = ({ global, colors, group, truncated, textStyle, t, filteredActions, onLinkPress }) => {
    return (
        <>
            <Text
                numberOfLines={2}
                style={[
                    global.textHeaderTitle,
                    {
                        textAlign: "center",
                        marginHorizontal: GUTTER,
                        //maxWidth: widthWithGutter,
                        marginTop: 0,
                        marginBottom: 3
                    },
                    textStyle
                ]}
            >
                {group.title}
            </Text>
            <Animated.View
                style={[
                    global.screenMetas,
                    {
                        marginTop: 0,
                        marginBottom: 11
                    }
                ]}
            >
                <Text
                    style={[
                        global.textHeaderMeta,
                        { maxWidth: widthWithGutter, textAlign: "center", opacity: 0.8 },
                        textStyle
                    ]}
                >
                    {groupStatusTranslation(t, group)} •{" "}
                    {groupMembersCountTranslation(t, group)}
                </Text>
            </Animated.View>
            {!!group.shortContent && (
                <Animated.View style={{ maxWidth: 300 }}>
                    <GroupActionSheetWrapper
                        actionButtons={filteredActions}
                        {...{
                            global,
                            colors,
                            t,
                            group,
                            onLinkPress
                        }}
                    >
                        <View>
                            <HTML
                                html={group.contentRendered}
                                tagsStyles={{
                                    p: { marginTop: 0, textAlign: 'center' }, // TODO - test! The text must be center aligned.
                                    a: global.textHeaderShortContent
                                }}
                                baseFontStyle={{
                                    ...global.textHeaderShortContent,
                                    ...textStyle
                                }}
                                onLinkPress={(event, url) => {
                                    if (onLinkPress) {
                                        onLinkPress(event, url);
                                    }
                                }}
                            />
                        </View>
                    </GroupActionSheetWrapper>
                </Animated.View>
            )}
        </>
    )
};

export default GroupDetailsComponent;
