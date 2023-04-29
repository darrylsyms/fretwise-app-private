import React from "react";



import BlogItem from "./src/components/ListItems/BlogItem";


export const applyCustomCode = externalCodeSetup => {



	/*-----------------------------------------------------------------------------------*/
	/* BLOG / DAILY CHALLENGES */
	/*-----------------------------------------------------------------------------------*/

	externalCodeSetup.blogApi.setBlogItemComponent(props => <BlogItem {...props} />);
	externalCodeSetup.blogApi.hideSearch();
	externalCodeSetup.blogSingleApi.setTransformBlogHeaderButtons(() => {return null}); // hide comments icon on blog

};