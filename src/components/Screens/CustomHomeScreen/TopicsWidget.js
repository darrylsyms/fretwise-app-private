import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Platform
} from "react-native";
import { withNavigation } from 'react-navigation';
import { globalStyle, GUTTER } from "@src/styles/global";
import { isTabletOrIPad } from "@src/utils";
import { connect, useSelector } from "react-redux";
import TopicSkeleton from '../../Global/SkeletonLoaders/TopicsPlaceholder';
import { saveHotTopics } from "../../../state/actions/hotTopics";
import { getHotTopics } from "../../../services/Hot_Topics.service";

const Component = (props) => {

    const state = useSelector((state) => state);
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;

    useEffect(() => {
        async function fetchHotTopics() {
            const response = await getHotTopics(props.config);
            props.dispatch(saveHotTopics(response));
        }
        fetchHotTopics();
    }, [])

    const hotTopicCacheById = state.hotTopicCache.byId;

    const goToTopic = (topicId) => {
        const topicItem = state.hotTopicCache.byId.get(topicId ? topicId.toString() : "");
        props.navigation.navigate({
            routeName: "TopicsSingleScreen",
            params: {
                topic: topicItem
            },
            key: `TopicsSingleScreen-${topicItem.id.toString()}`
        })
    }

    const RenderItems = () => {
        const topicArray = [];
        hotTopicCacheById.map((topic) => {
            topicArray.push(topic);
        });
        return topicArray.map((topic, i) => {

            const forumTitle = topic._embedded.forum[0].title.rendered;

            const StyleTagBg = () => {
                if (forumTitle == 'Class Hangout') return (styles.tagClassHangout)
                if (forumTitle == 'General Discussion' || forumTitle == 'General') return (styles.tagGeneral)
                if (forumTitle == 'Show & Tell') return (styles.tagShowTell)
                if (forumTitle == 'Gear Talk') return (styles.tagGearTalk)
                //else
                return (styles.tagOther)
            }

            const StyleTagText = () => {
                if (forumTitle == 'Class Hangout') return (styles.tagTextClassHangout)
                if (forumTitle == 'General Discussion' || forumTitle == 'General') return (styles.tagTextGeneral)
                if (forumTitle == 'Show & Tell') return (styles.tagTextShowTell)
                if (forumTitle == 'Gear Talk') return (styles.tagTextGearTalk)
                //else
                return (styles.tagTextOther)
            }

            const ShortContent = () => {
                // Remove HTML tags from short content.
                return topic.short_content.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
              }

            return (
                <View key={topic.id} style={[i == 0 ? {paddingBottom: 25, paddingTop: 5} : {paddingVertical: 25}, { borderBottomWidth: 0.5, borderBottomColor: '#d6d6d6' }]}>
                    <TouchableWithoutFeedback onPress={() => goToTopic(topic.id)}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ width: '65%', paddingRight: 20 }}>
                                <View>
                                    <View style={StyleTagBg()}>
                                        <Text style={StyleTagText()}>{forumTitle}</Text>
                                    </View>
                                    <Text style={[global.widgetItemTitle, { marginBottom: 15 }]}>{topic.title.rendered}</Text>
                                    <Text style={[global.textAlt, { marginBottom: 15, lineHeight: 20 }]} numberOfLines={3} ellipsizeMode={"tail"}><ShortContent /></Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../../assets/img/metadata/topic-replies.png')}
                                        style={{
                                            height: 12,
                                            width: 12,
                                            marginRight: 4
                                        }}
                                    />
                                    <Text style={[global.itemMeta]}>by {topic._embedded.user[0].name}</Text>
                                </View>
                            </View>

                            <View style={{ width: '35%' }}>
                                <Image
                                    source={{ uri: topic.image }}
                                    style={{
                                        width: '100%',
                                        height: isTabletOrIPad() ? 230 : 140,
                                        borderRadius: 14
                                    }}
                                />
                            </View>

                        </View>

                    </TouchableWithoutFeedback>
                </View>
            )
        })
    }

    return (
        <>
            {!hotTopicCacheById ? (
                        <View style={{ flex: 1, marginHorizontal: GUTTER }}>
                            <TopicSkeleton />
                            <TopicSkeleton />
                        </View>
                    ) : (
                    <View style={{ marginHorizontal: GUTTER }}>
                        <RenderItems />
                    </View>
            )}
        </>
    );

};

const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});

const TopicsWidget = withNavigation(Component)
export default connect(mapStateToProps)(TopicsWidget);

// Styles
const tagStyle = {
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 6,
    marginBottom: 10
}
const widgetProgressItemText = {
    fontFamily: "Nunito-Bold",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 11.839285714285715,
}

const styles = StyleSheet.create({
    //Purple
    tagClassHangout: {
        backgroundColor: '#F0DBEC',
        ...tagStyle,
    },
    tagTextClassHangout: {
        color: '#C3449F',
        ...widgetProgressItemText
    },
    //Red
    tagShowTell: {
        backgroundColor: '#f6d9d9',
        ...tagStyle,
    },
    tagTextShowTell: {
        color: '#F3463F',
        ...widgetProgressItemText
    },
    //Yellow
    tagGearTalk: {
        backgroundColor: '#F9EEDE',
        ...tagStyle,
    },
    tagTextGearTalk: {
        color: '#F8A043',
        ...widgetProgressItemText
    },
    //Green
    tagGeneral: {
        backgroundColor: '#D9F6E8',
        ...tagStyle,
    },
    tagTextGeneral: {
        color: '#42A150',
        ...widgetProgressItemText
    },
    //else Blue
    tagOther: {
        backgroundColor: '#D8E0F1',
        ...tagStyle,
    },
    tagTextOther: {
        color: '#3D62A3',
        ...widgetProgressItemText
    },
});