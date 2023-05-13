import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import "./App.css";

import { ChannelContainer, ChannelListContainer } from "./components";

const apikey = "b3mjtd6h8rez";

const App = () => {
  const client = StreamChat.getInstance(apikey);
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
