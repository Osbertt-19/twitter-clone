import { gql, useQuery } from "@apollo/client";
import { ReactNode } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ISAUTENTICATED_SCHEMA = gql`
  query Me {
    me {
      id
    }
  }
`;

export default () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ISAUTENTICATED_SCHEMA);
  if (loading) return <div>loading</div>;
  if (error) navigate("/login");
  return <Outlet />;
};
