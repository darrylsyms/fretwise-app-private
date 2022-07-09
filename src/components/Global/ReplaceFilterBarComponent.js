import React from "react";
import { View } from "react-native";
import Countdown from "../Screens/BlogScreen/CountdownTimer";

const FilterBarComponents = (props) => {

    if (props.filterType === "blog") {
        return <Countdown />
    }

    if (props.filterType === "groups") {
        return null
    }

    if (props.filterType === "documents") {
        return null
    }

    const count = props.getCount(props.filter)

    return <View>{props.renderFilter(count)}</View>

}

export default FilterBarComponents;