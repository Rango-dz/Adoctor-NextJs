import * as yup from 'yup';

export const CommentSchema = yup.object().shape({
  name: yup.string().min(3).required("required"),
  email: yup.string().email('Please enter a valid email').required("required"),
  comment: yup.string().min(10).max(300).required("required")
}).required('Please fill out all fields');