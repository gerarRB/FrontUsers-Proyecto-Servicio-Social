import { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BotomTabsNavigator from './src/navigation/BotomTabsNavigator';
import { AuthNavigationScreen } from './src/navigation/AuthNavigationScreen';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './gesture-handler';



const Navigation = () => {
  const { isLogin } = useContext(AuthContext);
  return isLogin ? <BotomTabsNavigator /> : <AuthNavigationScreen />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <Navigation />
          </View>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
