import React from "react";


export const applyCustomCode = externalCodeSetup => {


	externalCodeSetup.blogApi.setBlogItemComponent(props => <BlogItem {...props} />);
	externalCodeSetup.blogApi.hideSearch();
	externalCodeSetup.blogSingleApi.setTransformBlogHeaderButtons(() => {return null}); // hide comments icon on blog



};