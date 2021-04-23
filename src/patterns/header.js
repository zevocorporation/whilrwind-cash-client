import React, { useContext, useState } from "react";

//IMPORTING STYLESHEET

import "../styles/patterns/header.scss";

//IMPORTING COMPONENTS

import { Button, Link } from "../components";

//IMPORTING PATTERNS

import { Sidebar } from "./";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";

//IMPORTING MEDIA ASSETS

import deposit from "../assets/icons/deposit.svg";
import withdraw from "../assets/icons/withdraw.svg";
import compliance from "../assets/icons/compliance.svg";
import activity from "../assets/icons/activity.svg";
import menu from "../assets/icons/menu.svg";
import logo from "../assets/logo/logo.png";
import ConnectModal from "./modals/connectModal";

const Header = () => {
  //INITIALIZING HOOKS

  const [isSidebar, setIsSidebar] = useState(false);
  const [isConnectPopup, setIsConnectPopup] = useState(false);
  const { userState } = useContext(UserContext);
  //RENDERING LOGO

  const renderLogo = (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="logo" width={"100%"} />
      </Link>
    </div>
  );

  //RENDERING LINKS

  const renderLinks = (
    <>
      <nav>
        <Link to="/" className="link" activeClassName="active">
          <img src={deposit} alt="deposit-icon" />
          <span>Deposit</span>
        </Link>
        <Link to="/withdraw" className="link" activeClassName="active">
          <img src={withdraw} alt="withdraw-icon" />
          <span>Withdraw</span>
        </Link>
        <Link to="/compliance" className="link" activeClassName="active">
          <img src={compliance} alt="compliance-icon" />
          <span>Compliance</span>
        </Link>
        <Link to="/activity" className="link" activeClassName="active">
          <img src={activity} alt="activity-icon" />
          <span>Activity</span>
        </Link>
      </nav>
    </>
  );

  //RENDERING NAVBAR

  const renderNavbar = (
    <div className="navbar">
      {renderLinks}
      {userState?.address ? (
        <Button className="btn-primary">
          {userState?.address.slice(userState?.address?.length - 7)}...
        </Button>
      ) : (
        <Button className="btn-primary" onClick={() => setIsConnectPopup(true)}>
          Connect wallet
        </Button>
      )}
      <img
        src={menu}
        alt="menu"
        className="menu cursor"
        onClick={() => setIsSidebar(!isSidebar)}
      />
    </div>
  );

  return (
    <>
      <div className="header">
        {renderLogo}
        {renderNavbar}
      </div>
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      {isConnectPopup ? (
        <ConnectModal setIsConnectPopup={setIsConnectPopup} />
      ) : null}
      {isConnectPopup ? (
        <div
          className="backdrop"
          onClick={() => setIsConnectPopup(false)}
        ></div>
      ) : null}
    </>
  );
};

export default Header;
