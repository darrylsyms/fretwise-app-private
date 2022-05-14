import React from "react";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import AvatarSpecial from "../../Global/SmallComponents/AvatarSpecial";

const ReplyItemAvatar = (props) => {

    const { reply, global, isNested } = props;

    const SubscriberRoles = ["instructor", "Instructor", "admin", "subscriber", "Subscriber"];
    const isSubscriber = SubscriberRoles.includes(reply.author.type);

    return (
        <AppTouchableOpacity
            onPress={reply.navigateToProfile ? reply.navigateToProfile : () => { }}
            style={global.avatarWrap}
        >
            <AvatarSpecial
                isSubscriber={isSubscriber}
                size={isNested ? 30 : 40}
                source={{
                    uri: reply.author.avatarUrl
                }}
                name={reply.author.fullname}
            />
        </AppTouchableOpacity>
    )
}

export default ReplyItemAvatar;