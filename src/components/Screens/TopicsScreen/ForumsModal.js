import React, { useRef, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Modalize } from 'react-native-modalize';
import { globalStyle, GUTTER, DEVICE_WIDTH, DEVICE_HEIGHT } from "@src/styles/global";
import { useSelector } from "react-redux";
import ForumsSkeleton from '../../Global/SkeletonLoaders/ForumsPlaceholder';
import { Portal } from 'react-native-portalize';
import { lastActiveTime } from '../../../styles/utils';

const ForumsModal = (props) => {

    const { toggleBottomSheet, shouldShow, navigation } = props;
    const state = useSelector((state) => state);
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    const MAX_HEADER_HEIGHT = 140;
    const ModalHeight = DEVICE_HEIGHT - MAX_HEADER_HEIGHT;

    const modalizeRef = useRef(null);

    useEffect(() => {
        if (shouldShow) {
            modalizeRef.current?.open();
        }
        return () => { };
    }, [shouldShow]);


    // Forums List is already being called from the TopicActionButton Component
    const forumsCachebyId = state.forumsCache.byId;
    const forumsArray = forumsCachebyId.toArray().sort(function (a, b) {
        return a.menu_order - b.menu_order; // Order the forums according to their set menu_order
    });
    const forumStateMissing = forumsArray.length == 0;


    const goToForum = (forumId) => {
        modalizeRef.current?.close();
        const forumObject = state.forumsCache.byId.get(forumId ? forumId.toString() : "");

        setTimeout(
            () => navigation.dispatch(
                NavigationActions.navigate({
                    routeName: "ForumsSingleScreen",
                    params: {
                        forum: forumObject
                    },
                    key: `ForumsSingleScreen-${forumObject.id.toString()}`
                })
            ),
            400
        );
    }


    const ModalContent = useMemo(() => {
        // 21025198 is the News & Announcements Forum. We do not want to show this in the list.
        return forumsArray.filter(key => ![21025198].includes(key.id)).map((forum, i) => {
            return (
                <View key={forum.id} style={{ marginHorizontal: GUTTER }}>
                    <TouchableWithoutFeedback
                        onPress={() => goToForum(forum.id)}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingVertical: 20,
                            ...global.bottomBorder
                        }}>
                            <View
                                style={[
                                    global.row,
                                    { justifyContent: "space-between", flex: 1, alignItems: "flex-start" }
                                ]}
                            >
                                <View style={[styles.imageWrapper]}>
                                    <Image
                                        style={[
                                            styles.imageStyle,
                                            { borderColor: "rgba(0,0,0,0.08)", borderWidth: 1 }
                                        ]}
                                        resizeMode="cover"
                                        source={{ uri: forum.featured_media.thumb }}
                                    />
                                </View>

                                <View style={[
                                    styles.infoContainer
                                ]}>
                                    <Text
                                        numberOfLines={2}
                                        style={[global.itemTitle, { color: colors.headingsColor, paddingBottom: 5 }]}
                                    >
                                        {forum.title.rendered}
                                    </Text>

                                    <Text style={[global.textAlt, { paddingBottom: 5 }]}>{forum.content.rendered.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim()}</Text>

                                    <View style={{ flex: 1 }} />
                                    <View style={global.row}>
                                        <Image source={require('../../../assets/img/metadata/topic-views.png')} style={{ marginRight: 6, height: 14, width: 14 }} />
                                        <Text style={global.itemMeta}>Last activity {lastActiveTime(forum.last_active_time)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        })
    }, [forumsArray])

    const ContentRenderer = () => {
        if (forumStateMissing) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <ForumsSkeleton />
                    <ForumsSkeleton />
                    <ForumsSkeleton />
                    <ForumsSkeleton />
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {ModalContent}
            </SafeAreaView>
        )
    }

    const RenderHeader = (
        <View style={[global.bottomBorder, {
            //backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backgroundColor: colors.headerBg,
            height: 60,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        }]}>
            <Text style={[global.widgetTitle, {
                color: '#fff',
                marginHorizontal: GUTTER,
                paddingVertical: 15
            }]}>Forums</Text>
        </View>
    )

    return (
        <>
            <Portal>
                <View style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT, flex: 1 }} pointerEvents='box-none'>
                    <Modalize
                        ref={modalizeRef}
                        onClose={() => toggleBottomSheet(false)}
                        //snapPoint={ModalHeight}
                        modalHeight={ModalHeight}
                        HeaderComponent={RenderHeader}
                        //adjustToContentHeight={true}
                        scrollViewProps={{
                            showsVerticalScrollIndicator: true,
                        }}
                    >
                        <ContentRenderer />
                    </Modalize>
                </View>
            </Portal>
        </>
    );
}

export default ForumsModal;

const styles = StyleSheet.create({
    imageWrapper: {
        height: 80,
        width: 80,
        borderRadius: 14,
    },
    imageStyle: {
        height: 80,
        width: 80,
        borderRadius: 14,
        overflow: "hidden"
    },
    infoContainer: {
        marginLeft: 16,
        paddingRight: 16,
        flex: 1,
    },
});