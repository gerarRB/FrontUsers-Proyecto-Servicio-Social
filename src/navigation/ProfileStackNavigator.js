import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PerfilComponent from '../components/PerfilComponent/PerfilComponent';

const ProfileStack = createStackNavigator();

export  function ProfileStackNavigator() {
 return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Perfil"
        component={PerfilComponent}
        options={{
          headerShown: false, // O true si quieres encabezado
          title: "Perfil",
        }}
      />
      {/* <ProfileStack.Screen name="Orders" component={OrdersScreen} />
    <ProfileStack.Screen name="Cart" component={CartScreen} /> */}
    </ProfileStack.Navigator>
  )
 
}