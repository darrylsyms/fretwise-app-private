import React from "react";
import { Platform, View } from "react-native";
import {
	SAFE_AREA_BOTTOM,
	IOS_HOME_INDICATOR,
	LESSON_ACTION_BUTTON_HEIGHT,
	LESSON_ACTION_BUTTON_TEXT_MARGIN,
	LESSON_ACTION_BUTTON_ICON_MARGIN
} from "./all/styles/global";
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


export const applyCustomCode = externalCodeSetup => {


};