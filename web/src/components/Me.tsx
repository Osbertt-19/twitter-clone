import { gql, useQuery } from "@apollo/client";

const ME_SCHEMA = gql`
  query Me {
    me {
      id
      name
      email
      # tweets {
      #   content
      # }
    }
  }
`;
type Tweet = {
  content: String;
};
export default () => {
  const { loading, error, data } = useQuery(ME_SCHEMA);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  console.log(data)
  return (
    <>
      <div>
        {data.me.name}
        {/* <div>
          {data.me.tweets.map((tweet: Tweet) => (
            <div>{tweet.content}</div>
          ))}
        </div> */}
      </div>
      <div>{data.me.email}</div>
    </>
  );
};
