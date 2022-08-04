import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { useFormik } from "formik"
import { AppointmentSchema } from "../validations/AppointmentsValidation";


export default function Appointments(props) {

  // refrencing the form for emailjs
  const form = useRef();

  // emailjs function to send emails
  const sendEmail = () => {
    emailjs.sendForm(process.env.NEXT_PUBLIC_serviceID, process.env.NEXT_PUBLIC_templateID, form.current, process.env.NEXT_PUBLIC_publicKey)
      .then((result) => {
      }, (error) => {
      });
    form.current.reset();
  };

  // formik submit / validation function
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    sendEmail();
    props.handleOpen();
  }

  // formik configuration
  const { values, errors, handleChange, touched, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      message: ""
    },
    validationSchema: AppointmentSchema,
    onSubmit,
  });

  return (
    <div id="appointment" className="h-[100%] w-[100%] z-50 bg-slate-800 bg-opacity-70 absolute top-0 left-0 hidden" >
      <div className="flex flex-col mx-[5%] md:mx-[10%] lg:mx-[35%] relative justify-center align-middle self-center top-[5vh] bg-white dark:bg-moroi-stack p-3 rounded ">

        <form className="flex flex-col mt-[5%] mx-[5%]" ref={form} onSubmit={handleSubmit}>


          <input
            label="Your Name"
            value={values.name}
            placeholder="Enter your name"
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="name"
            className={errors.name && touched.name ? "outline outline-1 outline-orange-600 ring-orange-500 border-orange-500 shadow-orange-500 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-orange-500 focus:border-orange-500  text-orange-500 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50 mb-8" : "flex-1 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50 mb-8"} />



          <input
            label="Email"
            value={values.email}
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            name="email"
            className={errors.email && touched.email ? "outline outline-1 outline-orange-600 ring-orange-500 border-orange-500 shadow-orange-500 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-orange-500 focus:border-orange-500  text-orange-500 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50 mb-8" : "flex-1 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50 mb-8"} />



          <div className="flex flex-col md:flex-row w-full gap-0 md:gap-3">
            <div className="flex flex-col flex-1 mb-8 relative">

              <input
                label="Date"
                value={values.date}
                placeholder="Enter your date"
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
                name="date"
                className={errors.date && touched.date ? "outline outline-1 outline-orange-600 ring-orange-500 border-orange-500 shadow-orange-500 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-orange-500 focus:border-orange-500  text-orange-500 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50" : "flex-1 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50"} />

            </div>


            <div className="flex flex-col flex-1 mb-8 relative">
              <input
                label="Time"
                value={values.time}
                placeholder="Enter your date"
                onChange={handleChange}
                onBlur={handleBlur}
                type="time"
                name="time"
                className={errors.time && touched.time ? "outline outline-1 outline-orange-600 ring-orange-500 border-orange-500 shadow-orange-500 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-orange-500 focus:border-orange-500  text-orange-500 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50" : "flex-1 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50"} />

            </div>

          </div>

          <input
            label="Phone"
            value={values.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
            onBlur={handleBlur}
            type="tel"
            name="phone"
            className={errors.phone && touched.phone ? "outline outline-1 outline-orange-600 ring-orange-500 border-orange-500 shadow-orange-500 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-orange-500 focus:border-orange-500  text-orange-500 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50 mb-8" : "p-3 col-span-2 rounded mb-8 placeholder:text-sm bg-slate-50"} />

          <textarea
            label="Message"
            value={values.message}
            placeholder="Enter your message"
            onChange={handleChange}
            onBlur={handleBlur}
            type="textarea"
            name="message" cols="30" rows="10"
            className={errors.message && touched.message ? "outline outline-1 outline-orange-600 ring-orange-500 border-orange-500 shadow-orange-500 focus:outline focus:outline-1 focus:outline-orange-600 focus:ring-orange-500 focus:border-orange-500  text-orange-500 p-3 col-span-2 rounded placeholder:text-sm bg-slate-50" : "p-3 col-span-2 rounded mb-8 placeholder:text-sm bg-slate-50"} >
          </textarea>
          <div className="justify-center my-5">
            {/* <hr className=" border-slate-600 border-dotted mb-5 -mx-[8%]" /> */}

            {errors.name && touched.name && <div
              data-aos="zoom-in"
              className="text-colorRed">Your Name is {errors.name}</div>
            }
            {errors.email && touched.email && <div
              data-aos="zoom-in"
              className="text-colorRed">Your Email is {errors.email}</div>
            }
            {errors.date && touched.date && <div
              data-aos="zoom-in"
              className="text-colorRed">Your Date is {errors.date}</div>
            }
            {errors.time && touched.time && <div
              data-aos="zoom-in"
              className="text-colorRed">Your Time is {errors.time}</div>
            }
            {errors.phone && touched.phone && <div
              data-aos="zoom-in"
              className="text-colorRed">Your Phone is {errors.phone}</div>
            }
            {errors.message && touched.message && <div
              data-aos="zoom-in"
              className="text-colorRed">Your Message is {errors.message}</div>
            }
          </div>


          <div className="flex gap-5 justify-end mb-5">
            <div size="md" color="red" onClick={() => props.handleOpen()} className=" flex-1 flex self-center border-2 border-colorRed rounded-lg text-center align-middle justify-center hover:shadow-lg hover:shadow-red-100 py-2 text-colorRed cursor-pointer">Cancel</div>
            <div size="md" type="submit" value="send"
              className={isSubmitting ? "flex-1 flex self-center justify-center align-middle text-center rounded-lg bg-green-700 text-white hover:bg-colorOne dark:hover:bg-moroi-pinkdanger hover:shadow border-2 border-green-700" :
                "flex-1 rounded-lg bg-colorTwo dark:bg-colorRed text-white hover:bg-colorOne dark:hover:bg-moroi-pinkdanger flex self-center justify-center align-middle text-center py-2 border-2 border-colorTwo cursor-pointer hover:border-colorOne hover:shadow-lg hover:shadow-blue-100"}>Submit</div>
          </div>
        </form>
      </div>
    </div>
  )

}
