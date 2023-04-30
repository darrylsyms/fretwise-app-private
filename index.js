import React from "react";

import { NavigationActions } from 'react-navigation';
import { ScreenNames } from "./all/data/ScreensWithoutTabBar";
/*----------------------*/
/*    Custom Screens    */
/*----------------------*/
import DownloadedCoursesScreen from "@src/containers/DownloadedCoursesScreen";
import DailyChallengesScreen from './all/containers/screens/DailyChallengesScreen';
import TopicsScreeen from "./all/containers/screens/TopicsScreen";
import CustomCourseCategoriesScreen from "./all/containers/screens/CustomCourseCategoriesScreen";
import MessagesListScreen from "./all/containers/screens/MessagesListScreen";
import CustomHomeScreen from "./all/containers/screens/CustomHomeScreen";
import OnboardingScreen from "./all/containers/screens/OnboardingScreen";
/*----------------------*/
/*      Components      */
/*----------------------*/
// * LD Content * //

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

// * Main List Items * //

/*----------------------*/
/*       Reducers       */
/*----------------------*/


export const applyCustomCode = externalCodeSetup => {


};