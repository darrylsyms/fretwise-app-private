import React from 'react';
import Skeleton from './SkeletonLoader'
import { StyleSheet, View } from 'react-native';
import { isTabletOrIPad } from "@src/utils";

const CourseSkeleton = () => {
    return (
        <View>
            <Skeleton
                height={isTabletOrIPad() ? 195 : 120}
                width={isTabletOrIPad() ? 260 : 160}
                style={styles.skeletonImage}
            />
            <Skeleton
                height={16}
                width={100}
                style={styles.skeletonText}
            />
        </View>
    );
};

export default CourseSkeleton;

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