import React from 'react';
import { View } from 'react-native';
import ProductsScreen from "@src/containers/Custom/ProductsScreen";

const ProductsScreeen = (props) => {

 return (
   <View style={{ flex: 1 }}>
     <ProductsScreen {...props} screenTitle="Available products" hideNavigationHeader={true}/>
   </View>)
}

ProductsScreeen.navigationOptions = {
 header: null
}

export default ProductsScreeen;

/*
//In custom_code/index.js...

export const applyCustomCode = externalCodeSetup => {

 externalCodeSetup.navigationApi.addNavigationRoute(
   "products",
   "ProductsScreeen",
   ProductsScreeen,
   "All"
 );
 externalCodeSetup.navigationApi.addNavigationRoute(
   "products",
   "ProductsScreeen",
   ProductsScreeen,
   "Main"
 );
}
*/