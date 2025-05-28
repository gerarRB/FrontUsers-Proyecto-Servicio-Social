import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  productCard: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    productImage: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
    },
    productPrice: {
        fontSize: 16,
        color: "#888",
    },
});

export default styles;
