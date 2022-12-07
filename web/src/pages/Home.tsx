import CreateTweet from "../components/createTweet";
import Logout from "../components/Logout";
import Me from "../components/Me";
import Tweets from "./tweets";

export default () => {
  return (
    <div>
      <Me/>
      <CreateTweet />
      <Tweets/>
    </div>
  );
};
