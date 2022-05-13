import React from 'react';
import Skeleton from './SkeletonLoader'
import { StyleSheet, View } from 'react-native';
import { GUTTER, DEVICE_WIDTH } from "@src/styles/global";

const ShortTextSkeleton = () => {

    const fullWidth = DEVICE_WIDTH - (GUTTER * 2);
    const partialWidth = DEVICE_WIDTH - (GUTTER * 8);

    return (
        <View>
            <Skeleton
                height={12}
                width={fullWidth}
                style={styles.skeletonText}
            />
            <Skeleton
                height={12}
                width={partialWidth}
                style={styles.skeletonText}
            />
        </View>
    );
};

export default ShortTextSkeleton;

const styles = StyleSheet.create({
    skeletonText: {
        borderRadius: 14,
        marginBottom: 10,
    }
});