import React from "react";
import { Platform, View, Text } from "react-native";
import { DEVICE_WIDTH, GUTTER } from "@src/styles/global";
import {
	SAFE_AREA_BOTTOM,
	IOS_HOME_INDICATOR,
	LESSON_ACTION_BUTTON_HEIGHT,
	LESSON_ACTION_BUTTON_TEXT_MARGIN,
	LESSON_ACTION_BUTTON_ICON_MARGIN
} from "./src/styles/global";
import { isTabletOrIPad } from "@src/utils";
import { NavigationActions } from 'react-navigation';
import { ScreenNames } from "./src/data/ScreensWithoutTabBar";
/*----------------------*/
/*    Custom Screens    */
/*----------------------*/
import DownloadedCoursesScreen from "@src/containers/DownloadedCoursesScreen";
import DailyChallengesScreen from './src/containers/screens/DailyChallengesScreen';
import TopicsScreeen from "./src/containers/screens/TopicsScreen";
import CustomCourseCategoriesScreen from "./src/containers/screens/CustomCourseCategoriesScreen";
import MessagesListScreen from "./src/containers/screens/MessagesListScreen";
import CustomHomeScreen from "./src/containers/screens/CustomHomeScreen";
import OnboardingScreen from "./src/containers/screens/OnboardingScreen";
/*----------------------*/
/*      Components      */
/*----------------------*/
// * LD Content * //
import LessonTitle from "./src/components/Screens/LessonSingleScreen/LessonTitle";
import TopicTitle from "./src/components/Screens/LearnTopicSingleScreen/TopicTitle";
import PrevNextLessons from './src/components/Screens/LessonSingleScreen/PrevNextButtonsLesson';
import PrevNextTopics from "./src/components/Screens/LearnTopicSingleScreen/PrevNextButtonsTopic";
import ContentHeadingsBlock from "./src/components/Global/CoreHeadingBlock";
import ImageComponent from "./src/components/Global/CoreImageBlock";
import EmbedsComponent from "./src/components/Global/CoreEmbedBlock";
import LessonActionComponent from "./src/components/Screens/LessonSingleScreen/LessonBottomActionButton";
import LearnTopicActionComponent from "./src/components/Screens/LearnTopicSingleScreen/TopicBottomActionButton";
import SpacerComponent from "./src/components/Global/CoreSpacerBlock";
// * LD Courses * //
import CourseHeaderItems from "./src/components/Screens/CourseSingleScreen/CourseHeaderDetails";
import CourseActionButton from "@src/components/Course/CourseActionButton";
// * Index Screen Defaults * //
import IndexScreenHeaderHeight from "./src/components/Global/AnimatedHeaderHeight";
import FilterBarComponents from "./src/components/Global/ReplaceFilterBarComponent";
import CustomTabBarBottom from "./src/components/Global/TabBarBottom";
import AnimatedHeaderContents from "./src/components/Global/AnimatedHeaderContents";
// * User Profile * //
import AfterProfileDetails from "./src/components/Screens/ProfileScreen/AfterProfileDetails";
import ProfileHeaderButton from "./src/components/Screens/ProfileScreen/ProfileHeaderRightButton";
import UserProfileAvatar from "./src/components/Screens/ProfileScreen/ProfileSubscriberBadge";
// * Forums * //
import ForumHeaderButtons from './src/components/Screens/ForumsSingleScreen/ForumHeaderRightButtons';
import HeaderRightComponent from "./src/components/Screens/TopicsScreen/HeaderRight";
import ReplyItemAvatar from "./src/components/Screens/TopicsSingleScreen/ReplyItemAvatar";
// * Misc * //
import GroupDetailsComponent from "./src/components/Screens/GroupSingleScreen/GroupDetailsComponent";
import MessageText from "./src/components/Screens/MessagesScreen/MessageContents";
// * Main List Items * //
import BlogItem from "./src/components/ListItems/BlogItem";
import TopicItem from "./src/components/ListItems/TopicItem";
import TopicHeaderAvatar from "./src/components/Screens/TopicsSingleScreen/TopicHeaderItem";
/*----------------------*/
/*       Reducers       */
/*----------------------*/
import hotTopicsReducer from './src/state/reducers/hotTopics.reducer';
import coursesReducer from './src/state/reducers/courses.reducer';
import courseCategoriesReducer from './src/state/reducers/courseCategories.reducer';
import forumsReducer from './src/state/reducers/forums.reducer';
import welcomeMessagesReducer from "./src/state/reducers/welcomeMessages.reducer";
import courseIncludesReducer from "./src/state/reducers/courseIncludes.reducer";


export const applyCustomCode = externalCodeSetup => {

	//externalCodeSetup.sqliteApi.disableSqlite(); // TEMP Disabled because it breaks items listed on CourseCategorySingleScreen.

	// TODO - would like to alter height of More screen, but it's way complicated...
	//externalCodeSetup.moreScreenApi.setContainerPaddingTop(props => 0); //88 props.containerPaddingTop
	//externalCodeSetup.moreScreenApi.setContentInsetTop(props => 0); // 105 props.contentInsetTop
	//externalCodeSetup.moreScreenApi.setContentOffsetY(props => 0); // -69 props.contentOffsetY

	/*-----------------------------------------------------------------------------------*/
	/* BUG FIX */
	/*-----------------------------------------------------------------------------------*/




	/*-----------------------------------------------------------------------------------*/
	/* GLOBAL */
	/*-----------------------------------------------------------------------------------*/

	// Add To State
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

	// Core Block Components
	externalCodeSetup.blocksApi.addCustomBlockRender("core/heading", (props) => <ContentHeadingsBlock {...props} />);
	/*if (!isTabletOrIPad())*/ externalCodeSetup.blocksApi.addCustomBlockRender("core/image", (props) => <ImageComponent {...props} />);
	externalCodeSetup.blocksApi.addCustomBlockRender("core/embed", (props) => <EmbedsComponent {...props} />);
	externalCodeSetup.blocksApi.addCustomBlockRender("core/spacer", (props) => <SpacerComponent {...props} />);
	//externalCodeSetup.blocksApi.addCustomBlockRender("core/paragraph", (props) => <ParagraphComponent {...props} />);

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

	// Header Variables
	externalCodeSetup.indexScreenApiHooks.setHeaderHeight(IndexScreenHeaderHeight);
	externalCodeSetup.indexScreenApiHooks.setRenderHeaderRight(props => <HeaderRightComponent {...props} />);
	externalCodeSetup.indexScreenApiHooks.setAnimatedListHeaderTitleComponent(props => <AnimatedHeaderContents {...props} />);

	// Group Details
	externalCodeSetup.socialGroupSingleApi.setGroupDetailsComponent(GroupDetailsComponent);


	/*-----------------------------------------------------------------------------------*/
	/* FORUMS */
	/*-----------------------------------------------------------------------------------*/

	// Replace default header right button with: "Create Topic".
	externalCodeSetup.forumSingleHooksApi.setHeaderRightComponent(props => <ForumHeaderButtons {...props} />)

	externalCodeSetup.topicsApi.setTopicItemComponent(props => <TopicItem {...props} />)
	externalCodeSetup.topicsApi.setSubFiltersFilter((filters) => {
		return ["activity", "date", "popular"];
	})

	externalCodeSetup.topicSingleApi.setTopicItemHeader(props => <TopicHeaderAvatar {...props} />)
	externalCodeSetup.topicSingleApi.setReplyItemAvatar(props => <ReplyItemAvatar {...props} />)


	/*-----------------------------------------------------------------------------------*/
	/* COURSES */
	/*-----------------------------------------------------------------------------------*/

	// Add custom course header details
	externalCodeSetup.courseSingleApi.setCourseHeaderDetails(props => <CourseHeaderItems {...props} />)

	// Remove unnecessary CourseSingleScreen action button.
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
				//marginBottom: 30, // bug fix
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
				marginBottom: 0
			}}>
				{CourseActionBtn}
			</View>

		if (!courseVM.hasAccess) return DefaultButton //TODO - change for SubscribeButton

	})

	// Lesson Header & Action Button
	externalCodeSetup.lessonSingleScreenApi.setLessonTitleComponent(props => <LessonTitle {...props} />);
	externalCodeSetup.lessonSingleScreenApi.setPrevNextComponent(props => <PrevNextLessons {...props} />);
	externalCodeSetup.lessonSingleScreenApi.setLessonActionComponent(props => <LessonActionComponent {...props} />);

	// LearnTopic Header & Action Button
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicTitleComponent(props => <TopicTitle {...props} />);
	externalCodeSetup.learnTopicSingleScreenApi.setPrevNextComponent((props) => <PrevNextTopics {...props} />);
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicActionComponent(props => <LearnTopicActionComponent {...props} />);


	/*-----------------------------------------------------------------------------------*/
	/* MORE SCREEN ITEMS */
	/*-----------------------------------------------------------------------------------*/

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
			//oldTabs[8], // Export Data
			oldTabs[9],
			oldTabs[10],
		]
	})


	// 4. Add headerRight Button On Profile Screen
	externalCodeSetup.profileScreenHooksApi.setAfterDetailsComponent(AfterProfileDetails) // Adds Gamipress info after profile Header
	externalCodeSetup.profileScreenHooksApi.setUserAvatar(UserProfileAvatar)
	externalCodeSetup.profileScreenHooksApi.setHeaderRightComponent(() => <ProfileHeaderButton />)
	externalCodeSetup.profileScreenHooksApi.setIgnoreTabsFilter((list, isOwnAccount) => [
		...list,
		"courses"
	]);

	externalCodeSetup.messagesSingleScreenApi.setThreadItemText((props) => <MessageText {...props} />);

	/*-----------------------------------------------------------------------------------*/
	/* BLOG / DAILY CHALLENGES */
	/*-----------------------------------------------------------------------------------*/

	externalCodeSetup.blogApi.setBlogItemComponent(props => <BlogItem {...props} />);
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
	// Lesson Container - For full-width videos
	//externalCodeSetup.cssApi.addGlobalStyle("lessonSingleScreenBlockContainer", { paddingHorizontal: 0 }, true); // For full width Images
	//externalCodeSetup.cssApi.addGlobalStyle("learnTopicSingleScreenBlockContainer", { paddingHorizontal: 0 }, true); // For full width Images
	if (isTabletOrIPad()) externalCodeSetup.cssApi.addGlobalStyle("lessonSingleScreenBlockContainer", { paddingHorizontal: GUTTER }, true); // For full width Images
	if (isTabletOrIPad()) externalCodeSetup.cssApi.addGlobalStyle("learnTopicSingleScreenBlockContainer", { paddingHorizontal: GUTTER }, true); // For full width Images
	externalCodeSetup.cssApi.addGlobalStyle("videoBlockContainer", { paddingHorizontal: 0 });


	/*-----------------------------------------------------------------------------------*/
	/* FILTER COMPONENTS */
	/*-----------------------------------------------------------------------------------*/

	// Set default sorting order in Courses lists.
	externalCodeSetup.coursesHooksApi.setSubFiltersFilter((filters) => {
		return ['my_progress', 'recent', 'title'];
	})

	// Set default sorting order in Course Categories lists.
	externalCodeSetup.coursesHooksApi.setCategoriesSubFiltersFilter((filters) => {
		return ["date", "title"];
	})

	// Forum Sub Filters
	externalCodeSetup.forumsHooksApi.setShowSearch((bbSetting) => false);
	externalCodeSetup.forumsHooksApi.setSubFiltersFilter((filters) => {
		return ["popular", "activity"];
	});

	// Replace Filter Bar components
	externalCodeSetup.filterScreenApiHooks.setFilterComponent(props => <FilterBarComponents {...props} />)

	// Remove "filter icon"
	externalCodeSetup.filterScreenApiHooks.setFilterAllButtonHidden(filterType => true);


	/*-----------------------------------------------------------------------------------*/
	/* NAVIGATION */
	/*-----------------------------------------------------------------------------------*/

	// 1. Replace Default Screens
	externalCodeSetup.navigationApi.setScreensWithoutTabBar(ScreenNames);
	externalCodeSetup.navigationApi.setBottomTabBar((props) => <CustomTabBarBottom {...props} />);

	externalCodeSetup.navigationApi.replaceScreenComponent("blog", DailyChallengesScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("BlockScreen", CustomHomeScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("courses_category", CustomCourseCategoriesScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("my_library", DownloadedCoursesScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("messages", MessagesListScreen);
	externalCodeSetup.navigationApi.replaceScreenComponent("HomeTopicsScreen", TopicsScreeen);
	externalCodeSetup.navigationApi.replaceScreenComponent("topics", TopicsScreeen);

	// 2. Custom App Welcome Screen Navigation Properties

	if (Platform.OS === 'ios') {
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

	}

};