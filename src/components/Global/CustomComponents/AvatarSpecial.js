import React from "react";
import { View, Image } from 'react-native';
import AppAvatar from "@src/components/AppAvatar";
import LinearGradient from 'react-native-linear-gradient';

const AvatarSpecial = (props) => {

    const { isSubscriber, size, source, name } = props;

   return(
      <View style={{ marginRight: 5, justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(158, 150, 150, 0)' }}>
            <LinearGradient
              colors={isSubscriber ? ['#F49934', '#BC3B77', '#3A66E0'] : ['#fff', '#fff']}
              useAngle={true}
              angle={140}
              angleCenter={{ x: 0.5, y: 0.5 }}
              style={{ flex: 1, borderRadius: 55 }}
            >
              <AppAvatar
                size={size}
                name={name}
                source={source}
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
            {isSubscriber && (
                <View style={{ position: "absolute", bottom: -1, right: -1, elevation: 3, }}>
                    <Image style={{ width: 14, height: 14 }} source={require("../../../assets/img/branding/fw-badge.png")} />
                </View>
            )}
          </View>
  )
}

export default AvatarSpecial;