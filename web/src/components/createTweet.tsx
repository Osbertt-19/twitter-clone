import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const CREATETWEET_SCHEMA = gql`
  mutation CreateTweet($caption: String,$photoUrl:String) {
    createTweet(caption:$caption,photoUrl:$photoUrl) {
      author {
        name
      }
      caption
      photoUrl
      createdAt
      id
    }
  }
`;
type CreateTweetValue = {
  caption:String 
  photoUrl:String 
};
export default () => {
  const initialValues: CreateTweetValue = {
    caption:"",
    photoUrl:"",
  };
  const validationSchema = Yup.object({
    caption: Yup.string(),
    photoUrl:Yup.string(),
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
          <Field name="caption" type="text" placeholder="What's happening?" />
          <ErrorMessage name="caption" component={"div"} />
          <Field name="photoUrl" type="text" placeholder="" />
          <ErrorMessage name="photoUrl" component={"div"} />
          <button type="submit">Tweet</button>
        </Form>
      </Formik>
    </div>
  );
};
