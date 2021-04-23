import React, { useContext } from "react";

//IMPORTING STYLESHEET

import "../styles/patterns/wallet.scss";

//IMPORTING MEDIA ASSETS

import wallet from "../assets/icons/wallet.svg";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";

const Wallet = (props) => {
  //INITIALIZING HOOKS

  const { userState } = useContext(UserContext);

  //RENDERING CONTENT

  const renderContent = (
    <div className="block-left">
      <p className="title-b-32-txt-pri">{props.title}</p>
      <p className="txt-reg-16-txt-sec">{props.details}</p>
    </div>
  );

  //RENDERING WALLET DETAILS

  const renderWalllet = (
    <>
      {userState?.bnbBalance && userState?.windBalance ? (
        <div className="wallet-connect">
          <img src={wallet} alt="wallet" />
          <div>
            <p>Bnb balance</p>
            <p>{userState?.bnbBalance}</p>
          </div>
          <div>
            <p>Wind balance</p>
            <p>{userState?.windBalance}</p>
          </div>
          {/* <p className="txt-reg-16-txt-sec flex-end">= 19,889.69 USD</p> */}
        </div>
      ) : (
        <div className="block-right">
          <img src={wallet} alt="wallet" />
          <p className="txt-reg-16-txt-sec" style={{ textAlign: "center" }}>
            <span style={{ color: "#4FACFE" }}>Connect Wallet</span> &nbsp; to
            view your balance information.
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="wallet">
      {renderContent}
      {props.variant === "activity" ? null : renderWalllet}
    </div>
  );
};

export default React.memo(Wallet);
