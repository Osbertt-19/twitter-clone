import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const TWEETBYID_SCHEMA = gql`
  query TweetById($id: String) {
    tweetById(id: $id) {
      author {
        name
      }
      content
      createdAt
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(TWEETBYID_SCHEMA, {
    variables: { id },
  });
  console.log(data);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <div>{data.tweetById.author.name}</div>
      <div>{data.tweetById.content}</div>
    </div>
  );
};
