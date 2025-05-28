// import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    const loginAuth= async(newToken)=>{
        try {

            setToken(newToken);
            await AsyncStorage.setItem('token', newToken);
            const decodedToken = jwtDecode(newToken);
            const userData = {
                id: decodedToken.user_id,
              
                email: decodedToken.email,
            
            }
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(newToken);
        } catch (error) {
            console.log(error);
        }
    }
    const logoutAuth = async () => {
        try {
            setToken(null);
            setUser(null);
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const checkoutIsLogin = async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              const userData = await AsyncStorage.getItem('user');
          
              if (token) {
                setToken(token);
                setIsLogin(true);
                if (userData) {
                  setUser(JSON.parse(userData));
                }
              } else {
                setIsLogin(false);
              }
            } catch (error) {
              console.log(error);
            }
          };
        checkoutIsLogin();
          
    }, []);
    
    return (
        <AuthContext.Provider value={{ isLogin, token, loginAuth, logoutAuth, user, setIsLogin }}>
        {children}
        </AuthContext.Provider>
    );
    }