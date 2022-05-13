import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { withNavigation, NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";
import { globalStyle } from "@src/styles/global";

const ProfileHeaderButton = (props) => {

  const { navigation } = props;

  const user = useSelector((state) => state.user.userObject);
  const globalStyles = useSelector((state) => globalStyle(state.config.styles))
  const { colors } = globalStyles;

  const Route = () => {
    navigation.dispatch(
      NavigationActions.navigate({
        routeName: "EditNavigation"
      })
    )
  }

  if (navigation?.state?.params?.user?.id == user?.id) { // only display component if on own profile screen
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => Route()} style={[styles.roundButton, { backgroundColor: colors.headerBg }]}>
          <Image style={styles.icon} source={require("../../../assets/img/icons/edit-profile2.png")} />
        </TouchableOpacity>
      </View>
    )
  }

  return null

}

export default withNavigation(ProfileHeaderButton);


const styles = StyleSheet.create({
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 100,
  },
  icon: {
    width: 16,
    height: 16,
  },
})
