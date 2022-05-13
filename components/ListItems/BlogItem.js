import React from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { ItemTitle } from "@src/components/TextComponents";
import IconButton from "@src/components/IconButton";
import { useSelector } from 'react-redux';
import { formatDateTime } from "../../styles/utils";
import { isTabletOrIPad } from "@src/utils";

const BlogItem = props => {

   const { item, global, colors, index, t } = props;
   const user = useSelector((state) => state.user.userObject);
   const memberType = Object.keys(user.member_types)[0];

   const regex = /(<([^>]+)>)/ig;
   const excerpt = item?.excerpt?.rendered?.replace(regex, '');

   return (
      <View>
         <AppTouchableOpacity
            onPress={memberType !== "student" ? item.onClick : {}}
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
                        {memberType !== "student"
                           ? (
                              <Text numberOfLines={4} ellipsizeMode={"tail"} style={[global.textAlt, {
                                 marginVertical: 10
                              }]}>{excerpt}</Text>
                           ) : (
                              <>
                                 <Text numberOfLines={2} ellipsizeMode={"tail"} style={[global.textAlt, {
                                    marginVertical: 10, marginBottom: 5
                                 }]}>{excerpt}</Text>
                                 <View style={{
                                    backgroundColor: '#f9dede', borderRadius: 4, marginVertical: 10
                                 }}>
                                    <Text style={[global.textAlt, {
                                       padding: 6, fontWeight: 'bold', color: '#f84343'
                                    }]}>You must be a subscribing member to access this content.</Text>
                                 </View>
                              </>
                           )
                        }

                        <View style={{ flex: 1 }} />
                        <View style={[global.row, { alignItems: "center" }]}>
                           <Image source={require('../../assets/img/metadata/blog-date.png')} style={{ marginRight: 6, height: 14, width: 14 }} />
                           <Text style={global.itemMeta}>{formatDateTime(item.date)}</Text>
                           {item.allowComments && <View style={global.dotSep} />}
                           {item.allowComments && (
                              <IconButton
                                 icon={require("@src/assets/img/activity-actions/post-comment.png")}
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

export default BlogItem;