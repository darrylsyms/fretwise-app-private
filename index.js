import React from "react";

import { NavigationActions } from 'react-navigation';
import { ScreenNames } from "./all/data/ScreensWithoutTabBar";
/*----------------------*/
/*    Custom Screens    */
/*----------------------*/

/*----------------------*/
/*      Components      */
/*----------------------*/
// * LD Content * //
import LessonTitle from "./all/components/Screens/LessonSingleScreen/LessonTitle";
import TopicTitle from "./all/components/Screens/LearnTopicSingleScreen/TopicTitle";
import PrevNextLessons from './all/components/Screens/LessonSingleScreen/PrevNextButtonsLesson';
import PrevNextTopics from "./all/components/Screens/LearnTopicSingleScreen/PrevNextButtonsTopic";
import ContentHeadingsBlock from "./all/components/Global/CoreHeadingBlock";
import ImageComponent from "./all/components/Global/CoreImageBlock";
import EmbedsComponent from "./all/components/Global/CoreEmbedBlock";
import LessonActionComponent from "./all/components/Screens/LessonSingleScreen/LessonBottomActionButton";
import LearnTopicActionComponent from "./all/components/Screens/LearnTopicSingleScreen/TopicBottomActionButton";
import SpacerComponent from "./all/components/Global/CoreSpacerBlock";
// * LD Courses * //
import CourseHeaderItems from "./all/components/Screens/CourseSingleScreen/CourseHeaderDetails";
import CourseActionButton from "@src/components/Course/CourseActionButton";
// * Index Screen Defaults * //
import IndexScreenHeaderHeight from "./all/components/Global/AnimatedHeaderHeight";
import FilterBarComponents from "./all/components/Global/ReplaceFilterBarComponent";
import CustomTabBarBottom from "./all/components/Global/TabBarBottom";
import AnimatedHeaderContents from "./all/components/Global/AnimatedHeaderContents";
// * User Profile * //
import AfterProfileDetails from "./all/components/Screens/ProfileScreen/AfterProfileDetails";
import ProfileHeaderButton from "./all/components/Screens/ProfileScreen/ProfileHeaderRightButton";
import UserProfileAvatar from "./all/components/Screens/ProfileScreen/ProfileSubscriberBadge";
// * Forums * //
import ForumHeaderButtons from './all/components/Screens/ForumsSingleScreen/ForumHeaderRightButtons';
import HeaderRightComponent from "./all/components/Screens/TopicsScreen/HeaderRight";
import ReplyItemAvatar from "./all/components/Screens/TopicsSingleScreen/ReplyItemAvatar";
// * Misc * //
import GroupDetailsComponent from "./all/components/Screens/GroupSingleScreen/GroupDetailsComponent";
import MessageText from "./all/components/Screens/MessagesScreen/MessageContents";
// * Main List Items * //

/*----------------------*/
/*       Reducers       */
/*----------------------*/


export const applyCustomCode = externalCodeSetup => {


};