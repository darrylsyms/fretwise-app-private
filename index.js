import React from "react";
import { Platform, View } from "react-native";
import { GUTTER } from "@src/styles/global";
import {
	SAFE_AREA_BOTTOM,
	IOS_HOME_INDICATOR,
	LESSON_ACTION_BUTTON_HEIGHT,
	LESSON_ACTION_BUTTON_TEXT_MARGIN,
	LESSON_ACTION_BUTTON_ICON_MARGIN
} from "./src/styles/global";
import { isTabletOrIPad } from "@src/utils";
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

import FilterBarComponents from "./src/components/Global/ReplaceFilterBarComponent";
import CustomTabBarBottom from "./src/components/Global/TabBarBottom";


export const applyCustomCode = externalCodeSetup => {



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