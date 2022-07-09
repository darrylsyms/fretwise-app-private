import React from 'react';
import Skeleton from './SkeletonLoader';
import CourseSkeleton from './CoursePlaceholder';
import { StyleSheet, View, ScrollView } from 'react-native';
import { GUTTER, globalStyle } from "@src/styles/global";
import { useSelector } from "react-redux";

const CourseCategoriesSkeleton = () => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;

    const Category = () => {
        return (
            <View style={[global.widgetInner, global.bottomBorder]}>
                <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: GUTTER }}>
                    <Skeleton
                        height={21}
                        width={100}
                        style={styles.skeletonText}
                    />
                    <Skeleton
                        height={17}
                        width={40}
                        style={[styles.skeletonText, { textAlign: 'right' }]}
                    />
                </View>
                <ScrollView
                    horizontal={true}
                    decelerationRate={8}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: GUTTER }}
                >
                    <CourseSkeleton />
                    <CourseSkeleton />
                    <CourseSkeleton />
                </ScrollView>
            </View>
        )
    }

    return (
        <View>
            <Category />
            <Category />
            <Category />
        </View>
    );
};

export default CourseCategoriesSkeleton;



const styles = StyleSheet.create({
    skeletonImage: {
        borderRadius: 14,
        marginRight: 10,
        marginBottom: 7,
    },
    skeletonText: {
        borderRadius: 14,
    },
});