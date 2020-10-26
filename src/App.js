import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import NoConnectivityScreen from "../src/components/NoConnectivityScreen";

import NotFoundScreen from "../src/components/NotFoundScreen";
import Home from "../src/containers/presentation/Home";
import QuestionsRoute from "../src/containers/presentation/QuestionsRoute";

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
        <Router basename="/">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/questions">
              <QuestionsRoute />
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
