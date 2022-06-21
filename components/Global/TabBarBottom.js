import React from 'react';
import { BlurView } from "@react-native-community/blur";
import { BottomTabBar } from "react-navigation-tabs";
import BadgeIcon from "@src/components/BadgeIcon";
import AppImage from "@src/components/AppImage";
import { isTabletOrIPad } from "@src/utils";
import {
    FontWeights,
    textRTLStyleFix,
} from "@src/styles/global";

const CustomTabBarBottom = (props) => {

    const {screenProps, color} = props;
     
    const getIconUri = (route) => {
         let icon = route?.routes?.[0]?.params?.item?.icon || "";
         if (icon) {
             if (icon.uri) {
                 icon = icon.uri;
             } else {
                 icon = Platform.select({ ios: icon.ios_uri, android: icon.android_uri });
             }
         }
         return icon;
 
     }
 
     const getIcon = (iconProps) => {
         const { route, tintColor, focused } = iconProps;
         const { calcFontSize, colors } = props.screenProps;
         const item = route?.routes?.[0]?.params?.item;
 
         if (!item) return null;
 
         const color =
             item.icon.monochrome &&
             (!focused ? item.icon?.tint_color || tintColor : tintColor);
 
         const icon = getIconUri(route);
 
         if (item.object === "notifications" || item.object === "messages") {
             return (
                 <BadgeIcon
                     calcFontSize={calcFontSize}
                     tintColor={color}
                     bottomTabsBg={colors.bottomTabsBg}
                     warningColor={colors.warningColor}
                     platform="ios"
                     inMore={false}
                     app={"learnerapp"}
                     type={item.object}
                     iconUri={icon ? { uri: icon } : null}
                 />
             );
         }
 
         return <AppImage
             source={{ uri: icon }}
             style={{ width: 25, height: 25 }}
             tintColor={color}
         />
 
    };
 
    const renderLabel = (props) => {
       const label = props.route.routes[0].params.item.label;
       return <Text
           style={[
               screenProps.global.menuLabelStyle,
               {
                   marginHorizontal: 5,
                   marginTop: isTabletOrIPad() ? -(props.bottomSafeArea / 5) : 2,
                   color,
                   fontWeight: FontWeights["medium"],
                   ...textRTLStyleFix(),
                   opacity: 1,
                   textAlign: "center"
               }
           ]}
           numberOfLines={1}
           ellipsizeMode={"tail"}
           allowFontScaling={false}
       >
           {label}
       </Text>
    }
 
    const renderIcon = (props) => {
       return getIcon(props);
    }
 
    return Platform.select({
       android: (
         <BottomTabBar
           {...props}
           style={[props.style]}
           getLabelText={renderLabel}
           renderIcon={renderIcon}
         />
       ),
       ios: (
         <BlurView
           style={{
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute",
              backgroundColor: "transparent"
           }}
           blurType={"xlight"}
           blurAmount={50}
           onLayout={props.handleLayout}
           reducedTransparencyFallbackColor={"#fcfcfc"}
         >
           <BottomTabBar
             {...props}
             style={[props.style]}
             safeAreaInset={{bottom: props.bottomSafeArea}}
             getLabelText={renderLabel}
             renderIcon={renderIcon}
           />
         </BlurView>
       )
     });

}

export default CustomTabBarBottom;
