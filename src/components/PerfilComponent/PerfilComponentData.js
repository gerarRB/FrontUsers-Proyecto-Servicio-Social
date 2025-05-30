import * as Yup from 'yup';

export const initialValues = {
  password: '',
  passwordConfirmation: '',
};

export const schemaValidations = Yup.object().shape({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La nueva contraseña es requerida'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('La confirmación de la contraseña es requerida'),
});