import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ApiUri } from "../../utils/variables";
import { style } from "./PerfilComponentStyle";
import { initialValues, schemaValidations } from "./PerfilComponentData";

export default function PerfilComponent() {
  const { user, token, logoutAuth, setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${ApiUri}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await logoutAuth();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "No se pudo cerrar sesión. Intenta de nuevo."
      );
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidations,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${ApiUri}/users/update-password`,
          {
            password: values.password,
            password_confirmation: values.passwordConfirmation,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        Alert.alert(
          "Éxito",
          response.data.message || "Contraseña actualizada exitosamente"
        );
        formik.resetForm();
      } catch (error) {
        console.error("Error al actualizar contraseña:", error);
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "No se pudo actualizar la contraseña. Intenta de nuevo."
        );
      }
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.header}>Mi Perfil</Text>
      <View style={style.card}>
        <View style={style.detail}>
          <Text style={style.label}>Correo:</Text>
          <Text style={style.value}>{user?.email || "N/A"}</Text>
        </View>
        <View style={style.formContainer}>
          <Text style={style.formTitle}>Cambiar Contraseña</Text>
          <Input
            label="Nueva Contraseña"
            secureTextEntry={!showPassword}
            containerStyle={style.input}
            rightIcon={{
              type: "material-community",
              name: showPassword ? "eye-off" : "eye",
              onPress: () => setShowPassword(!showPassword),
            }}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
            errorMessage={formik.touched.password && formik.errors.password}
          />
          <Input
            label="Confirmar Contraseña"
            secureTextEntry={!showConfirmPassword}
            containerStyle={style.input}
            rightIcon={{
              type: "material-community",
              name: showConfirmPassword ? "eye-off" : "eye",
              onPress: () => setShowConfirmPassword(!showConfirmPassword),
            }}
            onChangeText={formik.handleChange("passwordConfirmation")}
            onBlur={formik.handleBlur("passwordConfirmation")}
            value={formik.values.passwordConfirmation}
            errorMessage={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />
          <Button
            title="Actualizar Contraseña"
            containerStyle={style.button}
            onPress={formik.handleSubmit}
          />
        </View>
        <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
          <Text style={style.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
