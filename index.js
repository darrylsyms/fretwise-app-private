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
import { NavigationActions } from 'react-navigation';
/*----------------------*/
/*      Components      */
/*----------------------*/
// * LD Content * //
import LessonTitle from "./src/components/Screens/LessonSingleScreen/LessonTitle";
import TopicTitle from "./src/components/Screens/LearnTopicSingleScreen/TopicTitle";
import PrevNextLessons from './src/components/Screens/LessonSingleScreen/PrevNextButtonsLesson';
import PrevNextTopics from "./src/components/Screens/LearnTopicSingleScreen/PrevNextButtonsTopic";
import LessonActionComponent from "./src/components/Screens/LessonSingleScreen/LessonBottomActionButton";
import LearnTopicActionComponent from "./src/components/Screens/LearnTopicSingleScreen/TopicBottomActionButton";
// * LD Courses * //
import CourseHeaderItems from "./src/components/Screens/CourseSingleScreen/CourseHeaderDetails";
import CourseActionButton from "@src/components/Course/CourseActionButton";

import FilterBarComponents from "./src/components/Global/ReplaceFilterBarComponent";

// * Forums * //
import ForumHeaderButtons from './src/components/Screens/ForumsSingleScreen/ForumHeaderRightButtons';
import ReplyItemAvatar from "./src/components/Screens/TopicsSingleScreen/ReplyItemAvatar";

import TopicItem from "./src/components/ListItems/TopicItem";
import TopicHeaderAvatar from "./src/components/Screens/TopicsSingleScreen/TopicHeaderItem";


export const applyCustomCode = externalCodeSetup => {



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