import React from "react";


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

};