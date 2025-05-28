import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";


const InicioStack = createStackNavigator();

export default function InicioStackNavigator() {
  return (
    <InicioStack.Navigator>
      <InicioStack.Screen
        name="Inicio"
        component={HomeScreen} 
        options={{
          headerShown: false, // O true si quieres encabezado
          title: "Inicio",
        }}
      />
    </InicioStack.Navigator>
  );
}