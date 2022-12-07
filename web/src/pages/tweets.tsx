import { gql, useQuery } from "@apollo/client";

const TWEETS_SCHEMA = gql`
  query TWEETS {
    tweets {
      id
      content
      author {
        name
      }
    }
  }
`;
type Tweet = {
  id: String;
  content: String;
  author: { name: String };
};
export default () => {
  const { loading, error, data } = useQuery(TWEETS_SCHEMA);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <div>
        {data.tweets.map((tweet: Tweet) => (
          <div key={`${tweet.id}`}>
            <h4>
              {tweet.author.name} {tweet.content}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
