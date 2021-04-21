//IMPORTING NPM PACKAGES
import React, { useReducer } from "react";
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

//IMPORTING STORE COMPONENTS

import { UserContext, TransactionContext } from "./store/contexts";
import { UserReducer, TransactionReducer } from "./store/reducers";

const App = () => {
  const [userState, UserDispatch] = useReducer(UserReducer);
  const [transactionState, transactionDispatch] = useReducer(
    TransactionReducer
  );
  const renderRoutes = (
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
  return (
    <>
      <UserContext.Provider value={{ userState, UserDispatch }}>
        <TransactionContext.Provider
          value={{ transactionState, transactionDispatch }}
        >
          {renderRoutes}
        </TransactionContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
