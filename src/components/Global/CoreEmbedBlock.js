import React, { useState, useEffect } from "react";
import {
    Dimensions,
    View
} from 'react-native';
import axios from 'axios';
import WebView from 'react-native-webview';
import urlParser from "js-video-url-parser";
import { useSelector } from "react-redux";
import LessonVideoPlaceholder from "./SkeletonLoaders/LessonVideoPlaceholder";

const EmbedsComponent = (props) => {

    const { block } = props;
    const ParseUrl = urlParser.parse(block?.data?.src);
    const vimeoAuthToken = useSelector((state) => state.config.vimeo.auth_code)

    const { width } = Dimensions.get("window"); // TODO - for tablets, this'll need to be 100%
    // 56.25% is that of 16:9.
    const height = 0.5625 * width;

    const [apiResponse, setApiResponse] = useState({});
    const [isLoading, seIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.vimeo.com/videos/${ParseUrl.id}`, {
            headers: {
                referer: "https://getfretwise.com",
                Authorization: `Bearer ${vimeoAuthToken}`,
            }
        })
            .then((response) => {
                setApiResponse(response.data);
                setTimeout(() => { seIsLoading(false) }, 1500)
            });
    }, [])

    const Source = () => {
        if (ParseUrl.provider == "vimeo") {
            return {
                uri: apiResponse.player_embed_url,
                headers: {
                    referer: "https://getfretwise.com",
                    Authorization: `Bearer ${vimeoAuthToken}`
                },
            }
        }
        if (ParseUrl.provider == "youtube") {
            return {
                html: `
                <html>
                    <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                    <body>
                        <div>
                            <iframe src="https://www.youtube.com/embed/${ParseUrl.id}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
                        </div>
                    </body>
                </html>
                `
            }
        }
        return (<Text style={{ fontWeight: "600", fontSize: 16, color: '#E0623E', textAlign: 'center', paddingHorizontal: 25 }}>This video could not be embedded :( Please contact Darryl!</Text>)
    }

    const VideoComponent =
        <>
            <View style={{
                //paddingTop: 30,
                overflow: 'hidden'
            }}>
                <LessonVideoPlaceholder
                    height={isLoading ? height : 0}
                    width={width}
                />
                <WebView
                    source={Source()}
                    startInLoadingState={true}
                    scrollEnabled={false}
                    javascriptEnabled={true}
                    allowsFullscreenVideo
                    originWhitelist={['*']}
                    allowsInlineMediaPlayback={true}
                    style={{
                        height: !isLoading ? height : 0,
                        width: width,
                        margin: 0,
                        padding: 0,
                        opacity: isLoading ? 0 : 0.99 // Must be 0.99 to accomidate this android bug: https://github.com/react-native-webview/react-native-webview/issues/430
                    }}
                />
            </View>
        </>

    return VideoComponent;

}

export default EmbedsComponent;
