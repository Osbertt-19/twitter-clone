import { gql, useQuery } from "@apollo/client";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const TWEETS_SCHEMA = gql`
  query TWEETS {
    tweets {
      id
      caption
      author {
        name
      }
      createdAt
    }
  }
`;
type Tweet = {
  id: String;
  caption: String;
  author: { name: String };
  createdAt: string;
};
export default () => {
  const { loading, error, data } = useQuery(TWEETS_SCHEMA);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div style={{ position: "absolute", top: "100px" }}>
      <div>
        {data.tweets.map((tweet: Tweet) => (
          <div key={`${tweet.id}`}>
            <span>
              {tweet.author.name}
              <span>
                {timeAgo.format(Date.now() - Date.parse(tweet.createdAt))}
              </span>
              <span>{tweet.caption}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
