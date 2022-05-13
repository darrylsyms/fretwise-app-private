import React from "react";
import { View, Text } from "react-native";
import { getAvatar } from "@src/utils";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import AppAvatar from "@src/components/AppAvatar";
import LinearGradient from 'react-native-linear-gradient';
import AvatarBadge from "../../Global/SmallComponents/AvatarBadge";

const ItemHeader = (props) => {

  const {
    item,
    global,
    formatDateFunc,
    textColor,
    linkColor,
    light,
    alignItems,
    avatarSize,
    titleStyle,
    actionButtons
  } = props

  const hash = JSON.parse(item.hash);
  const ProfileType = Object.keys(hash?._embedded.user[0]?.member_types)[0];
  const SubscriberRoles = ["instructor", "admin", "subscriber", "member"];
  const isSubscriber = SubscriberRoles.includes(ProfileType);

  let lightStyle = {}; // Will be useful for Light Mode & Dark Mode soon!
  if (light) lightStyle = { color: "#ffffff" };

  let alignStyle = {};
  if (alignItems) alignStyle = { alignItems: alignItems };
  return (
    <View style={[global.itemHeader, alignStyle]}>
      <View style={[global.itemLeft, { alignItems: "center" }]}>
        <AppTouchableOpacity
          onPress={item.navigateToProfile ? item.navigateToProfile : () => { }}
          style={global.avatarWrap}
        >
          <View style={{ marginRight: 10, JustifyContent: 'center', borderWidth: 4, borderColor: 'rgba(158, 150, 150, 0)' }}>
            <LinearGradient
              colors={isSubscriber ? ['#F49934', '#BC3B77', '#3A66E0'] : ['#fff', '#fff']}
              useAngle={true}
              angle={140}
              angleCenter={{ x: 0.5, y: 0.5 }}
              style={{ flex: 1, borderRadius: 55 }}
            >
              <AppAvatar
                size={avatarSize}
                name={item.author.name}
                source={{
                  uri: getAvatar(item.author.avatar, 96)
                }}
                style={{
                  alignSelf: "flex-start",
                  justifyContent: 'center',
                  elevation: 1,
                  backgroundColor: '#fff',
                  padding: 1,
                  margin: 1,
                  borderRadius: 55
                }}
              />
            </LinearGradient>
            {isSubscriber && <AvatarBadge />}
          </View>
        </AppTouchableOpacity>
        {!!item.author.name && (
          <View style={{ flex: 1 }}>
            <Text
              style={[
                global.itemName,
                lightStyle,
                titleStyle
              ]}
            >
              {item.author.name}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={[global.itemMeta, lightStyle]}>
                {formatDateFunc(item.date)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ItemHeader;