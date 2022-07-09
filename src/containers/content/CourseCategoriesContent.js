import React from 'react';
import { StyleSheet, View } from 'react-native';
import CourseCategoriesWidget from '../../components/Screens/CourseCategoriesScreen/CourseCategoriesWidget';


const CourseCategoriesContent = () => {
    return (
        <View style={styles.container}>
            <CourseCategoriesWidget />
        </View>
    );
};

export default CourseCategoriesContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});