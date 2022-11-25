import { useState } from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Users from "./components/Users";

const client = new ApolloClient({
  uri:  "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>hi</div>
      <Users />
    </ApolloProvider>
  );
}

export default App;
