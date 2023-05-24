import React from "react";
import { View, StyleSheet, Text, Image, Platform, Alert } from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { ItemTitle } from "@src/components/TextComponents";
import IconButton from "@src/components/IconButton";
import { useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { formatDateTime } from "../../../src/styles/utils";
import { isTabletOrIPad } from "@src/utils";
import { isColorDark } from "@src/utils";
import Icon from "@src/components/Icon";

const BlogItem = props => {

   const { item, global, colors, index, t, navigation } = props;
   const state = useSelector((state) => state);
   const user = state.user?.userObject;

   let memberType;
   if (!user) memberType = "visitor";
   if (!user.member_types) memberType = "student";
   if (user.member_types) memberType = Object.keys(user?.member_types)[0];

   const SubscriberRoles = ["instructor", "admin", "subscriber", "member"];
   const isSubscriber = SubscriberRoles.includes(memberType);

   const regex = /(<([^>]+)>)/ig;
   const excerpt = item?.excerpt?.rendered?.replace(regex, '');

   const PopupAlert = () =>
      Alert.alert(
         "Restricted Content",
         "You must be a subscribing Fretwise member to access this post",
         [
            {
               text: "Subscribe Now",
               onPress: () => memberType == "visitor" ? navigation.navigate("SignupScreen") : navigation.navigate("MoreScreen") // TODO: ProductsScreen needs props passed for it to work properly...
            },
            { text: "Ok", onPress: () => console.log("Ok Pressed") }
         ]
      );

   return (
      <View>
         <AppTouchableOpacity
            onPress={isSubscriber ? item.onClick : PopupAlert}
         >
            <View style={{ backgroundColor: '#fff' }}>
               <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 15,
                  paddingTop: 18,
                  paddingBottom: 16,
                  borderRadius: 12,
                  backgroundColor: '#fff',
                  ...global.bottomBorder
               }}>
                  <View
                     style={[
                        global.row,
                        { justifyContent: "space-between", flex: 1, alignItems: "flex-start" }
                     ]}
                  >
                     <View style={[styles.imageWrapper]}>
                        <Image
                           style={[
                              styles.imageStyle,
                              { borderColor: "rgba(0,0,0,0.08)", borderWidth: 1 }
                           ]}
                           resizeMode="cover"
                           source={item.featuredImage}
                        />
                     </View>

                     <View style={[
                        styles.infoContainer
                     ]}>
                        <ItemTitle
                           global={global}
                           numberOfLines={2}
                           style={[global.itemTitle, { color: colors.headingsColor }]}
                        >
                           {item.title}
                        </ItemTitle>
                        {isSubscriber && (
                        <Text numberOfLines={4} ellipsizeMode={"tail"} style={[global.textAlt, {
                           marginTop: 10,
                           marginBottom: 0
                        }]}>{excerpt}</Text>
                        )}

                        <View style={{ flex: 1 }} />
                        <View style={[global.row, { alignItems: "center" }]}>
                           <Image source={require('../../assets/img/metadata/blog-date.png')} style={{ marginRight: 6, height: 14, width: 14 }} />
                           <Text style={global.itemMeta}>{formatDateTime(item.date_gmt)}</Text>
                           {item.allowComments && <View style={global.dotSep} />}
                           {item.allowComments && (
                              <IconButton
                                 icon={{fontIconName: "comment-square-dots", weight: 300}} //post-comment.png
                                 tintColor={colors.textIconColor}
                                 style={{ height: 17, width: 17, marginLeft: -4 }}
                                 renderText={() => (
                                    <Text style={[{ marginLeft: 6 }, global.activityCount]}>
                                       {item.commentCount}
                                    </Text>
                                 )}
                              />
                           )}
                        </View>
                     </View>
                  </View>
               </View>
               {!isSubscriber && (
                  <>
                     <View
                        style={{
                           position: 'absolute',
                           height: '100%',
                           width: '100%',
                           backgroundColor: isColorDark(colors.bodyFrontBg)
                              ? "black"
                              : "white",
                           opacity: 0.8,
                           ...global.bottomBorder,
                           paddingHorizontal: 15
                        }}
                     />
                     <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                     }}>
                        <Icon
                           webIcon={""}
                           icon={require("../../assets/img/icons/lock.png")}
                           tintColor={colors.headingsColor}
                           styles={{
                              width: 20,
                              height: 20,
                              paddingBottom: 4
                           }}
                        />
                        <Text style={[global.itemTitle, { color: colors.headingsColor }]}>Subscriber-only content</Text>
                     </View>
                  </>
               )}
            </View>
         </AppTouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   imageWrapper: {
      height: isTabletOrIPad() ? 140 : 80,
      width: isTabletOrIPad() ? 140 : 80,
      borderRadius: 14,
   },
   imageStyle: {
      height: isTabletOrIPad() ? 140 : 80,
      width: isTabletOrIPad() ? 140 : 80,
      borderRadius: 14,
      overflow: "hidden"
   },
   infoContainer: {
      marginLeft: 16,
      paddingRight: 16,
      flex: 1,
   }
});

export default withNavigation(BlogItem);