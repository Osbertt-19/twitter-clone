import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const CREATETWEET_SCHEMA = gql`
  mutation CreateTweet($content: String!) {
    createTweet(content: $content) {
      author {
        name
      }
      content
      createdAt
      id
    }
  }
`;
type CreateTweetValue = {
  content: String;
};
export default () => {
  const initialValues: CreateTweetValue = {
    content: "",
  };
  const validationSchema = Yup.object({
    content: Yup.string().required("Email Required"),
  });
  const navigate = useNavigate();
  const [createTweet, { data }] = useMutation(CREATETWEET_SCHEMA);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await createTweet({
            variables: values,
          });
          setSubmitting(false);
          navigate(`/tweets/${response.data.createTweet.id}`);
        }}
      >
        <Form>
          <Field name="content" type="text" placeholder="What's happening?" />
          <ErrorMessage name="content" component={"div"} />
          <button type="submit">Tweet</button>
        </Form>
      </Formik>
    </div>
  );
};
