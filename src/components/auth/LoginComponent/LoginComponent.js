import { Button, Input } from "@rneui/base";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native"; // Added Text import
// import { Button } from "react-native"; // Use native Button instead
import * as Yup from "yup";
import { initialValues, schemaValidations } from "./LoginComponentData";
import { style } from "./LoginComponentStyle";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ApiUri } from "../../../utils/variables";

export function LoginComponent() {
  const navigate = useNavigation();
  const {setIsLogin,loginAuth} = useContext(AuthContext)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidations,
    onSubmit: async (values) => {
      const url = ApiUri + "/auth/login";
      const response = await axios.post(url, {
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      if (response.status === 200) {
        const token = response.data.token;
        loginAuth(token);
        setIsLogin(true);
       
          navigate.push("Login");
       
      }
      // loginAuth(values.email)
      // setIsLogin(true)
      // setTimeout(() => {
      //   navigate.push("Login")
        

      // }
      // , 2000)
      
    },
  });
  
  const [iconEye, setIconEye] = useState("eye");
  const [secureText, setSecureText] = useState(true);

  const changeIconEye = () => {
    setIconEye((prevState) => (prevState === "eye" ? "eye-off" : "eye"));
    setSecureText((prevState) => !prevState);
  };

  return (
    <View style={style.viewsLogin}>
      {/* Use TouchableOpacity to trigger form submission */}
      <Input
        label="Email"
        id="email"
        name="email"
        containerStyle={style.containerInput}
        
        onChangeText={(texto) => formik.setFieldValue("email", texto)}
        errorMessage={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
      />
      <Input
        id="password"
        name="password"
        secureTextEntry={secureText}
        label="Password"
        containerStyle={style.containerInput}
        rightIcon={{
          type: "material-community",
          name: iconEye,
          onPress: changeIconEye,
        }}
        onChangeText={(texto) => formik.setFieldValue("password", texto)}
        errorMessage={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
      />

      {/* Replace native button */}
      <Button title="Submit" containerStyle={{
                width: 360,
                marginHorizontal: 50,
                marginVertical: 10,
              }} onPress={formik.handleSubmit} />


    </View>
  );
}
