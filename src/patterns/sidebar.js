import React from "react";

//IMPORTING STYLESHEET

import "../styles/patterns/modal.scss";

//IMPORTING COMPONENTS

import { Button, Link } from "../components";

//IMPORTING MEDIA ASSETS

import deposit from "../assets/icons/deposit.svg";
import withdraw from "../assets/icons/withdraw.svg";
import compliance from "../assets/icons/compliance.svg";
import activity from "../assets/icons/activity.svg";
import avatar from "../assets/images/avatar.svg";

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  //HANDLING METHODS

  const handleConnect = () => {};

  //RENDERING LINKS

  const renderLinks = (
    <>
      <Link to="/" onClick={() => setIsSidebar(false)}>
        <img src={deposit} alt="deposit" />
        <span>Deposit</span>
      </Link>
      <Link to="/withdraw" onClick={() => setIsSidebar(false)}>
        <img src={withdraw} alt="Withdraw" />
        <span>Withdraw</span>
      </Link>
      <Link to="/compliance" onClick={() => setIsSidebar(false)}>
        <img src={compliance} alt="Compliance" />
        <span>Compliance</span>
      </Link>
      <Link to="/activity" onClick={() => setIsSidebar(false)}>
        <img src={activity} alt="Activity" />
        <span>Activity</span>
      </Link>
    </>
  );

  return (
    <div
      className="sidebar"
      style={{
        right: isSidebar ? "5%" : "-100%",
      }}
    >
      {renderLinks}
      <div className="user-connected">
        <Button className="btn-primary" onClick={() => handleConnect()}>
          Connect Wallet
        </Button>
        <img src={avatar} className="sidebar-avatar" alt="avatar" />
      </div>
    </div>
  );
};

export default Sidebar;
