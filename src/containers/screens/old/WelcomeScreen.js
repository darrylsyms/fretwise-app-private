import React from 'react';
import {
    StatusBar,
    Animated,
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from "react-redux";
import { globalStyle, GUTTER } from "@src/styles/global";
import { NavigationActions } from 'react-navigation';
const { width, height } = Dimensions.get('screen');

const bgs = ['#F47D39', '#F24B4B', '#2D6BEA', '#B98EFF'];
const DATA = [
    {
        key: '3571572',
        title: '100+ Lessons',
        description:
            "Work your way through 6 guided Masterclasses, each of which include detailed video instruction, on-screen tabs & diagrams, downloadable resources, and full written transcripts.",
        image: require('../../assets/img/intro/courses-intro4.png'),
    },
    {
        key: '3571747',
        title: 'Progress Tracking',
        description:
            'Keep track of your progress by marking resources as "complete" when you\'re ready to move on.',
        image: require('../../assets/img/intro/progress-intro.png'),
    },
    {
        key: '3571680',
        title: 'Community',
        description:
            'Create and discuss topics and your questions in the community forums. Everyone knows that communication is key, and learning with others is much more motivating than learning alone.',
        image: require('../../assets/img/intro/discuss-intro.png'),
    },
    {
        key: '3571603',
        title: 'Daily Challenges',
        description: 
            'Perfect for those days where you don\'t have much time to practice, or you just want a quick change in topic from the usual. These are lessons that you can work through in as little as just 5 - 20 minutes!',
        image: require('../../assets/img/intro/daily-challenges-intro.png'),
    },
];

const Indicator = ({ scrollX }) => {
    return (
        <View style={{ position: 'absolute', bottom: 30, flexDirection: 'row' }}>
            {DATA.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 0.9, 0.6],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        key={'indicator-${i}'}
                        style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            opacity,
                            margin: 10,
                            transform: [
                                {
                                    scale,
                                },
                            ],
                        }}
                    />
                );
            })}
        </View>
    );
};

const Backdrop = ({ scrollX }) => {
    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_, i) => i * width),
        outputRange: bgs.map((bg) => bg),
    });
    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor,
                },
            ]}
        />
    );
};

const Square = ({ scrollX }) => {
    const YOLO = Animated.modulo(
        Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
        1
    );

    const rotate = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['35deg', '0deg', '35deg'],
    });
    const translateX = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -height, 0],
    });

    return (
        <Animated.View
            style={{
                width: height,
                height: height,
                backgroundColor: '#fff',
                borderRadius: 86,
                top: -height * 0.6,
                left: -height * 0.3,
                position: 'absolute',
                transform: [
                    {
                        rotate,
                    },
                    {
                        translateX,
                    },
                ],
            }}
        />
    );
};

const WelcomeScreen = ({navigation}) => {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const toSignupScreen = NavigationActions.navigate({
        routeName: "SignupScreen",
    });

    const toLoginScreen = NavigationActions.navigate({
        routeName: "LoginScreen",
    });

    // TODO: Check these styles look good
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Backdrop scrollX={scrollX} />
            <Square scrollX={scrollX} />

            <Animated.FlatList
                data={DATA}
                keyExtractor={(item) => item.key}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, alignItems: 'center', padding: 20 }}>
                            <View
                                style={{
                                    flex: 0.65,
                                    justifyContent: 'center',
                                    marginTop: 15,
                                    marginBottom: -15,
                                }}>
                                <Image
                                    source={item.image}
                                    style={{
                                        width: width / 1.2,
                                        //height: width / 2,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0.35 }}>
                                <Text
                                    style={{
                                        ...global.boldText,
                                        fontSize: 24,
                                        marginBottom: 8,
                                        color: '#fff',
                                        marginTop: 40,
                                    }}>
                                    {item.title}
                                </Text>
                                <Text style={{ 
                                    ...global.contentText,
                                    color: '#fff', 
                                    fontSize: 17 // TODO: Check how this looks on iPhone 8. Maybe 17 on Android and 16 on iOS
                                    }}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 80 }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(toLoginScreen)}>
                    <Text style={[global.semiboldText]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, marginLeft: 25 }} onPress={() => navigation.dispatch(toSignupScreen)}>
                    <Text style={[global.semiboldText]}>Create account</Text>
                </TouchableOpacity>
            </View>
            <Indicator scrollX={scrollX} />
        </View>
    );

}


export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 14,
        paddingHorizontal: 30,
        paddingVertical: 14
    },
});

