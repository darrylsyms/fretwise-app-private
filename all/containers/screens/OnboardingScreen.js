import React from "react";
import Video from 'react-native-video';
import {
    Platform,
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { isTabletOrIPad } from "@src/utils";
import { Portal } from 'react-native-portalize';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "@src/styles/global";
import { useSelector } from "react-redux";
import { globalStyle } from "@src/styles/global";

const slides = [
    {
        id: '1',
        image: require('../../assets/img/intro/courses.png'),
        title: '100+ LESSONS',
        subtitle: 'Work your way through a series of guided Masterclasses, each of which include detailed video instruction, on-screen tabs & diagrams, downloadable resources, and full written transcripts.',
    },
    {
        id: '2',
        image: require('../../assets/img/intro/progress.png'),
        title: 'PROGRESS TRACKING',
        subtitle: 'Keep track of your progress by marking resources as "complete" when you\'re ready to move on.',
    },
    {
        id: '3',
        image: require('../../assets/img/intro/discuss.png'),
        title: 'COMMUNITY',
        subtitle: 'Create and discuss topics and your questions in the community forums. Everyone knows that communication is key, and learning with others is much more motivating than learning alone.',
    },
    {
        id: '4',
        image: require('../../assets/img/intro/daily-challenges.png'),
        title: 'DAILY CHALLENGES',
        subtitle: 'Perfect for those days where you don\'t have much time to practice, or you just want a quick change in topic from the usual. These are lessons that you can work through in as little as just 5 - 20 minutes!',
    },
];

const Slide = ({ item }) => {

    const [height, setHeight] = React.useState();
    const [totalHeight, setTotalHeight] = React.useState();
    //const [titleWidth, setTitleWidth] = React.useState();
    //const [titleHeight, setTitleHeight] = React.useState();

    const getTextHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(height);
    };

    const getTotalheight = (event) => {
        const { height } = event.nativeEvent.layout;
        setTotalHeight(height);
    };

    //const getTitleDims = (event) => {
    //    const { width, height } = event.nativeEvent.layout;
    //    setTitleWidth(width);
    //    setTitleHeight(height);
    //};

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    return (
        <View style={{ alignItems: 'center', width: DEVICE_WIDTH }} onLayout={getTotalheight}>

            <Image
                source={item?.image}
                style={{ height: totalHeight - height, width: '100%', resizeMode: 'contain' }}
            />

            <View onLayout={getTextHeight} style={{ alignItems: 'center' }}>
                <View style={{ marginTop: isTabletOrIPad() ? 25 : 20 }}>
                    <Text
                        style={[
                            global.boldText,
                            {
                                fontSize: isTabletOrIPad() ? 27 : 21,
                                textAlign: 'center',
                                color: 'white',
                                zIndex: 1,
                                elevation: 1
                            }
                        ]}
                    //onLayout={getTitleDims}
                    >{item?.title}</Text>
                    {/*<View style={{
                        backgroundColor: 'black',
                        position: 'absolute',
                        alignSelf: 'center',
                        height: titleHeight - 8,
                        width: titleWidth,
                        top: 3,
                        opacity: 0.3,
                        borderRadius: 2,
                        transform: [{ rotate: '-2deg' }]
                    }} />*/}
                </View>
                <Text style={[
                    global.contentText, //widgetItemTitle
                    {
                        marginTop: isTabletOrIPad() ? 15 : 10,
                        fontSize: isTabletOrIPad() ? 22 : 16,
                        maxWidth: '80%',
                        textAlign: 'center',
                        //lineHeight: 20,
                        color: 'white'
                    }
                ]}>{item?.subtitle}</Text>
            </View>
        </View>
    );
};


const OnboardingScreen = ({ navigation }) => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / DEVICE_WIDTH);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * DEVICE_WIDTH;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * DEVICE_WIDTH;
        ref?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };

    const Footer = () => {

        return (
            <View
                style={{
                    height: DEVICE_HEIGHT * 0.22,
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                }}>
                {/* Indicator container */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                    }}>
                    {/* Render indicator */}
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                    backgroundColor: 'white',
                                    width: 25,
                                },
                            ]}
                        />
                    ))}
                </View>

                {/* Render buttons */}
                <View style={{ marginBottom: 20 }}>
                    {currentSlideIndex == slides.length - 1 ? (
                        <View style={{ height: 50 }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.navigate("LoginScreen")}>
                                <Text style={[global.boldText]}>
                                    GET STARTED
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.btn,
                                    {
                                        borderColor: 'white',
                                        borderWidth: 1,
                                        backgroundColor: 'transparent',
                                    },
                                ]}
                                onPress={skip}>
                                <Text
                                    style={[global.boldText, {
                                        color: 'white',
                                    }]}>
                                    SKIP
                                </Text>
                            </TouchableOpacity>
                            <View style={{ width: 15 }} />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={goToNextSlide}
                                style={styles.btn}>
                                <Text
                                    style={[global.boldText]}>
                                    NEXT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {Platform.OS === 'android'
                ? (
                    <Image
                        style={styles.video}
                        source={require('../../assets/img/intro/intro-video-poster-frame.jpg')}
                    />
                ) : (
                    <Video
                        style={styles.video}
                        source={{ uri: 'https://d1jnwmywz3uquj.cloudfront.net/app-preview-video.mp4' }}
                        resizeMode={"cover"}
                        poster={require('../../assets/img/intro/intro-video-poster-frame.jpg')}
                        posterResizeMode={"cover"}
                        repeat={true}
                        muted={true}
                        playWhenInactive={true}
                    />
                )}
            <View style={{ flex: 1, position: 'absolute', width: DEVICE_WIDTH, height: DEVICE_HEIGHT, backgroundColor: '#000', opacity: 0.5 }} />
            <Portal>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        ref={ref}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        //contentContainerStyle={{ height: DEVICE_HEIGHT * 0.75 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={slides}
                        pagingEnabled
                        renderItem={({ item }) => <Slide item={item} />}
                    />
                    <Footer />
                </SafeAreaView>
            </Portal>

        </View>
    )
}

OnboardingScreen.navigationOptions = {
    header: null
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        alignSelf: 'center',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
