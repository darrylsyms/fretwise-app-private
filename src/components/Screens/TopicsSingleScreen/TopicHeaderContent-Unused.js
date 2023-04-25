import React from "react";
import HTML from "react-native-render-html";
import ReadMore from "@src/components/ReadMore";
import {
    alterChildrenHTML
} from "@src/utils";
import { aTagRenderer } from "@src/utils/htmlRender";

const TopicHeaderContent = (props) => {

    const {
        colors,
        content,
        global,
        t,
        tagsStyles,
        attemptDeepLink,
        computedWidth,
        topic
    } = props;

    return (
        <View style={{ marginTop: -4 }}>
            <ReadMore
                colors={colors}
                content={content}
                size={1000}
                t={t}
                global={global}
                style={{ marginBottom: 20 }}
            >
                {content => (
                    <HTML
                        html={content}
                        tagsStyles={{
                            ...tagsStyles,
                            iframe: {
                                marginTop: 10,
                                marginBottom: 10
                            }
                        }}
                        baseFontStyle={global.textHtml}
                        onLinkPress={attemptDeepLink}
                        staticContentMaxWidth={computedWidth}
                        alterChildren={alterChildrenHTML(computedWidth)}
                        renderers={{
                            a: aTagRenderer(computedWidth)
                        }}
                    />
                )}
            </ReadMore>
        </View>
    )
}

export default TopicHeaderContent;
