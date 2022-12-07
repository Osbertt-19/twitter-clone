import { gql, useQuery } from "@apollo/client";
import EditProfile from "../components/editProfile";

const ME_SCHEMA = gql`
  query Me {
    me {
      name
      email
      profile {
        birthday
        bio
        location
      }
      tweets {
        id
        content
      }
    }
  }
`;
type Tweet = {
  id: String;
  content: String;
};
export default () => {
  const { loading, error, data } = useQuery(ME_SCHEMA);
  console.log(data);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <div>
        <EditProfile />
        {data.me.name}
        <div>email {data.me.email}</div>
        {data.me.profile && (
          <div>
            <div>bio {data.me.profile.bio}</div>
            <div>birthday {data.me.profile.birthday}</div>
            <div>location {data.me.profile.location}</div>
          </div>
        )}
        <div>tweets</div>
        <div>
          {data.me.tweets.map((tweet: Tweet) => (
            <div key={`${tweet.id}`}>{tweet.content}</div>
          ))}
        </div>
      </div>
    </>
  );
};
