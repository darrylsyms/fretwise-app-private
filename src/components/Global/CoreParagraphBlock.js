import React from "react";
import { View, Text } from 'react-native';
import HTML from "react-native-render-html";
import { GUTTER, globalStyle } from "@src/styles/global";
import { useSelector } from "react-redux";

const ParagraphComponent = (props) => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;
    const { block } = props;

    console.log('block', block)
    const Contents =
        <HTML
            html={block.render}
            tagsStyles={{
                    //p: { marginTop: 0, textAlign: 'center' }, // TODO - test! The text must be center aligned.
                    //a: global.textHeaderShortContent
                }}
            baseFontStyle={{
                //...global.textHeaderShortContent,
                //...textStyle
            }}
        />


    return (
        <View style={{paddingHorizontal: GUTTER}}>
       
        </View>
    )
}

export default ParagraphComponent;