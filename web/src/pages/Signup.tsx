import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SIGNUP_SCHEMA = gql`
  mutation Signup($email: String!, $password: String!, $name: String) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
type SignupValue = {
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
};
export default () => {
  const initialValues: SignupValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });
  const navigate = useNavigate();
  const [signup, { data }] = useMutation(SIGNUP_SCHEMA);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: {
              name: values.name,
              email: values.email,
              password: values.password,
            },
          });
          localStorage.setItem("token", response.data.signup.token);
          setSubmitting(false);
          navigate("/");
        }}
      >
        <Form>
          <Field name="name" type="text" placeholder="name" />
          <ErrorMessage name="name" component={"div"} />
          <Field name="email" type="text" placeholder="email" />
          <ErrorMessage name="email" component={"div"} />
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" component={"div"} />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="confirmPassword"
          />
          <ErrorMessage name="confirmPassword" component={"div"} />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
      <div>Already have an account?</div>
      <div>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};
