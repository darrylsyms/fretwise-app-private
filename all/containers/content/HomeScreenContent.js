import React from 'react';
import { StyleSheet, View } from 'react-native';
import BeforeBlocks from '../../components/Screens/CustomHomeScreen/WelcomeWidget';
import CoursesWidgetContainer from '../../components/Screens/CustomHomeScreen/CoursesWidgetContainer';
import TopicsWidgetContainer from '../../components/Screens/CustomHomeScreen/TopicsWidgetContainer';

const HomeContent = () => {
    return (
        <View style={styles.container}>
            <BeforeBlocks />
            <CoursesWidgetContainer />
            <TopicsWidgetContainer />
        </View>
    );
};

export default HomeContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 80
    },
});