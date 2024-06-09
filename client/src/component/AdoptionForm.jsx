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
    imageFile: null,
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
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("age", values.age);
    formData.append("breed", values.breed);
    formData.append("color", values.color);
    formData.append("gender", values.gender);
    formData.append("type", values.type);
    formData.append("description", values.description);
    formData.append("imageFile", values.imageFile);

    // Calling the API from the server
    try {
      const response = await axios.post(
        "http://localhost:5000/adoption",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

            {/* Fields for name, age, breed, color, gender and type */}
            <article className="grid xl:grid-cols-2 md:gap-4 gap-2 p-5 border-pale-blue">
              {["name", "age", "breed", "color", "gender", "type"].map(
                (field) => (
                  <div className="flex flex-col" key={field}>
                    <Field
                      className="input"
                      type={field === "age" ? "number" : "text"}
                      id={field}
                      name={field}
                      placeholder={`${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }:`}
                    />
                    <ErrorMessage
                      name={field}
                      component="p"
                      className="error"
                    />
                  </div>
                )
              )}
            </article>

            {/* Description Field */}
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

            {/* Image Field */}
            <div className="p-5">
              <input
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
