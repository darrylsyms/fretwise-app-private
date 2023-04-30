import React from "react";
import { View, Text } from 'react-native';
import HTML from "react-native-render-html";
import { GUTTER, globalStyle } from "@src/styles/global";
import { useSelector } from "react-redux";

const ParagraphComponent = (props) => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;
    const { block } = props;


    const smallText = {
        //fontSize: 10,
        //position: "relative",
    }

    /*
    const subTag = "<sub";
    //const SubStyle = buggyHtml.replace(subTag, "$& style=\"top: -2px; margin-right: -3px; left: -3px;\"");
    const SubStyle = block.render.replaceAll(subTag, "$& style=\"top: -2px; margin-right: -3px; left: -3px;\"");

    const supTag = "<sup";
    //const SupStyle = SubStyle.replace(supTag, "$& style=\"top: -2px; margin-right: -3px; left: -3px;\"");
    const SupStyle = SubStyle.replaceAll(supTag, "$& style=\"bottom: -2px;\"");
    */

    // The sub and sup won't work because react native doesnt support it apparently....
    const Contents =
        <HTML
            html={block.render}
            tagsStyles={{
                p: { ...global.text },
                sup: {
                    ...smallText,
                    //top: -2
                },
                sub: {
                    ...smallText,
                    //bottom: -2,
                    //left: -3,
                    //marginRight: -2,
                }
                //a: global.textHeaderShortContent
            }}
            baseFontStyle={{
                //...global.textHeaderShortContent,
                //...textStyle
            }}
        />


    return (
        <View style={{ paddingHorizontal: GUTTER, paddingVertical: 10 }}>
            {Contents}
        </View>
    )
}

export default ParagraphComponent;