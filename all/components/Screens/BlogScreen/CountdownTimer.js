import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { connect, useSelector } from "react-redux";
import { globalStyle } from "@src/styles/global";
import { withNavigationFocus } from 'react-navigation';
import { getApi } from "@src/services";


const Component = (props) => {

    const [currentTime, setCurrentTime] = useState(Date.now());
    const [apiResponse, setApiResponse] = useState([0, 0, 0, 0, 0, 0]);
    const [apiResponseFetched, setApiResponseFetched] = useState(false);
    const intervalRef = useRef();
    
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;


    const targetTime = new Date(Date.UTC(...apiResponse))
    const timeBetween = targetTime - currentTime;
    //const seconds = Math.floor((timeBetween / 1000) % 60);
    const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
    const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
    //const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

    useEffect(() => {

        const api = getApi(props.config);
        api.customRequest(
            "media/custom-restapi-endpoints/v1/time",
            "get",
            {},
            null,  
            {}, 
            false 
        ).then((response) => {
            setApiResponse([3000, 1, 1, response.data.hour, response.data.minute, 0]);
            setApiResponseFetched(true);
        });

        const intervalHandler = () => {
            intervalRef.current = setInterval(() => {
                setCurrentTime(Date.now());
            }, 5000);
        };
        
        if (props.isFocused) intervalHandler();

        const interval = intervalRef.current;
        return () => clearInterval(interval);

    }, []);

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                ...global.bottomBorder,
                backgroundColor: "#f6f6f8"
            }}
        >
            <Text style={{
                marginRight: 10,
                ...global.wrappedTextButtonLabel, //courseStatusTagText
                color: '#000',
            }}>Next challenge available in:</Text>
            <View style={styles.countdownBox}>
                <Text style={[global.boldText, { fontSize: 15 }]}>{apiResponseFetched ? hours : " "}</Text>
                <Text style={[
                    global.courseStatusTagText,
                    styles.insideText
                ]}>HRS</Text>
            </View>
            <Text style={{ fontWeight: "bold", marginHorizontal: 2 }}>:</Text>
            <View style={styles.countdownBox}>
                <Text style={[global.boldText, { fontSize: 15 }]}>{apiResponseFetched ? minutes : " "}</Text>
                <Text style={[
                    global.courseStatusTagText,
                    styles.insideText
                ]}>MINS</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    countdownBox: {
        padding: 10,
        backgroundColor: "#F9B711",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        minWidth: 40
    },
    insideText: {
        color: "#fff",
        position: "absolute",
        bottom: 1,
        fontSize: 6,
    }
});

const mapStateToProps = (state) => ({
    config: state.config,
});

const Countdown = withNavigationFocus(Component)

export default connect(mapStateToProps)(Countdown);