import React from "react";
import HTML from "react-native-render-html";
import htmlclean from "htmlclean";

const MessageText = (props) => {

   const {message, item, t, global, attemptDeepLink, size} = props;

   return <HTML
               html={htmlclean(message.message)}
               tagsStyles={{p: {...global.messageExcerpt, ...{color: '#000', paddingBottom: 2}}}}
               onLinkPress={attemptDeepLink(false)}
           />
}

export default MessageText;