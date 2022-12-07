import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Users from "./components/Users";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Me from "./components/Me";
import Home from "./pages/Home";
import IsAutenticated from "./utils/AutenticatedLayout";
import TweetById from "./pages/tweetById";
import Tweets from "./pages/tweets";
import Profile from "./pages/Profile";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<IsAutenticated />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/tweets/:id" element={<TweetById />} />
            <Route path="/feed" element={<Tweets />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
