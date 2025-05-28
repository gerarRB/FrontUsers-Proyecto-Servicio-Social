import * as Yup from 'yup'

export function initialValues(){
    return {
        email:'',
        password:''
    }
}

export const schemaValidations = Yup.object().shape({
  email: Yup.string()
    .email("Email invalido")
    .required("El email es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
});