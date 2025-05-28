import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "@rneui/base";
import { ProfileStackNavigator } from "./ProfileStackNavigator";
import ProductStackNavigator from "./ProductStackNavigator";
import InicioStackNavigator from "./InicioStackNavigator";

const Tabs = createBottomTabNavigator();
export default function BotomTabsNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Inicio"
        component={InicioStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" type="material-community" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Productos"
        component={ProductStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping" type="material-community" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" type="material-community" color={color} />
          ),
        }}
      />
     
    </Tabs.Navigator>

  );
}
