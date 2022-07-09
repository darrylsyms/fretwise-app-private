import React from "react";
import { View, Text, Image } from "react-native";
import { globalStyle } from "@src/styles/global";
import { useSelector } from 'react-redux';


const AfterProfileDetails = ({ user }) => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;

    const UserPosts = () => {
        if (user?.userPoints[1]?.point == 1) {
            return (
                <Text style={global.profileAlbumText}>{user?.userPoints[1]?.point} Post</Text>
            )
        }
        return (
            <Text style={global.profileAlbumText}>{user?.userPoints[1]?.point} Posts</Text>
        )
    }
    
    return (
        <View style={{ marginTop: 10 }}>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                <Image style={{ width: 13, height: 13, marginRight: 3 }} source={{ uri: user?.userPoints[0]?.image }} />
                <Text style={global.profileAlbumText}>{user?.userPoints[0]?.point} Wisdom</Text>
                <Image style={{ width: 13, height: 13, marginRight: 3, marginLeft: 15 }} source={{ uri: user?.userPoints[1]?.image }} />
                <UserPosts />
            </View>
        </View>
    )
}

export default AfterProfileDetails;