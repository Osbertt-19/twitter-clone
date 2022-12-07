import { gql, useQuery } from "@apollo/client";
import { ReactNode } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";

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
  return (
    <div style={{ display: "flex" }}>
      <LeftNav />
      <Outlet />
      <RightNav />
    </div>
  );
};
