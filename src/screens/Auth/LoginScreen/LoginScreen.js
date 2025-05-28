import React, { Component, useState } from 'react'

import { Button, Input, Text } from '@rneui/base'
import { LoginComponent } from '../../../components/auth/LoginComponent/LoginComponent'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export function LoginScreen() {
    const navigate = useNavigation()
    
    return (
        
            <LoginComponent />
       
    )
  
}

