import React from "react";
import { Platform, View, Text, Image } from "react-native";
import { DEVICE_WIDTH } from "@src/styles/global";
import {
	SAFE_AREA_BOTTOM,
	IOS_HOME_INDICATOR,
	LESSON_ACTION_BUTTON_HEIGHT,
	LESSON_ACTION_BUTTON_TEXT_MARGIN,
	LESSON_ACTION_BUTTON_ICON_MARGIN
} from "./styles/global";
import { isTabletOrIPad } from "@src/utils";
import { NavigationActions } from 'react-navigation';
// * Screens * //
import DownloadedCoursesScreen from "@src/containers/DownloadedCoursesScreen";
import DailyChallengesScreen from './containers/screens/DailyChallengesScreen';
import TopicsScreeen from "./containers/screens/TopicsScreen";
import CustomCourseCategoriesScreen from "./containers/screens/CustomCourseCategoriesScreen";
import MessagesListScreen from "./containers/screens/MessagesListScreen";
import CustomHomeScreen from "./containers/screens/CustomHomeScreen";
import OnboardingScreen from "./containers/screens/OnboardingScreen";
import MoreScreeen from "./containers/screens/CustomMoreScreen";
// * List Items * //
import BlogItem from "./components/ListItems/BlogItem";
import TopicItem from "./components/ListItems/TopicItem";
import ItemHeader from "./components/Screens/TopicsSingleScreen/TopicHeaderItem"
// * Components * //
import LessonTitle from "./components/Screens/LessonSingleScreen/LessonTitle";
import TopicTitle from "./components/Screens/LearnTopicSingleScreen/TopicTitle";
import PrevNextLessons from './components/Screens/LessonSingleScreen/PrevNextButtonsLesson';
import PrevNextTopics from "./components/Screens/LearnTopicSingleScreen/PrevNextButtonsTopic";
import ContentHeadingsBlock from "./components/Global/CoreHeadingBlock";
import ImageComponent from "./components/Global/CoreImageBlock";
import IndexScreenHeaderHeight from "./components/Global/AnimatedHeaderHeight";
import CourseHeaderItems from "./components/Screens/CourseSingleScreen/CourseHeaderDetails";
import CourseActionButton from "@src/components/Course/CourseActionButton";
import FilterBarComponents from "./components/Global/ReplaceFilterBarComponent";
import CustomTabBarBottom from "./components/Global/TabBarBottom";
import ForumHeaderButtons from './components/Screens/ForumsSingleScreen/ForumHeaderRightButtons';
import AfterProfileDetails from "./components/Screens/ProfileScreen/AfterProfileDetails";
import ProfileHeaderButton from "./components/Screens/ProfileScreen/ProfileHeaderRightButton";
import UserProfileAvatar from "./components/Screens/ProfileScreen/ProfileSubscriberBadge";
import HomeHeaderRight from "./components/Screens/TopicsScreen/HeaderRight";
import EmbedsComponent from "./components/Global/CoreEmbedBlock";
import AnimatedHeaderTitle from "./components/Global/AnimatedHeaderTitle";
import GroupDetailsComponent from "./components/Screens/GroupSingleScreen/GroupDetailsComponent";
// * Reducers * //
import hotTopicsReducer from './state/reducers/hotTopics.reducer';
import coursesReducer from './state/reducers/courses.reducer';
import courseCategoriesReducer from './state/reducers/courseCategories.reducer';
import forumsReducer from './state/reducers/forums.reducer';
import welcomeMessagesReducer from "./state/reducers/welcomeMessages.reducer";
import courseIncludesReducer from "./state/reducers/courseIncludes.reducer"
import SpacerComponent from "./components/Global/CoreSpacerBlock";
import MessageText from "./components/Screens/MessagesScreen/MessageContents";

import ReplyItemContent from "./components/Screens/TopicsSingleScreen/ReplyItemContent";
import ReplyItemAvatar from "./components/Screens/TopicsSingleScreen/ReplyItemAvatar";
import { ScreenNames } from "./data/ScreensWithoutTabBar";

import LessonActionComponent from "./components/Screens/LessonSingleScreen/LessonBottomActionButton";
import LearnTopicActionComponent from "./components/Screens/LearnTopicSingleScreen/TopicBottomActionButton";


import HTML from "react-native-render-html";
import ReadMore from "@src/components/ReadMore";
import {
    alterChildrenHTML
} from "@src/utils";
import { aTagRenderer } from "@src/utils/htmlRender";

export const applyCustomCode = externalCodeSetup => {

	externalCodeSetup.topicsApi.setReplyItemContent(props => <ReplyItemContent {...props} />)
	externalCodeSetup.topicsApi.setReplyItemAvatar(props => <ReplyItemAvatar {...props} />)

	externalCodeSetup.topicSingleApi.setTopicContentComponent(({
        colors,
        content,
        global,
        t,
        tagsStyles,
        attemptDeepLink,
        computedWidth,
        topic
    }) => {

        return <View style={{ marginTop: -4 }}>
            <ReadMore
                colors={colors}
                content={content}
                size={1000}
                t={t}
                global={global}
                style={{ marginBottom: 20 }}
            >
                {content => (
                    <HTML
                        html={content}
                        tagsStyles={{
                            ...tagsStyles,
							p: {
								marginBottom: 0
							},
							ul: {
                                marginTop: 5
                            },
                            iframe: {
                                marginTop: 10,
                                marginBottom: 10
                            }
                        }}
                        baseFontStyle={global.textHtml}
                        onLinkPress={attemptDeepLink}
                        staticContentMaxWidth={computedWidth}
                        alterChildren={alterChildrenHTML(computedWidth)}
                        renderers={{
                            a: aTagRenderer(computedWidth)
                        }}
                    />
                )}
            </ReadMore>
        </View>
    })
	externalCodeSetup.lessonSingleScreenApi.setLessonActionComponent(props => <LessonActionComponent {...props} />)
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicActionComponent(props => <LearnTopicActionComponent {...props} />)

	/*-----------------------------------------------------------------------------------*/
	/* BUG FIX */
	/*-----------------------------------------------------------------------------------*/

	if (Platform.OS === 'android') {
		const BlogHeaderAvatar = ({ blog, global, textStyle }) => {
			return (
				<View style={[global.row, { flex: 1 }]}>
					<Image
						source={require('./assets/img/branding/darryl-avatar.jpg')}
						style={{ marginRight: 10, width: 35, height: 35, borderRadius: 35 }}
					/>
					<View>
						<Text
							style={[global.semiboldText, textStyle]}>
							Darryl
						</Text>
						<Text style={[global.textMeta, textStyle]}>{blog.date}</Text>
					</View>
				</View>
			);

		}
		externalCodeSetup.blogSingleApi.setBlogHeaderAvatar(BlogHeaderAvatar);
	}


	/*-----------------------------------------------------------------------------------*/
	/* GLOBAL */
	/*-----------------------------------------------------------------------------------*/

	// 0. Add To State
	externalCodeSetup.reduxApi.addReducer(
		"courseIncludesCache",
		courseIncludesReducer
	);

	externalCodeSetup.reduxApi.addReducer(
		"welcomeMessagesCache",
		welcomeMessagesReducer
	);

	externalCodeSetup.reduxApi.addReducer(
		"hotTopicCache",
		hotTopicsReducer
	);

	externalCodeSetup.reduxApi.wrapReducer(
		"forumsCache",
		forumsReducer
	);

	externalCodeSetup.reduxApi.wrapReducer(
		"courseCategories",
		courseCategoriesReducer
	);

	externalCodeSetup.reduxApi.wrapReducer(
		"coursesCache",
		coursesReducer
	);

	// 1. Remove Search Component From ForumsScreen
	externalCodeSetup.forumsHooksApi.setShowSearch((bbSetting) => false);

	// 2. Custom Tab Bar Bottom
	//externalCodeSetup.navigationApi.setBottomTabBar((props) => <CustomTabBarBottom {...props} />);

	// 3. Custom Core Block Components
	externalCodeSetup.blocksApi.addCustomBlockRender("core/heading", (props) => <ContentHeadingsBlock {...props} />);
	if (!isTabletOrIPad()) {
		externalCodeSetup.blocksApi.addCustomBlockRender("core/image", (props) => <ImageComponent {...props} />);
	}
	externalCodeSetup.blocksApi.addCustomBlockRender("core/embed", (props) => <EmbedsComponent {...props} />);
	externalCodeSetup.blocksApi.addCustomBlockRender("core/spacer", (props) => <SpacerComponent {...props} />);



	// 4. Hide Tab Bar From These Screens
	externalCodeSetup.navigationApi.setScreensWithoutTabBar(ScreenNames)

	// 5. Set Header Height Across App Index Screens
	externalCodeSetup.indexScreenApiHooks.setHeaderHeight(IndexScreenHeaderHeight);


	/*-----------------------------------------------------------------------------------*/
	/* FORUMS */
	/*-----------------------------------------------------------------------------------*/

	// 0. Insert headerRight button on Topics Screen.
	externalCodeSetup.indexScreenApiHooks.setRenderHeaderRight(props => <HomeHeaderRight {...props} />);

	// 1. Replace headerRight default button with: "Create Topic".
	externalCodeSetup.forumSingleHooksApi.setHeaderRightComponent(({ t, forum, colors, global, headerColor, actionButtons, ...rest }) => {
		return <ForumHeaderButtons forum={forum} actionButtons={actionButtons} t={t} />
	})

	// 2. Custom Topic & Forum Item Layout
	externalCodeSetup.topicsApi.setTopicItemComponent(props => <TopicItem {...props} />)
	externalCodeSetup.topicsApi.setTopicItemHeader(props => <ItemHeader {...props} />)

	// 3. Add headerRight to Topics Screen
	externalCodeSetup.indexScreenApiHooks.setAnimatedListHeaderTitleComponent(({ title, subtitle, global, titleStyle }) => {
		return <AnimatedHeaderTitle title={title} subtitle={subtitle} global={global} titleStyle={titleStyle} />
	});

	// 4. Groups
	externalCodeSetup.socialGroupSingleApi.setGroupDetailsComponent(GroupDetailsComponent)


	/*-----------------------------------------------------------------------------------*/
	/* COURSES */
	/*-----------------------------------------------------------------------------------*/

	// 1. Remove unnecessary CourseSingleScreen action button.
	externalCodeSetup.courseSingleApi.setTransformCourseActionButtons((
		CourseActionBtn,
		courseVM,
		t,
		colors,
		global,
		products,
		navigation,
		startCourse,
		continueCourse,
		priceComponentRender
	) => {

		const goToProducts = () => {
			const prods = products[0][1]
			navigation.dispatch(
				NavigationActions.navigate({
					routeName: "ProductsScreen",
					params: {
						prods
					},
				})
			)
		}

		const SubscribeButton =
			<View style={{
				paddingHorizontal: 20,
				paddingVertical: 16,
				marginBottom: 30, // bug fix
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between"
			}}>
				<CourseActionButton
					title={"Subscribe for all access!"}
					onPress={() => goToProducts()}
					style={{ backgroundColor: colors.headerBg }}
				/>
			</View>

		const DefaultButton =
			<View style={{
				marginBottom: Platform.OS === 'ios'
					? 20
					: 0
			}}>
				{CourseActionBtn}
			</View>

		if (!courseVM.hasAccess) return DefaultButton //TODO - change for SubscribeButton

	})

	// 2. Lesson/Topic Title changes
	externalCodeSetup.lessonSingleScreenApi.setLessonTitleComponent(props => <LessonTitle {...props} />)
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicTitleComponent(props => <TopicTitle {...props} />)

	// 3. Custom Prev/Next Buttons
	externalCodeSetup.lessonSingleScreenApi.setPrevNextComponent(props => <PrevNextLessons {...props} />);
	externalCodeSetup.learnTopicSingleScreenApi.setPrevNextComponent((props) => <PrevNextTopics {...props} />);

	// 4. Lesson / Topic Container - Full Width Videos
	externalCodeSetup.cssApi.addGlobalStyle("lessonSingleScreenBlockContainer", { paddingHorizontal: 0 }, true);
	externalCodeSetup.cssApi.addGlobalStyle("learnTopicSingleScreenBlockContainer", { paddingHorizontal: 0 }, true);
	externalCodeSetup.cssApi.addGlobalStyle("videoBlockContainer", { paddingHorizontal: 0 });

	externalCodeSetup.blocksApi.setBlockProps("core/embed", (props) => {
		const { block } = props;
		if (block.data.provider === "vimeo" || block.data.provider === "youtube") {
			return {
				...props,
				viewWidth: DEVICE_WIDTH
			}
		}
		return props;
	});


	// 5. Header Details
	externalCodeSetup.courseSingleApi.setCourseHeaderDetails(props => <CourseHeaderItems {...props} />)


	/*-----------------------------------------------------------------------------------*/
	/* MORE SCREEN */
	/*-----------------------------------------------------------------------------------*/

	// 1. Adds Gamipress info after profile Header
	externalCodeSetup.profileScreenHooksApi.setAfterDetailsComponent(AfterProfileDetails)

	// 2. Adds badge to Profile Avatar if subscribed
	externalCodeSetup.profileScreenHooksApi.setUserAvatar(UserProfileAvatar)

	// 3. Settings Menu List. Removes "Export Data"
	externalCodeSetup.settingsScreenApi.setSettingsListFilter((oldTabs, props) => {
		return [
			oldTabs[0],
			oldTabs[1],
			oldTabs[2],
			oldTabs[3],
			oldTabs[4],
			oldTabs[5],
			oldTabs[6],
			oldTabs[7],
			oldTabs[9],
			oldTabs[10],
		]
	})

	// 4. Add headerRight Button On Profile Screen
	externalCodeSetup.profileScreenHooksApi.setHeaderRightComponent(() => <ProfileHeaderButton />)

	// 5. Profile Items
	externalCodeSetup.profileScreenHooksApi.setIgnoreTabsFilter((
		list,
		isOwnAccount
	) => [
			...list,
			"courses"
		])

	externalCodeSetup.messagesSingleScreenApi.setThreadItemText((props) => <MessageText {...props} />);

	/*-----------------------------------------------------------------------------------*/
	/* BLOG */
	/*-----------------------------------------------------------------------------------*/

	// 1. Item List Appearance
	externalCodeSetup.blogApi.setBlogItemComponent(props => <BlogItem {...props} />)

	// 2. Hide Search Component
	externalCodeSetup.blogApi.hideSearch();



	/*-----------------------------------------------------------------------------------*/
	/* COSMETIC STYLES */
	/*-----------------------------------------------------------------------------------*/

	externalCodeSetup.cssApi.addGlobalStyle("xProfileItemTitle", { fontSize: 18, paddingBottom: 10 });
	externalCodeSetup.cssApi.addGlobalStyle("xProfileItemValue", { fontSize: 15 });
	externalCodeSetup.cssApi.addGlobalStyle("xProfileItemTextArea", { fontSize: 14 });
	externalCodeSetup.cssApi.addGlobalStyle("localVideoContainer", { borderRadius: 14 }, true);
	externalCodeSetup.cssApi.addGlobalStyle("localVideoPlayer", { borderRadius: 14 }, true);
	externalCodeSetup.cssApi.addGlobalStyle("offlineVideoContainer", { borderRadius: 14 }, true);
	// Lesson Bottom Action Button
	externalCodeSetup.cssApi.addGlobalStyle("lessonActionButtonContainer", { paddingHorizontal: 0, paddingVertical: 0, marginBottom: -SAFE_AREA_BOTTOM });
	externalCodeSetup.cssApi.addGlobalStyle("completeLessonButtonW", { borderRadius: 0, height: LESSON_ACTION_BUTTON_HEIGHT });
	externalCodeSetup.cssApi.addGlobalStyle("completeLessonButton", { marginLeft: 0, marginBottom: Platform.OS === 'ios' ? 15 : 0 });
	externalCodeSetup.cssApi.addGlobalStyle("completeButton", { marginBottom: LESSON_ACTION_BUTTON_TEXT_MARGIN }); // lesson complete text
	externalCodeSetup.cssApi.addGlobalStyle("lessonActionCompleteIcon", { marginBottom: LESSON_ACTION_BUTTON_ICON_MARGIN, width: 30, height: 30 });
	externalCodeSetup.cssApi.addGlobalStyle("lessonButtonLoadingIcon", { marginBottom: IOS_HOME_INDICATOR, left: -5 });
	// Topic Bottom Action Button
	externalCodeSetup.cssApi.addGlobalStyle("learnTopicActionButtonContainer", { paddingHorizontal: 0, paddingVertical: 0, marginBottom: -SAFE_AREA_BOTTOM });
	externalCodeSetup.cssApi.addGlobalStyle("completeTopicButtonW", { borderRadius: 0, height: LESSON_ACTION_BUTTON_HEIGHT });
	externalCodeSetup.cssApi.addGlobalStyle("completeTopicButton", { marginBottom: LESSON_ACTION_BUTTON_TEXT_MARGIN, fontWeight: '600', }); // topic complete text
	externalCodeSetup.cssApi.addGlobalStyle("learnTopicActionCompleteIcon", { marginBottom: LESSON_ACTION_BUTTON_ICON_MARGIN, width: 30, height: 30 });
	externalCodeSetup.cssApi.addGlobalStyle("learnTopicButtonLoadingIcon", { marginBottom: IOS_HOME_INDICATOR, left: -5 });


	/*-----------------------------------------------------------------------------------*/
	/* FILTER COMPONENT */
	/*-----------------------------------------------------------------------------------*/

	// 1. Set default sorting order in Courses lists.
	externalCodeSetup.coursesHooksApi.setSubFiltersFilter((filters) => {
		return ['my_progress', 'recent', 'title'];
	})

	// 2. Set default sorting order in Course Categories lists.
	externalCodeSetup.coursesHooksApi.setCategoriesSubFiltersFilter((filters) => {
		return ["date", "title"];
	})

	// 3. Forum Sub Filters
	externalCodeSetup.forumsHooksApi.setSubFiltersFilter((filters) => {
		return ["popular", "activity"];
	});

	// 4. Adjust Filters Order
	externalCodeSetup.topicsApi.setSubFiltersFilter((filters) => {
		return ["activity", "date", "popular"];
	})

	// 5. Replace Filter Bar components
	externalCodeSetup.filterScreenApiHooks.setFilterComponent(props => <FilterBarComponents {...props} />)

	// 6. Remove "filter icon"
	externalCodeSetup.filterScreenApiHooks.setFilterAllButtonHidden(filterType => true);


	/*-----------------------------------------------------------------------------------*/
	/* NAVIGATION RULES */
	/*-----------------------------------------------------------------------------------*/

	// 1. Replace Default Screens
	externalCodeSetup.navigationApi.replaceScreenComponent("blog", DailyChallengesScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("BlockScreen", CustomHomeScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("courses_category", CustomCourseCategoriesScreen);
	//externalCodeSetup.navigationApi.replaceScreenComponent("GroupsScreen", GroupsScreeen); // TODO - this doesnt work. neither "GroupsScreen" or "groups"
	externalCodeSetup.navigationApi.replaceScreenComponent("my_library", DownloadedCoursesScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("messages", MessagesListScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("HomeTopicsScreen", TopicsScreeen);
	externalCodeSetup.navigationApi.replaceScreenComponent("topics", TopicsScreeen);

	// 2. Custom App Welcome Screen Navigation Properties
	externalCodeSetup.navigationApi.setAnimatedSwitchNavigator((routes, options, routeProps) => {

		const feature = routeProps.settings.features.multisite_network;
		const hasMultiSite = Platform.select({
			ios: feature.is_enabled_ios,
			android: feature.is_enabled_android
		})

		const getInitialSwitchRoute = () => {

			const myCustomRoute = "OnboardingScreen"

			if (!routeProps.hasValidSigning) {
				return "InvalidSigningScreen";
			}

			if (routeProps.shouldEnforceVersionControl) {
				return "VersionControlScreen";
			} else if (routeProps.isLoggedIn) {
				if (
					routeProps.isFeatureEnabled(hasMultiSite) &&
					routeProps.sites.selectedSite === null
				) {
					return "AuthSiteSelectionScreen";
				} else {
					return routeProps.shouldLockApp ? "AppLockScreen" : "noAuth";
				}
			}
			else {
				return myCustomRoute; //Use my own custom route instead of the default "Auth" route
			}

		};

		const newRoutes = {
			...routes,
			OnboardingScreen: {
				screen: OnboardingScreen
			}
		}

		const newOptions = {
			...options,
			initialRouteName: getInitialSwitchRoute()
		}

		return {
			routes: newRoutes,
			options: newOptions,
		}

	})

};