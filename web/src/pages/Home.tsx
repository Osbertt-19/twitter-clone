import CreateTweet from "../components/createTweet";
import Logout from "../components/Logout";
import Me from "../components/Me";
import Tweets from "./tweets";

export default () => {
  return (
    <div style={{position:"relative"}}>
      <CreateTweet />
      <Tweets/>
    </div>
  );
};
