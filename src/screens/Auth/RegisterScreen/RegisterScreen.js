import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export function RegisterScreen() {
    const navigate = useNavigation()
 return (
 <View>
 <Text onPress={()=>navigate.goBack()}>RegisterScreen</Text>
 </View>
 )
}