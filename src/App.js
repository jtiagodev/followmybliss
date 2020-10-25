import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoConnectivityScreen from "../src/containers/presentation/NoConnectivityScreen";
import QuestionsListScreen from "../src/containers/presentation/QuestionsListScreen";
import NotFoundScreen from "../src/containers/presentation/NotFoundScreen";

const App = (props) => {
  const [connectionStatus, setConnectionStatus] = useState("ONLINE");

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
      {connectionStatus === "ONLINE" && (
        <Router>
          <Switch>
            <Route exact path="/">
              <QuestionsListScreen />
            </Route>
            <Route path="/questions">
              <QuestionsListScreen />
            </Route>
            <Route path="*">
              <NotFoundScreen />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
