import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductScreen } from "../screens/ProductScreen";

const ProductStack = createStackNavigator();

export default function ProductStackNavigator() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerShown: false, // O true si quieres encabezado
          title: "Productos",
        }}
      />
      {/* <ProductStack.Screen name="Orders" component={OrdersScreen} />
     <ProductStack.Screen name="Profile" component={ProfileScreen} /> */}
    </ProductStack.Navigator>
  );
}
