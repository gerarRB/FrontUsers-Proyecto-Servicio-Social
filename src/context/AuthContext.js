import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const loginAuth = async (newToken) => {
    try {
      setToken(newToken);
      await AsyncStorage.setItem('token', newToken);
      const decodedToken = jwtDecode(newToken);
      const userData = {
        id: decodedToken.user_id,
        email: decodedToken.email,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); // Actualizar user inmediatamente
      setIsLogin(true);
    } catch (error) {
      console.error('Error en loginAuth:', error);
    }
  };

  const logoutAuth = async () => {
    try {
      setToken(null);
      setUser(null);
      setIsLogin(false);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error en logoutAuth:', error);
    }
  };

  useEffect(() => {
    const checkoutIsLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userData = await AsyncStorage.getItem('user');

        if (token && userData) {
          setToken(token);
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsLogin(true);
        } else {
          setIsLogin(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error en checkoutIsLogin:', error);
        setIsLogin(false);
      }
    };

    checkoutIsLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, token, loginAuth, logoutAuth, user, setUser, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};