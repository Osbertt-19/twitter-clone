import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const EDITPROFILE_SCHEMA = gql`
  mutation EditProfile($birthday: String, $bio: String, $location: String) {
    editProfile(birthday: $birthday, bio: $bio, location: $location) {
      bio
      birthday
      location 
    }
  }
`;
type editProfileValue = {
    birthday:String 
    bio:String 
    location:String 
};
export default () => {
  const initialValues: editProfileValue = {
    birthday:"",
    bio:"",
    location:""
  };
  const validationSchema = Yup.object({
    birthday: Yup.string(),
    bio:Yup.string(),
    location:Yup.string()
  });
  const navigate = useNavigate();
  const [editProfile, { data }] = useMutation(EDITPROFILE_SCHEMA);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await editProfile({
            variables: values,
          });
          console.log(response)
          setSubmitting(false);
          navigate(`/profile`);
          window.location.reload();
        }}
      >
        <Form>
          <Field name="birthday" type="text" placeholder="birthday" />
          <ErrorMessage name="birthday" component={"div"} />
          <Field name="bio" type="text" placeholder="bio" />
          <ErrorMessage name="bio" component={"div"} />
          <Field name="location" type="text" placeholder="location" />
          <ErrorMessage name="location" component={"div"} />
          <button type="submit">Edit</button>
        </Form>
      </Formik>
    </div>
  );
};
