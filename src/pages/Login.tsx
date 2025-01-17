import { ImageSource } from "@/assets";
import { regexCommon } from "@/components/consts/regex";
import CheckBoxField from "@/components/customFieldsFormik/CheckBoxField";
import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import BaseUrl from "@/consts/baseUrl";
import { sleepTime } from "@/helpers/common";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Form, Formik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  //! State
  const { toast } = useToast();
  const { login, isLogged, user } = useAuth();

  //! Render
  if (isLogged && user?.RoleType === 1) {
    return <Navigate to={BaseUrl.Admin} />;
  }
  if (isLogged) {
    return <Navigate to={BaseUrl.HomePage} />;
  }

  const renderFormik = () => {
    return (
      <Formik
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required("Email is required feild.")
            .email("invalid email"),
          password: Yup.string()
            .required("Password is required feild.")
            .matches(
              regexCommon.regexStrongPassword,
              "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
            ),
        })}
        initialValues={{
          username: "",
          password: "",
          agree: false,
          keep: false,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const { username, password } = values;
            await sleepTime(2000);
            login({
              username,
              password,
            });
          } catch (error) {
            toast({
              variant: "destructive",
              description: error as string,
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <div className="component:FormLogin w-full">
              <Form className="col-span-3 flex w-full min-w-[400px] items-center justify-center md:px-15">
                <CardContent className="flex w-3/5 flex-col gap-5 p-0">
                  <div className="typo-27 text-center font-semibold">
                    {"Sign in"}
                  </div>
                  <FormikField
                    component={InputField}
                    name="username"
                    label={"Email"}
                    classNameLabel="typo-25"
                    placeholder={"Enter your email"}
                    required
                  />

                  <FormikField
                    component={InputField}
                    name="password"
                    type="password"
                    classNameLabel="typo-25"
                    label={"Password"}
                    placeholder={"Enter your password"}
                    required
                  />

                  <div className={"flex justify-between"}>
                    <FormikField
                      component={CheckBoxField}
                      name="keep"
                      label={"Keep me logged in"}
                      classNameLabel="font-light typo-13"
                    />

                    <div>
                      <Button
                        variant={"link"}
                        className="typo-1 font-light text-main-primary"
                        // onClick={() => navigate(BaseUrl.ForgotPassword)}
                      >
                        {"Forgot password?"}
                      </Button>
                    </div>
                  </div>

                  <Button
                    className={"typo-13 bg-main-primary"}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {"Sign in"}
                  </Button>

                  <div className="typo-13 text-center font-light">
                    {"Don't have an account? Sign Up"}
                  </div>
                  <div className="typo-13 text-center font-light">{"Or"}</div>

                  <div className="flex flex-col gap-2">
                    <Button className="typo-13 gap-2 bg-text-primary text-white">
                      <img
                        src={ImageSource.googleLogo}
                        alt="googleIcon"
                        className="h-5 w-5"
                      />
                      {"Sign up with Google"}
                    </Button>
                    <Button
                      className={"typo-13 gap-1 bg-text-primary text-white"}
                      // onClick={() => navigate(BaseUrl.SignUp)}
                    >
                      <img
                        src={ImageSource.fbLogo}
                        alt="facebookIcon"
                        className="h-5 w-5"
                      />
                      {"Sign up with Facebook"}
                    </Button>
                  </div>
                </CardContent>
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  };

  return (
    <div
      className={
        "component:SignIn relative grid h-screen w-screen grid-cols-5 gap-4"
      }
    >
      <div className="col-span-5 flex h-full flex-col justify-between px-2 py-5 md:col-span-2">
        <div className={"flex grow flex-col items-center justify-evenly"}>
          <img
            src={ImageSource.secondHandLogo}
            alt="logoApp"
            className="mb-10 flex h-40 w-40 justify-center p-5"
          />
          {renderFormik()}
          <div />
        </div>
      </div>
      <div className="col-span-3 hidden h-screen md:block">
        <img
          src={ImageSource.imgBackgroundApp}
          className="h-full w-full"
          alt={"loginImage"}
        />
      </div>
    </div>
  );
};

export default Login;
