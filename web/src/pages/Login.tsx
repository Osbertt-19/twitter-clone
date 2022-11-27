import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LOGIN_SCHEMA = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
type LoginValue = {
  email: String;
  password: String;
};
export default () => {
  const initialValues: LoginValue = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
  });
  const navigate = useNavigate();
  const [login, { error }] = useMutation(LOGIN_SCHEMA);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await login({
            variables: values,
          });
          localStorage.setItem("token", response.data.login.token);
          setSubmitting(false);
          navigate("/");
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="email" />
          <ErrorMessage name="email" component={"div"} />
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" component={"div"} />
          <button type="submit">Log In</button>
          <div>{error?.graphQLErrors[0].message}</div>
        </Form>
      </Formik>
      <div>Dont have an account?</div>
      <div>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
