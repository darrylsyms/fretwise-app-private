import React from 'react';
import Skeleton from './SkeletonLoader'
import { View } from 'react-native';
import { isTabletOrIPad } from "@src/utils";

const TopicSkeleton = () => {
    return (
        <View style={[{ borderBottomWidth: 0.5, borderBottomColor: '#d6d6d6', marginBottom: 15 }]}>

            <View style={{ flexDirection: 'row', marginBottom: 15 }}>

                <View style={{ width: '65%', paddingRight: 20 }}>
                    <View>
                        <Skeleton
                            height={18}
                            width={50}
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                alignSelf: 'flex-start',
                                borderRadius: 6,
                                marginBottom: 10
                            }}
                        />


                        <Skeleton
                            height={22}
                            width={180}
                            style={{ marginBottom: 10, borderRadius: 20 }}
                        />


                        <Skeleton
                            height={16}
                            width={130}
                            style={{ marginBottom: 2, borderRadius: 20 }}
                        />
                        <Skeleton
                            height={16}
                            width={130}
                            style={{ marginBottom: 2, borderRadius: 20 }}
                        />
                        <Skeleton
                            height={16}
                            width={100}
                            style={{ marginBottom: 22, borderRadius: 20 }}
                        />

                        <Skeleton
                            height={11}
                            width={30}
                            style={{ borderRadius: 20 }}
                        />

                    </View>
                </View>

                <View style={{ width: '35%' }}>
                    <Skeleton
                        height={isTabletOrIPad() ? 230 : 140}
                        width={100}
                        style={{ borderRadius: 20, width: '100%' }}
                    />
                </View>

            </View>

        </View>
    );
};

export default TopicSkeleton;