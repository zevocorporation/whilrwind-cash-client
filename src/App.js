//IMPORTING NPM PACKAGES
import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//IMPORTING PATTRENS

import { Header } from "./patterns";
import { init, check } from "./patterns/modals/connectModal";

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

  useEffect(() => {
    isConnected();
  }, [window.from]);

  async function isConnected() {
    window.from = (
      await window.ethereum.request({
        jsonrpc: "2.0",
        method: "eth_requestAccounts",
        id: null,
      })
    )[0];
    UserDispatch({
      type: "UPDATE_CONNECTION",
      payload: {
        address: window.from,
      },
    });
    await init();
    console.log("finished");
  }

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
