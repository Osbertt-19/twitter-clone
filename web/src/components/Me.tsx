import { gql, useQuery } from "@apollo/client";

const ME_SCHEMA = gql`
  query Me {
    me {
      name
      email
    }
  }
`;
export default () => {
  const { loading, error, data } = useQuery(ME_SCHEMA);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <div>
        {data.me.name}
        {data.me.email}
      </div>
    </div>
  );
};
