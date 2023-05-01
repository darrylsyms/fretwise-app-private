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

// * LD Courses * //
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

// * Misc * //

// * Main List Items * //

/*----------------------*/
/*       Reducers       */
/*----------------------*/


export const applyCustomCode = externalCodeSetup => {


};