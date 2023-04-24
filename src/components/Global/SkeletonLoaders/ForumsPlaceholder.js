import React from 'react';
import Skeleton from './SkeletonLoader'
import { StyleSheet, View } from 'react-native';
import { GUTTER, globalStyle } from "@src/styles/global";
import { useSelector } from "react-redux";

const ForumsSkeleton = () => {

    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { global } = globalStyles;

    return (
        <View style={{ marginHorizontal: GUTTER }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                //marginHorizontal: GUTTER,
                paddingVertical: 20,
                ...global.bottomBorder
            }}>

                <View
                    style={[
                        global.row,
                        //global.bottomBorder,
                        { justifyContent: "space-between", flex: 1, alignItems: "flex-start" }
                    ]}
                >
                    <Skeleton
                        height={80}
                        width={80}
                        style={styles.skeletonImage}
                    />
                    <View style={[
                        //global.bottomBorder, 
                        styles.infoContainer
                    ]}>

                        <Skeleton
                            height={16}
                            width={100}
                            style={[styles.skeletonText, {marginBottom: 5}]}
                        />
                        <Skeleton
                            height={14}
                            width={200}
                            style={[styles.skeletonText, {marginBottom: 3}]}
                        />
                        <Skeleton
                            height={14}
                            width={150}
                            style={[styles.skeletonText, {marginBottom: 5}]}
                        />
                        <Skeleton
                            height={11}
                            width={50}
                            style={styles.skeletonText}
                        />

                    </View>
                </View>
            </View>
        </View>
    );
};

export default ForumsSkeleton;

const styles = StyleSheet.create({
    skeletonImage: {
        borderRadius: 14,
        marginRight: 10,
        marginBottom: 7,
    },
    skeletonText: {
        borderRadius: 14,
    },
    infoContainer: {
        marginLeft: 16,
        paddingRight: 16,
        flex: 1,
    }
});