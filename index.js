import React from "react";
import { Platform, View } from "react-native";
import { DEVICE_WIDTH, GUTTER } from "@src/styles/global";
import {
	SAFE_AREA_BOTTOM,
	IOS_HOME_INDICATOR,
	LESSON_ACTION_BUTTON_HEIGHT,
	LESSON_ACTION_BUTTON_TEXT_MARGIN,
	LESSON_ACTION_BUTTON_ICON_MARGIN
} from "./src/styles/global";
import { isTabletOrIPad } from "@src/utils";

// * Index Screen Defaults * //
import FilterBarComponents from "./src/components/Global/ReplaceFilterBarComponent";
// * User Profile * //
import AfterProfileDetails from "./src/components/Screens/ProfileScreen/AfterProfileDetails";
import ProfileHeaderButton from "./src/components/Screens/ProfileScreen/ProfileHeaderRightButton";
import UserProfileAvatar from "./src/components/Screens/ProfileScreen/ProfileSubscriberBadge";
// * Forums * //
import ForumHeaderButtons from './src/components/Screens/ForumsSingleScreen/ForumHeaderRightButtons';
import ReplyItemAvatar from "./src/components/Screens/TopicsSingleScreen/ReplyItemAvatar";
// * Misc * //
import MessageText from "./src/components/Screens/MessagesScreen/MessageContents";
// * Main List Items * //
import BlogItem from "./src/components/ListItems/BlogItem";
import TopicItem from "./src/components/ListItems/TopicItem";
import TopicHeaderAvatar from "./src/components/Screens/TopicsSingleScreen/TopicHeaderItem";


export const applyCustomCode = externalCodeSetup => {

	//externalCodeSetup.sqliteApi.disableSqlite(); // TEMP Disabled because it breaks items listed on CourseCategorySingleScreen.

	// TODO - would like to alter height of More screen, but it's way complicated...
	//externalCodeSetup.moreScreenApi.setContainerPaddingTop(props => 0); //88 props.containerPaddingTop
	//externalCodeSetup.moreScreenApi.setContentInsetTop(props => 0); // 105 props.contentInsetTop
	//externalCodeSetup.moreScreenApi.setContentOffsetY(props => 0); // -69 props.contentOffsetY

	/*-----------------------------------------------------------------------------------*/
	/* GLOBAL */
	/*-----------------------------------------------------------------------------------*/



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
	externalCodeSetup.blogSingleApi.setTransformBlogHeaderButtons(() => {return null}); // hide comments icon on blog



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
	if (isTabletOrIPad()) externalCodeSetup.cssApi.addGlobalStyle("lessonSingleScreenBlockContainer", { paddingHorizontal: isTabletOrIPad() ? GUTTER : 0 }, true); // For full width Images
	if (isTabletOrIPad()) externalCodeSetup.cssApi.addGlobalStyle("learnTopicSingleScreenBlockContainer", { paddingHorizontal: GUTTER }, true); // For full width Images
	externalCodeSetup.cssApi.addGlobalStyle("videoBlockContainer", { paddingHorizontal: 0, paddingVertical: 10, flex: 0 });


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



};