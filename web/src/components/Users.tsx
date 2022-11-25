import { gql, useQuery } from "@apollo/client";

const USER_SCHEMA = gql`
  query AllUsers {
    allUsers {
      name
    }
  }
`;
type User = {
  name: String;
};
export default () => {
  const { loading, error, data } = useQuery(USER_SCHEMA);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <div>
        {data.allUsers.map((user: User) => (
          <div>{user.name}</div>
        ))}
      </div>
    </div>
  );
};
