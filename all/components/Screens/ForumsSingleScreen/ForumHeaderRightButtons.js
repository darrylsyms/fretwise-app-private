import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from "react-navigation";

export const ForumHeaderButtons = (props) => {

  const { 
    forum, 
    navigation,
    t, 
    colors,
    global, 
    headerColor, 
    actionButtons 
  } = props;

  const createDiscussion = () => {

    const newForum = {
      ...forum,
      title: {
        raw: forum.title
      }
    }

    navigation.dispatch(
      NavigationActions.navigate({
        routeName: "AddTopicScreen",
        params: {
          action: "newForum",
          from: "forum",
          forum: newForum
        }
      })
    )
  }

  return <>
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => createDiscussion()} style={[styles.roundButton, { backgroundColor: colors.headerBg }]}>
        <Image style={styles.icon} source={require("../../../assets/img/icons/plus-white.png")} />
      </TouchableOpacity>
    </View>
  </>
}

export default withNavigation(ForumHeaderButtons);

const styles = StyleSheet.create({
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 100,
  },
  icon: {
    width: 15,
    height: 15,
  },
})
