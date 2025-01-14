"use client";

import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import { Button } from "@/components/ui/button";
import { showError, showSuccess } from "@/helpers/toast";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
});

export default function ContactPage() {
  const handleSubmit = async ({ setSubmitting }: any) => {
    try {
      showSuccess("Message sent successfully");
    } catch (error) {
      showError("Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-serif mb-12 text-5xl">Contact</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          comment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <FormikField
                  name="name"
                  component={InputField}
                  placeholder="Name"
                  className="w-full rounded border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <FormikField
                  component={InputField}
                  name="email"
                  type="email"
                  placeholder="Email *"
                  className="w-full rounded border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <FormikField
                component={InputField}
                name="phone"
                type="tel"
                placeholder="Phone number"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                rows={6}
                className="w-full resize-none rounded border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              />
              {errors.comment && touched.comment && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.comment}
                </div>
              )}
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="rounded bg-black px-8 py-2 text-white transition-colors disabled:opacity-50"
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
