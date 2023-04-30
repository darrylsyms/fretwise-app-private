import React from "react";
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


	// Lesson Header & Action Button
	externalCodeSetup.lessonSingleScreenApi.setLessonTitleComponent(props => <LessonTitle {...props} />);
	externalCodeSetup.lessonSingleScreenApi.setPrevNextComponent(props => <PrevNextLessons {...props} />);
	externalCodeSetup.lessonSingleScreenApi.setLessonActionComponent(props => <LessonActionComponent {...props} />);

	// LearnTopic Header & Action Button
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicTitleComponent(props => <TopicTitle {...props} />);
	externalCodeSetup.learnTopicSingleScreenApi.setPrevNextComponent((props) => <PrevNextTopics {...props} />);
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicActionComponent(props => <LearnTopicActionComponent {...props} />);






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