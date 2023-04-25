import React from "react";
import { View } from "react-native";
import HTML from "react-native-render-html";
import ReadMore from "@src/components/ReadMore";
import AutoSizeImage from "@src/components/AutoSizeImage";
import ImageCollection from "@src/components/ImageCollection";
import { GifVideoPlayer } from "@src/components/Gif";
import EmbeddedDocumentItem from "@src/components/Documents/EmbeddedDocumentItem";

const ReplyItemContent = (props) => {

    const {
        formatTextForDisplay,
        filterContentCss,
        reply,
        colors,
        t,
        global,
        tagsStyles,
        imagesInitialDimensions,
        computedWidth,
        referer,
        alterChildrenHTML,
        attemptDeepLink,
        aTagRenderer,
        iframeRender
    } = props;

    return (
        <View style={{ flex: 1, marginTop: 6, marginBottom: 6 }}>
            <ReadMore
                content={formatTextForDisplay(filterContentCss(reply.content))}
                size={600}
                colors={colors}
                t={t}
                global={global}
            >
                {content => (
                    <HTML
                        tagsStyles={{
                            ...tagsStyles,
                            p: {
                                ...tagsStyles.p,
                                marginBottom: 0,
                                paddingBottom: 10 // TODO remove...
                            },
                            ul: {
                                marginTop: 5
                            },
                            iframe: {
                                marginTop: 10
                            }
                        }}
                        baseFontStyle={global.textHtml}
                        html={content}
                        imagesInitialDimensions={imagesInitialDimensions}
                        staticContentMaxWidth={computedWidth}
                        alterChildren={alterChildrenHTML(computedWidth)}
                        onLinkPress={attemptDeepLink}
                        renderers={{
                            a: aTagRenderer(computedWidth),
                            iframe: iframeRender(referer),
                            img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                                return (
                                    <AutoSizeImage
                                        url={htmlAttribs.src}
                                        wrapperStyle={{
                                            marginTop: convertedCSSStyles.marginTop,
                                            marginBottom: convertedCSSStyles.marginBottom
                                        }}
                                        style={{
                                            ...convertedCSSStyles,
                                            paddingVertical: 100
                                        }}
                                    />
                                );
                            }
                        }}
                    />
                )}
            </ReadMore>
            {!!reply.media && (
                <ImageCollection
                    item={reply}
                    containerStyle={{ marginTop: 16 }}
                    colors={colors}
                    global={global}
                    t={t}
                    toUserBasedOnSettings={() => reply.navigateToProfile()}
                    showActionButtons={false}
                />
            )}
            {!!reply.videos && (
                <ImageCollection
                    item={reply}
                    containerStyle={{ marginTop: 16 }}
                    colors={colors}
                    global={global}
                    t={t}
                    toUserBasedOnSettings={() => reply.navigateToProfile()}
                    showActionButtons={false}
                />
            )}
            {!!reply.gif?.preview_url ? (
                <View style={{ marginTop: 16 }}>
                    <GifVideoPlayer
                        url={reply.gif?.video_url}
                        poster={reply.gif?.preview_url}
                        width={computedWidth - 30}
                        containerStyle={{ backgroundColor: "#F9F9F9" }}
                    />
                </View>
            ) : null}

         
         
        </View>
    )
};

export default ReplyItemContent;