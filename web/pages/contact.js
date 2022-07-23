import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { useFormik } from 'formik';
import { Button, Typography } from '@material-tailwind/react'
import { ContactSchema } from '../src/components/validations/ContactValidation';
import { useLoadScript } from "@react-google-maps/api";
import { GiRotaryPhone, GiMailbox, GiPostOffice } from 'react-icons/gi';
import Skeleton from 'react-loading-skeleton'
import { formatPhoneNumber } from '../lib/helpers';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAlldata } from '../lib/api';
import dynamic from 'next/dynamic'

const Googlemap = dynamic(() => import('../src/components/Contact/GoogleMap'), {
  suspense: true,
})

export default function Contact({ data }) {


  // fetching site seettings
  const siteSettings = data.siteSettings[0];
  const doctorSettings = data.doctorSettings[0];



  const router = useRouter()
  const { slug } = router.query

  //googlemap
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Add your API key
  });

  // refrencing the form for emailjs
  const contactForm = useRef();

  // emailjs function to send emails
  const sendEmail = () => {
    emailjs.sendForm(process.env.NEXT_PUBLIC_serviceID, process.env.NEXT_PUBLIC_templateID, contactForm.current, process.env.NEXT_PUBLIC_publicKey)
      .then((result) => {
      }, (error) => {
      });
  }
  // formik submit / validation function
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    sendEmail();
  }

  // formik configuration
  const { values, errors, handleChange, touched, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    validationSchema: ContactSchema,
    onSubmit,
  })

  if (!doctorSettings || !siteSettings) {
    return (
      <div><Skeleton count={1} className='dark:bg-moroi-dark' /></div>
    )
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" Lang='en' />
        <meta name="title" content={`${siteSettings.title} ${slug}`} />
        <meta name="description" content={siteSettings.description} />
        <meta name="keywords" content={siteSettings.keywords} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteSettings.website} />
        <meta property="og:title" content={siteSettings.title} />
        <meta property="og:description" content={siteSettings.description} />
        <meta property="og:image" content={siteSettings.socialimage.asset.url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteSettings.website} />
        <meta property="twitter:title" content={siteSettings.title} />
        <meta property="twitter:description" content={siteSettings.description} />
        <meta property="twitter:image" content={siteSettings.socialimage.asset.url} />
      </Head>

      <section id="main" className='mx-[5%] md:mx-[10%] grid grid-cols-1 w-auto relative my-[10%]'>
        <div className='flex flex-col gap-20 items-center mx-auto'>
          <div className='flex flex-col justify-center align-middle self-center w-full '>
            <h1 className="font-bold text-3xl lg:text-4xl my-4">Questions, Comments, Or Concerns?</h1>
            <Typography variant="lead" className="mb-4 font-light">One of Our Support Team Will Reach Out To You Soon.</Typography>

          </div>


          <div className="w-full md:max-w-2xl flex flex-col ">
            <form className="md:grid md:grid-cols-1 gap-10" ref={contactForm} onSubmit={handleSubmit}>

              <div className='flex flex-col justify-center align-middle'>
                <input
                  type="text"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="name"
                  placeholder="Your Name"
                  className={errors.name && touched.name ? "outline outline-1 outline-orange-600 ring-outline-orange-600 border-outline-orange-600 shadow-outline-orange-600 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-outline-orange-600 focus:border-outline-orange-600 focus:shadow-outline-orange-600 text-outline-orange-600 p-4 col-span-2 rounded placeholder:text-sm bg-white " : "p-4 col-span-2 rounded mb-5 placeholder:text-sm bg-white"} />
                {errors.name && touched.name && <div className="text-orange-700 text-sm mb-5">{errors.name}</div>}

                <input
                  type="text"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  placeholder="Email"
                  className={errors.email && touched.email ? "outline outline-1 outline-orange-600 ring-outline-orange-600 border-outline-orange-600 shadow-outline-orange-600 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-outline-orange-600 focus:border-outline-orange-600 focus:shadow-outline-orange-600 text-outline-orange-600 p-4 col-span-2 rounded placeholder:text-sm bg-white" : "p-4 col-span-2 rounded mb-5 placeholder:text-sm bg-white"} />
                {errors.email && touched.email && <div className="text-orange-700 text-sm mb-5">{errors.email}</div>}

                <input
                  type="tel"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Phone Number"
                  className={errors.phone && touched.phone ? "outline outline-1 outline-orange-600 ring-outline-orange-600 border-outline-orange-600 shadow-outline-orange-600 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-outline-orange-600 focus:border-outline-orange-600 focus:shadow-outline-orange-600 text-outline-orange-600 p-4 col-span-2 rounded placeholder:text-sm bg-white " : "p-4 col-span-2 rounded placeholder:text-sm bg-white mb-5 md:mb-0"} />
                {errors.phone && touched.phone && <div className="text-orange-700 text-sm mb-5">{errors.phone}</div>}
              </div>
              <div className='h-80 mb-10'>
                <textarea
                  value={values.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="message" rows="full" cols="auto"
                  placeholder="Additional Information"
                  className={errors.message && touched.message ? "outline outline-1 outline-orange-600 ring-outline-orange-600 border-outline-orange-600 shadow-outline-orange-600 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-outline-orange-600 focus:border-outline-orange-600 focus:shadow-outline-orange-600 text-outline-orange-600 p-3 col-span-2 rounded placeholder:text-sm bg-white w-full h-full " : "p-3 col-span-2 rounded mb-5 placeholder:tracking-wide bg-white w-full h-full"} >
                </textarea>
                {errors.message && touched.message && <div className="text-orange-700 text-sm mb-5">{errors.message}</div>}

              </div>


              <p variant="font-light">By clicking the button below you agree to our tearms of Service and have read and understood our Privacy Policy.</p>

              <Button
                type="submit"
                className={isSubmitting ? 'rounded bg-green-600 text-white hover:bg-green-500 hover:shadow mx-auto py-4 px-20 mt-4 text-lg font-medium my-5 md:my-0' : "rounded bg-colorTwo dark:bg-colorRed dark:hover:bg-moroi-pinkdanger text-white hover:bg-colorOne hover:dark:shadow-md dark:shadow-md hover:shadow mx-auto py-4 px-20 text-lg font-medium my-5 md:my-0"}>Submit</Button>


            </form>
          </div>
        </div>
      </section>
      <section className='mb-0 md:my-[15%] my-[45%] mx-[5%] md:mx-[10%] grid grid-cols-1 md:grid-cols-3 gap-5'>

        <div className='flex flex-col gap-5 justify-end w-full col-span-1 '>
          <div className='h-1/3 p-5 w-full rounded shadow bg-white dark:bg-moroi-dark text-xl inline-flex gap-5'>
            <GiRotaryPhone className='self-center text-5xl' />
            <span className='self-center'>  {formatPhoneNumber(doctorSettings.phoneNumber)} </span>
          </div>

          <div className='h-1/3 p-5 w-full rounded shadow bg-white dark:bg-moroi-dark text-xl inline-flex gap-5'>
            <GiMailbox className='self-center text-5xl' />
            <span className='self-center'>{doctorSettings.doctoremail}</span>
          </div>

          <div className='h-1/3 p-5 w-full rounded shadow bg-white dark:bg-moroi-dark text-xl inline-flex gap-5'>
            <GiPostOffice className='self-center text-5xl' />
            <span className='self-center'>{doctorSettings.Address}</span>
          </div>

        </div>
        <div className='col-span-2 shadow-md  rounded-lg '>
          {isLoaded ? <Googlemap doctorSettings={doctorSettings} /> : null}
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const data = await getAlldata();
  return {
    props: {
      data
    },
    revalidate: 1
  }
}