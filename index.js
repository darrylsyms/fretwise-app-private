import React from "react";


// * User Profile * //
import AfterProfileDetails from "./src/components/Screens/ProfileScreen/AfterProfileDetails";
import ProfileHeaderButton from "./src/components/Screens/ProfileScreen/ProfileHeaderRightButton";
import UserProfileAvatar from "./src/components/Screens/ProfileScreen/ProfileSubscriberBadge";
import MessageText from "./src/components/Screens/MessagesScreen/MessageContents";
// * Main List Items * //
import BlogItem from "./src/components/ListItems/BlogItem";


export const applyCustomCode = externalCodeSetup => {


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