//IMPORTING NPM PACKAGES
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//IMPORTING PATTRENS

import { Header } from "./patterns";
import { init } from "./utils/whirlwind";

//IMPORTING SCREENS

import {
  HomeScreen,
  ActivityScreen,
  WithdrawScreen,
  ComplianceScreen,
  ErrorScreen,
} from "./screens/";

const App = () => {
  init();
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomeScreen />
        </Route>
        <Route path="/activity" exact>
          <ActivityScreen />
        </Route>
        <Route path="/withdraw" exact>
          <WithdrawScreen />
        </Route>
        <Route path="/compliance" exact>
          <ComplianceScreen />
        </Route>
        <Route>
          <ErrorScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
