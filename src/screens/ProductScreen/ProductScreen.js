import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ProductComponent } from '../../components/ProductsComponent'

export function ProductScreen() {
  
    return (
       <SafeAreaView style={{ flex: 1 }}>
    <ProductComponent />
</SafeAreaView>

    )
  
}

