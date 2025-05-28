import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiUri } from '../../utils/variables'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './ProductComponenStyle'
import { ItemProduct } from './ItemProduct'

export function ProductComponent() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  })
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const productos = async (pagina = 1) => {
    try {
      const url = `${ApiUri}/catalogo/productos/?page=${pagina}`
      const token = await AsyncStorage.getItem('token')
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) throw new Error('Error al obtener los productos')

      const newPagination = response.data.pagination
      setPagination(newPagination)

      const newProducts = response.data.data
      setProducts(pagina === 1 ? newProducts : [...products, ...newProducts])
    } catch (error) {
      console.log(error)
      setError('No se pudo obtener los productos.')
    } finally {
      setLoading(false)
      setIsFetchingMore(false)
    }
  }

  useEffect(() => {
    productos(1)
  }, [])

  const loadMore = () => {
    if (
      !isFetchingMore &&
      pagination.current_page < pagination.last_page
    ) {
      setIsFetchingMore(true)
      const nextPage = pagination.current_page + 1
      productos(nextPage)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : products.length > 0 ? (
        <FlatList
          style={styles.container}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ItemProduct item={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isFetchingMore ? (
              <ActivityIndicator size="large" color="#0000ff" style={{ padding: 16 }} />
            ) : null
          }
        />
      ) : (
        <Text>No hay productos</Text>
      )}
    </View>
  )
}
