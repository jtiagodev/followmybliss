import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../src/containers/presentation/Home";
import QuestionsListScreen from "../src/containers/presentation/QuestionsListScreen";
import NotFoundScreen from "../src/containers/presentation/NotFoundScreen";

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/questions">
          <QuestionsListScreen />
        </Route>
        <Route path="*">
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
