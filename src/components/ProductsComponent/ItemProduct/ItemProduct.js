import { View } from "react-native";
import React from "react";
import { Image, Text } from "@rneui/base";
import styles from "./ItemProductStyle";

export function ItemProduct({ item }) {
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.image.path }}
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.productName}>{item.nombre}</Text>
      <Text style={styles.productPrice}>${item.precio}</Text>

    </View>
  );
}
