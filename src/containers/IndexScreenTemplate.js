import React, {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { connect, useSelector } from "react-redux";
import { globalStyle, GUTTER } from "@src/styles/global";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '../styles/global';

/** Parameters:
  * @param { boolean } headerLogo - Display header logo in FixedHeader. Default: false
  * @param { string } title - Title of the Screen. Will be displayed in the header.
  * @param { React.Component } content - The content that will be inserted into the Screen.
  * @param { string } containerColor - Background color of container. Default value: '#fff'.
  * @param { function } getData - Get data from api services.
  * @param { function } getData2 - Get data from api services.
  * @param { function } getData3 - Get data from api services.
  * @param { function } saveData - Save data to state.
  * @param { function } saveData2 - Save data to state.
  * @param { function } saveData3 - Save data to state.
*/

// Default Header Values
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// Component
const ScreenTemplate = (props) => {

  const globalStyles = useSelector((state) => globalStyle(state.config.styles))
  const homeScreenHeaderLogo = useSelector((state) => state.config.home_screen_logo)
  const { colors, global } = globalStyles;

  const [isRefreshing, setRefreshControl] = useState(false);
  const [headerSwitched, setHeader] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  const scrollRef = useRef();
  const scrollListener = useRef(new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0)).current;
  const animatedHeaderOpacityValue = useRef(new Animated.Value(1)).current;
  const fixedHeaderOpacityValue = useRef(new Animated.Value(0)).current;
  const fixedHeaderTranslatePosition = useRef(new Animated.Value(4)).current;

  // Because of the ScrollView contentInset, the scroll value will be negative on iOS so this brings it back to 0:
  const scrollY = Animated.add(
    scrollListener,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
  );

  const handleScroll = (event) => {

    setScrollPos(event.nativeEvent.contentOffset.y + (Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0)); // TODO: This needs changing because it laggs on Android.
    // ^ It might be better to use the scrollY value since it's already declared, but it's not possible?

    if (scrollPos > 30 && !headerSwitched) {
      Animated.timing(fixedHeaderTranslatePosition, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      Animated.timing(fixedHeaderOpacityValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start();

      Animated.timing(animatedHeaderOpacityValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start(() => setHeader(true));
    }

    if (scrollPos < 29 && headerSwitched) {
      Animated.timing(fixedHeaderTranslatePosition, {
        toValue: 4,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(fixedHeaderOpacityValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();

      Animated.timing(animatedHeaderOpacityValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start(() => setHeader(false));
    }
  };

  const ScreenContent = useCallback((content) => {
    return (
      <View style={styles.scrollViewContent}>
        {props.content}
      </View>
    );
  }, []);

  const AnimatedHeader = (title) => {
    return (
      <Animated.View
        style={[
          styles.animatedHeader,
          {
            backgroundColor: colors.headerBg,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE],
                  outputRange: [0, -HEADER_SCROLL_DISTANCE],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Animated.Text
          style={{
            ...global.iosStyleScreenTitle,
            ...styles.animatedHeaderTitle,
            opacity: animatedHeaderOpacityValue,
          }}>
          {props.title}
        </Animated.Text>
        {/* TODO: Insert HeaderRight default component here. Need to iimport it from src*/}
      </Animated.View>
    );
  };
  //useMemo or useCallback for potential Image flicker problem.
  const FixedHeader = ({ headerLogo, title }) => {
    return (
      <>
        <Animated.View
          style={{
            ...styles.headerFixed,
            ...global.bottomBorder,
            backgroundColor: colors.headerBg,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_SCROLL_DISTANCE - 22, HEADER_SCROLL_DISTANCE], // 22 ensures that this View doesnt overlay the animatedHeader.
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          }}
        />
        <View style={styles.fixedTitleContainer}>
          {props.headerLogo ? (
            <View style={{
              width: '100%',
              alignItems: "center",
              height: HEADER_MIN_HEIGHT,
            }}>
              <Animated.Image
                source={{ uri: homeScreenHeaderLogo }} // TODO: This image flashes on android. It seems to rerender every pageload. Fix it.
                style={{
                  ...styles.logo,
                  opacity: fixedHeaderOpacityValue,
                  transform: [{ translateY: fixedHeaderTranslatePosition }],
                }}
              />
            </View>
          ) : (
            <Animated.Text
              style={{
                ...global.appHeaderTitle,
                ...styles.fixedHeaderTitle,
                opacity: fixedHeaderOpacityValue,
                transform: [{ translateY: fixedHeaderTranslatePosition }],
              }}>
              {props.title}
            </Animated.Text>

          )}
        </View>
      </>
    );
  };

  async function fetchAllItems(getData, saveData, getData2, saveData2, getData3, saveData3) {

    const getDataFn = props.getData;
    const saveDataFn = props.saveData;
    const getDataFn2 = props.getData2;
    const saveDataFn2 = props.saveData2;
    const getDataFn3 = props.getData3;
    const saveDataFn3 = props.saveData3;

    const response = await getDataFn(props.config);
    props.dispatch(saveDataFn(response));

    if (getDataFn2 && saveDataFn2) {
      const response2 = await getDataFn2(props.config);
      props.dispatch(saveDataFn2(response2));
    }

    if (getDataFn3 && saveDataFn3) {
      const response2 = await getDataFn3(props.config);
      props.dispatch(saveDataFn3(response2));
    }

  }

  const onRefresh = useCallback(() => {

    if (!isRefreshing) setRefreshControl(true);
    fetchAllItems().then(() => setRefreshControl(false));

  }, [isRefreshing]);

  useEffect(() => {
    props.navigation.setParams({
      scrollToTop: () => {
        onTabBarPress();
      }
    });
  }, []);

  const onTabBarPress = () => {
    scrollRef.current?.scrollTo({
      y: -HEADER_MAX_HEIGHT, // was previously -140
      animated: true,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: props.containerColor ? props.containerColor : '#fff', }]}>
      <ScrollView
        style={styles.container}
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollListener } } }],
          {
            listener: (event) => {
              handleScroll(event);
            },
          }
        )}
        refreshControl={props.getData && props.saveData && (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            // Android offset for RefreshControl
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        )}
        // iOS offset for RefreshControl
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}>
        {ScreenContent()}
      </ScrollView>

      <AnimatedHeader />
      <FixedHeader />

    </View>
  );
};

ScreenTemplate.navigationOptions = {
  header: null
};

const mapStateToProps = (state) => ({
  config: state.config,
});

const ScreenContainer = withNavigation(ScreenTemplate)

export default connect(mapStateToProps)(ScreenContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerFixed: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_MIN_HEIGHT,
    left: 0,
    right: 0,
  },
  animatedHeaderTitle: {
    position: 'absolute',
    left: GUTTER,
    bottom: 15,
    fontSize: 30,
  },
  fixedTitleContainer: {
    width: '100%',
    position: 'absolute',
    height: HEADER_MIN_HEIGHT,
  },
  fixedHeaderTitle: {
    top: Platform.OS === 'ios' ? (HEADER_MIN_HEIGHT / 2) + ifIphoneX(10, 0) : (HEADER_MIN_HEIGHT / 2) - 12,
    textAlign: 'center',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  scrollViewContent: {
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0, // iOS uses content inset, which acts like padding. Wrap the content in this.
  },
  logo: {
    width: 130,
    height: 30,
    top: Platform.OS === 'ios' ? (HEADER_MIN_HEIGHT / 2) - ifIphoneX(0, 8) : (HEADER_MIN_HEIGHT / 2) - 18,
    resizeMode: "contain",
  },
});