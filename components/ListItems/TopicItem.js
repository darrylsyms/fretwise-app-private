import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Image
} from 'react-native';
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { getAvatar } from "@src/utils";
import AuthWrapper from "@src/components/AuthWrapper";
import ActionSheetButton from "@src/components/ActionButtons/ActionSheetButton";
import { GUTTER } from "@src/styles/global";
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import AvatarSpecial from '../Global/SmallComponents/AvatarSpecial';

const TopicItem = (props) => {

    const { topic, styles, actionButtons, formatDateFunc, t } = props;

    const state = useSelector((state) => state);
    const user = state.user?.userObject;

    const global = styles.global;
    const colors = styles.colors;

    let rootStyle;

    if (topic.actionStates.sticky) rootStyle = [{
        //...global.itemSticky
        backgroundColor: "#fff1e6",
        borderLeftColor: "#ef6e00",
        borderLeftWidth: 3,
    }];

    if (!topic.actionStates.open) rootStyle = [{
        //...global.itemClosed
        opacity: 0.9,
        backgroundColor: "#f2f2f2",
        borderLeftColor: "#b7b7b7",
        borderLeftWidth: 3,
    }];

    const hash = JSON.parse(props.topic.hash);
    const gamiWisdomImage = hash?._embedded.user[0]?.user_points[0]?.image;
    const gamiWisdomPoints = hash?._embedded.user[0]?.user_points[0]?.point;
    const gamiPostsImage = hash?._embedded.user[0]?.user_points[1]?.image;
    const gamiPostsPoints = hash?._embedded.user[0]?.user_points[1]?.point;

    const UserPosts = () => {
        if (gamiPostsPoints == 1) {
            return <Text style={global.itemMeta}>{gamiPostsPoints} Post</Text>
        }
        return <Text style={global.itemMeta}>{gamiPostsPoints} Posts</Text>
    }

    let ProfileType;
    if(hash?._embedded.user[0]?.member_types) ProfileType = Object.keys(hash?._embedded.user[0]?.member_types)[0];
    if(!hash?._embedded.user[0]?.member_types) ProfileType = "visitor";
    const SubscriberRoles = ["instructor", "admin", "subscriber", "member"];
    const isSubscriber = SubscriberRoles.includes(ProfileType);

    const forumTitle = props.topic.forumTitle;

    const StyleTag = () => {
        if (!props.navigation?.state?.params?.forum) {
            if (forumTitle == 'Class Hangout') {
                //Purple
                return (
                    <View style={{ backgroundColor: '#F0DBEC', ...tagStyle }}>
                        <Text style={[global.widgetProgressItemText, { color: '#C3449F' }]}>
                            {forumTitle}
                        </Text>
                    </View>
                )
            }
            if (forumTitle == 'General Discussion') {
                //Green
                return (
                    <View style={{ backgroundColor: '#D9F6E8', ...tagStyle }}>
                        <Text style={[global.widgetProgressItemText, { color: '#42A150' }]}>
                            {forumTitle}
                        </Text>
                    </View>
                )
            }
            if (forumTitle == 'Show & Tell') {
                //Red
                return (
                    <View style={{ backgroundColor: '#f6d9d9', ...tagStyle }}>
                        <Text style={[global.widgetProgressItemText, { color: '#F3463F' }]}>
                            {forumTitle}
                        </Text>
                    </View>
                )
            }
            if (forumTitle == 'Gear Talk') {
                //Yellow
                return (
                    <View style={{ backgroundColor: '#F9EEDE', ...tagStyle }}>
                        <Text style={[global.widgetProgressItemText, { color: '#F8A043' }]}>
                            {forumTitle}
                        </Text>
                    </View>
                )
            }
            // else Blue
            return (
                <View style={{ backgroundColor: '#D8E0F1', ...tagStyle }}>
                    <Text style={[global.widgetProgressItemText, { color: '#3D62A3' }]}>
                        {forumTitle}
                    </Text>
                </View>
            )
        }
        return <View style={{ paddingVertical: 10 }} />
    }

    const topicReplyCount = () => {
        const stripNumbers = topic.replyCount.replace(/[^0-9]/g, '');
        return stripNumbers;
    }

    const Item = useMemo(() => {
        return (
            <AppTouchableOpacity onPress={user ? topic.toSingle : {}} style={[rootStyle]}>
                <View>
                    <Animated.View
                        style={{
                            ...StyleSheet.absoluteFillObject
                        }}
                    />
                    <StyleTag />
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: GUTTER,
                        paddingBottom: 14,
                    }}>
                        <AvatarSpecial
                            isSubscriber={isSubscriber}
                            size={42}
                            source={{
                                uri: getAvatar(topic.author.avatar, 96)
                            }}
                            name={topic.author.name}
                        />
                        <View style={{}}>
                            <Text style={{ fontWeight: "Bold", marginBottom: 4, ...global.itemTitle }}>{topic.author.name}</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                <Image style={{ width: 13, height: 13, marginRight: 3 }} source={{ uri: gamiWisdomImage }} />
                                <Text style={global.itemMeta}>{gamiWisdomPoints} Wisdom</Text>
                                <Image style={{ width: 13, height: 13, marginRight: 3, marginLeft: 5 }} source={{ uri: gamiPostsImage }} />
                                <UserPosts />
                            </View>
                        </View>
                        <View style={{ position: 'absolute', right: 22, alignSelf: 'center' }}>
                            <AuthWrapper actionOnGuestLogin={"hide"} >
                                <ActionSheetButton
                                    color={colors.textIconColor}
                                    object={topic}
                                    colors={colors}
                                    actionButtons={actionButtons}

                                    headerProps={{
                                        onClick: topic.toSingle,
                                        title: topic.title,
                                        description: t("topics:lastActive", {
                                            date: formatDateFunc(topic.lastActive)
                                        }),
                                        avatarSource: {
                                            uri: getAvatar(topic.author.avatar, 96)
                                        }
                                    }}
                                    global={global}
                                    t={t}
                                />
                            </AuthWrapper>
                        </View>
                    </View>
                    <View
                        style={{
                            ...global.row,
                            flex: 1,
                            marginHorizontal: GUTTER,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginLeft: 10
                            }}
                        >
                            <View
                                style={[
                                    {
                                        flex: 1,
                                        paddingBottom: 10,
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                        ...global.bottomBorder
                                    }
                                ]}
                            >
                                <View style={{
                                    borderLeftWidth: 2,
                                    borderLeftColor: "red",
                                    marginBottom: 8
                                }}>
                                    <Text
                                        style={{
                                            ...global.itemTitle,
                                            paddingRight: 40,
                                            marginLeft: 5,
                                        }}
                                        numberOfLines={2}
                                        ellipsizeMode={"tail"}
                                    >
                                        {topic.title}
                                    </Text>
                                </View>
                                {topic.topicTags !== "" && (
                                    <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 8 }}>
                                        <Image source={require('../../assets/img/metadata/topic-tags.png')} style={{ marginRight: 6, height: 14, width: 14 }} />
                                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={global.itemMeta}>{topic.topicTags}</Text>
                                    </View>
                                )}
                                <Text
                                    style={{
                                        ...global.textAlt,
                                        paddingBottom: 10,
                                        marginRight: 20,
                                        lineHeight: 20
                                    }}
                                    numberOfLines={3}
                                    ellipsizeMode={"tail"}
                                >
                                    {topic.shortContent}
                                </Text>
                                <View style={{ ...global.row, marginBottom: 6 }}>
                                    <Image source={require('../../assets/img/metadata/topic-replies.png')} style={{ marginRight: 6, height: 14, width: 14 }} />
                                    <Text style={global.itemMeta}>
                                        {topicReplyCount() == 0
                                            ? "This topic has no replies yet."
                                            : topicReplyCount() == 1
                                                ? "1 Reply"
                                                : `${topicReplyCount()} Replies`
                                        }
                                    </Text>
                                    {topicReplyCount() !== 0 && (
                                        <>
                                            <Image source={require('../../assets/img/metadata/topic-views.png')} style={{ marginLeft: 12, marginRight: 6, height: 14, width: 14 }} />
                                            <Text style={global.itemMeta}>
                                                {t("topics:lastActive", {
                                                    date: formatDateFunc(topic.lastActive)
                                                })}
                                            </Text>
                                        </>
                                    )}
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </AppTouchableOpacity>
        )
    }, [topic])

    return (
        <View>
            {Item}
        </View>
    );

}

export default withNavigation(TopicItem);


// Style Component
const tagStyle = {
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 6,
    marginHorizontal: GUTTER,
    marginVertical: 20
}