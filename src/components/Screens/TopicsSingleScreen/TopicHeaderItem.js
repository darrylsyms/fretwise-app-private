import React from "react";
import { View, Text } from "react-native";
import { getAvatar } from "@src/utils";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import AvatarSpecial from "../../Global/CustomComponents/AvatarSpecial";

const TopicHeaderAvatar = (props) => {

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

  let ProfileType;
  if(hash?._embedded.user[0]?.member_types) ProfileType = Object.keys(hash?._embedded.user[0]?.member_types)[0];
  if(!hash?._embedded.user[0]?.member_types) ProfileType = "visitor";
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
          <AvatarSpecial
            isSubscriber={isSubscriber}
            size={avatarSize}
            source={{
              uri: getAvatar(item.author.avatar, 96)
            }}
            name={item.author.name}
          />
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

export default TopicHeaderAvatar;