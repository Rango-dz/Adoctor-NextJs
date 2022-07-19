import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const AppointmentSchema = yup.object().shape({
  name: yup.string().min(3).required("required"),
  email: yup.string().email('Please enter a valid email').required("required"),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("required"),
  date: yup.string().max(10).required("required"),
  time: yup.string().max(10).required("required"),
  message: yup.string().min(10).max(300).required("required")
}).required('Please fill out all fields');

