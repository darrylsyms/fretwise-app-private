import React, { useRef, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Modalize } from 'react-native-modalize';
import { globalStyle, GUTTER, DEVICE_WIDTH, DEVICE_HEIGHT } from "@src/styles/global";
import { useSelector } from "react-redux";
import { Portal } from 'react-native-portalize';
import ProductsScreen from "@src/containers/Custom/ProductsScreen";

const MyCustomScreen = (props) => {

    return (
        <View style={{ flex: 1 }}>
            <ProductsScreen {...props} screenTitle="Choose a plan" hideNavigationHeader={true} />
        </View>)
}

MyCustomScreen.navigationOptions = {
    header: null
}

const ProductsModal = (props) => {

    const { toggleBottomSheet, shouldShow, products, navigation } = props;
    const globalStyles = useSelector((state) => globalStyle(state.config.styles))
    const { colors, global } = globalStyles;

    const MAX_HEADER_HEIGHT = 140;
    const ModalHeight = DEVICE_HEIGHT - MAX_HEADER_HEIGHT;

    const modalizeRef = useRef(null);


    const goToProduct = () => {
        //modalizeRef.current?.close();
        const productData = products[0]
        navigation.navigate({
            routeName: "ProductSingleScreen",
            params: {
                product: productData
            },
            //key: `TopicsSingleScreen-${topicItem.id.toString()}`
        })
    }

    useEffect(() => {
        if (shouldShow) {
            modalizeRef.current?.open();
        }
        return () => { };
    }, [shouldShow]);

    const RenderHeader = (
        <View style={[global.bottomBorder, {
            //backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backgroundColor: colors.headerBg,
            height: 60,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        }]}>
            <Text style={[global.widgetTitle, {
                color: '#fff',
                marginHorizontal: GUTTER,
                paddingVertical: 15
            }]}>Choose a Plan</Text>
        </View>
    )


    return (
        <>
            <Portal>
                <View style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT, flex: 1 }} pointerEvents='box-none'>
                    <Modalize
                        ref={modalizeRef}
                        onClose={() => toggleBottomSheet(false)}
                        //snapPoint={ModalHeight}
                        modalHeight={ModalHeight}
                        HeaderComponent={RenderHeader}
                        //adjustToContentHeight={true}
                        scrollViewProps={{
                            showsVerticalScrollIndicator: true,
                        }}
                    >
                        <Text onPress={() => goToProduct()}> Hello! </Text>
                    </Modalize>
                </View>
            </Portal>
        </>
    );
}

export default ProductsModal;