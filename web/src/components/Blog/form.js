import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { CommentSchema } from '../validations/CommentsValidation';
import { useUser } from '@auth0/nextjs-auth0';
import retour from 'next/router';

export default function Form({ _id }) {
  const { user, error, isLoading } = useUser();
  // refrencing the form for emailjs
  const contactForm = useRef();

  // formik submit / validation function
  const onSubmit = async (values, actions) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    let response
    try {
      response = await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(values),
        type: 'application/json'
      })
    } catch (err) {

    }
  }


  // formik configuration
  const { values, errors, handleChange, touched, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      _id: '',
      name: '',
      email: '',
      comment: ''
    },
    validationSchema: CommentSchema,
    onSubmit,
  })

  if (!user) {
    return (
      <div className='flex flex-col justify-center mx-auto gap-5'>
        <h3>You need to be logged in to comment</h3>
        <button onClick={() => retour.push('/api/auth/login')} className="p-2 bg-colorOne dark:bg-colorRed font-bold text-white rounded-md w-full
        ">Login</button>
      </div>
    )
  }

  return (
    <form id='comments' className="md:grid md:grid-cols-1 gap-5 w-full md:w-2/3 mx-auto" ref={contactForm} onSubmit={handleSubmit}>
      <input type="hidden" name="_id" value={values._id = _id} />
      <div className='flex flex-col md:flex-row justify-center align-middle gap-5'>
        <div className='flex flex-col w-full'>
          <input
            type="text"
            value={values.name = user && user.name}
            onBlur={handleBlur}
            onChange={handleChange}
            name="name"
            placeholder={user && user.name}
            className={errors.name && touched.name ? "outline outline-1 outline-orange-600 ring-outline-orange-600 border-outline-orange-600 shadow-outline-orange-600 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-outline-orange-600 focus:border-outline-orange-600 focus:shadow-outline-orange-600 text-outline-orange-600 p-4 col-span-2 rounded-lg placeholder:text-sm dark:bg- bg-[#f5f6f7] shadow-none focus-within:shadow-none dark:bg-moroi-gray dark:focus-within:bg-moroi-gray" : "dark:bg-moroi-gray dark:focus-within:bg-moroi-gray p-4 col-span-2 rounded-lg mb-5 placeholder:text-sm bg-[#f5f6f7] shadow-none focus-within:shadow-none "} />
          {errors.name && touched.name && <div className="text-orange-700 text-sm mb-5">{errors.name}</div>}
        </div>

        <div className="flex flex-col w-full">
          <input
            type="text"
            value={values.email = user && user.email}
            onBlur={handleBlur}
            onChange={handleChange}
            name="email"
            placeholder={user && user.email}
            className={errors.email && touched.email ? "outline outline-1 outline-orange-600 ring-outline-orange-600 border-outline-orange-600 shadow-outline-orange-600 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-outline-orange-600 focus:border-outline-orange-600 focus:shadow-outline-orange-600 text-outline-orange-600 p-4 col-span-2 rounded-lg placeholder:text-sm bg-[#f5f6f7] shadow-none focus-within:shadow-none dark:bg-moroi-gray dark:focus-within:bg-moroi-gray" : "dark:bg-moroi-gray dark:focus-within:bg-moroi-gray p-4 col-span-2 rounded-lg mb-5 placeholder:text-sm bg-[#f5f6f7] shadow-none focus-within:shadow-none"} />
          {errors.email && touched.email && <div className="text-orange-700 text-sm mb-5">{errors.email}</div>}
        </div>

      </div>
      <div className='h-40 relative'>
        <textarea
          value={values.comment}
          onBlur={handleBlur}
          onChange={handleChange}
          name="comment" rows="full" cols="auto"
          placeholder="Additional Information"
          className={errors.comment && touched.comment ? "outline outline-1 outline-orange-600 ring-outline-orange-600 border-outline-orange-600 shadow-outline-orange-600 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-outline-orange-600 focus:border-outline-orange-600 focus:shadow-outline-orange-600 text-outline-orange-600 p-3 col-span-2 rounded-lg placeholder:text-sm bg-[#f5f6f7] w-full h-full  shadow-none focus-within:shadow-none dark:bg-moroi-gray dark:focus-within:bg-moroi-gray" : "dark:bg-moroi-gray dark:focus-within:bg-moroi-gray p-3 col-span-2 rounded-lg mb-5 placeholder:tracking-wide bg-[#f5f6f7] w-full h-full  shadow-none focus-within:shadow-none"} >
        </textarea>
        {errors.comment && touched.comment && <div className="text-orange-700 text-sm mb-5">{errors.comment}</div>}

      </div>

      <button
        type="submit"
        className={isSubmitting ? 'rounded bg-green-600 text-white hover:bg-green-500 hover:shadow mx-auto py-4 px-20 mt-4 text-lg font-medium my-5 md:my-0 cursor-pointer' : "rounded bg-colorFive dark:bg-colorRed dark:hover:bg-moroi-pinkdanger text-white font-semibold hover:bg-colorOne hover:dark:shadow-md dark:shadow-md hover:shadow mx-auto py-4 px-20 text-xl my-5 md:my-0 cursor-pointer"}>Submit</button>


    </form>
  )
}