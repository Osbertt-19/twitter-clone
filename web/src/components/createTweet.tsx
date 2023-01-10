import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const CREATETWEET_SCHEMA = gql`
  mutation CreateTweet($caption: String, $photoUrl: String) {
    createTweet(caption: $caption, photoUrl: $photoUrl) {
      author {
        name
      }
      caption
      createdAt
      id
    }
  }
`;
type CreateTweetValue = {
  caption: String;
};
export default () => {
  const initialValues: CreateTweetValue = {
    caption: "",
  };
  const validationSchema = Yup.object({
    caption: Yup.string(),
  });
  const navigate = useNavigate();
  const [createTweet, { data }] = useMutation(CREATETWEET_SCHEMA);
  return (
    <div className="createTweet">
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
          <img
            style={{
              borderRadius: "50px",
              border: "none",
              width: "50px",
              marginRight:"5px",
              verticalAlign:"middle",
            }}
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
          ></img>
          <Field name="caption" type="text" placeholder="What's happening?" />
          <button type="submit" style={{borderRadius:"10px",backgroundColor:"var(--twitterColor)",color:"white",padding:"10px",border:"none",width:"100px"}}>Tweet</button>
        </Form>
      </Formik>
    </div>
  );
};
