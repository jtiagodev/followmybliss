import React, { useEffect, useState } from "react";
import NoConnectivityScreen from "../NoConnectivityScreen";
import QuestionsListScreen from "./../QuestionsListScreen";

const Home = (props) => {
  const [connectionStatus, setConnectionStatus] = useState('ONLINE');

  useEffect(() => {
    const setOffline = (event) => {
        setConnectionStatus("OFFLINE");
    };
    const setOnline = (event) => {
        setConnectionStatus("ONLINE");
    };
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return function cleanup() {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return (
    <>
      {connectionStatus === "OFFLINE" && <NoConnectivityScreen />}
      {connectionStatus === "ONLINE" && <QuestionsListScreen />}
    </>
  );
};

export default Home;
