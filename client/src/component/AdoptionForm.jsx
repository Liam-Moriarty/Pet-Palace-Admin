import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../component/index";
import axios from "axios";
import dummyImg from "../assets/kanao.jpg";

const AdoptionForm = () => {
  const [formDataList, setFormDataList] = useState([]);

  const initialValue = {
    name: "",
    age: "",
    breed: "",
    color: "",
    gender: "",
    type: "",
    description: "",
    imageFile: undefined,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Field required!!"),
    age: Yup.number()
      .positive("Field must be positive")
      .integer("Field must be integer")
      .required("Field required!!"),
    breed: Yup.string().required("Field required!!"),
    color: Yup.string().required("Field required!!"),
    gender: Yup.string().required("Field required!!"),
    type: Yup.string().required("Field required!!"),
    description: Yup.string().required("Field required!!"),
    imageFile: Yup.mixed().required("Image is required"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/adoption",
        values
      );
      console.log("Form Submitted", response.data);
      resetForm();
      setFormDataList((prevList) => [...prevList, values]);
      console.log(JSON.stringify([...formDataList, values], null, 2));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-md p-10 shadow-light-3xl dark:shadow-dark-3xl overflow-auto">
      <h1 className="font-bold text-xl text-black-text dark:text-white-primary text-center p-4 tracking-wider font-poppins">
        ADOPTION FORM
      </h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="flex justify-center items-center  ">
              <img
                src={dummyImg}
                alt="pet image"
                className="rounded-full w-[100px] h-[100px] object-contain bg-cover border-2 border-black-text"
              />
            </div>
            <article className="grid xl:grid-cols-2 md:gap-4 gap-2 p-5 border-pale-blue">
              <div className="flex flex-col">
                <Field
                  className="input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name:"
                />
                <ErrorMessage name="name" component="p" className="error" />
              </div>

              <div className="flex flex-col">
                <Field
                  className="input"
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Age:"
                />
                <ErrorMessage name="age" component="p" className="error" />
              </div>
            </article>

            <article className="grid xl:grid-cols-2 md:gap-4 gap-2 p-5 border-pale-blue">
              <div className="flex flex-col">
                <Field
                  className="input"
                  type="text"
                  id="breed"
                  name="breed"
                  placeholder="Breed:"
                />
                <ErrorMessage name="breed" component="p" className="error" />
              </div>

              <div className="flex flex-col">
                <Field
                  className="input"
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Color:"
                />
                <ErrorMessage name="color" component="p" className="error" />
              </div>
            </article>

            <article className="grid xl:grid-cols-2 md:gap-4 gap-2 p-5 border-pale-blue">
              <div className="flex flex-col">
                <Field
                  className="input"
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Gender:"
                />
                <ErrorMessage name="gender" component="p" className="error" />
              </div>

              <div className="flex flex-col">
                <Field
                  className="input"
                  type="text"
                  id="type"
                  name="type"
                  placeholder="Type:"
                />
                <ErrorMessage name="type" component="p" className="error" />
              </div>
            </article>

            <div className="p-5">
              <Field
                className="input h-[100px]"
                as="textarea"
                id="description"
                name="description"
                placeholder="Description:"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="error"
              />
            </div>

            <div className="p-5">
              <Field
                className="input"
                type="file"
                id="imageFile"
                name="imageFile"
                onChange={(event) => {
                  setFieldValue("imageFile", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="imageFile" component="p" className="error" />
            </div>

            <Button type="submit" submit disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdoptionForm;
